"use client";
import React, { useState, useRef } from "react";
import { FormControl, Stack,Spinner } from "react-bootstrap";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";


export default function MainContainer() {
  const [chat, setChat] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  chatRef.current = chat;



  const handleInputChanges = (e) => {
    setQuestion(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const askAI = async () => {
    if (question === "") {
      toast.error("Bitte gebe eine gültige Eingabe ein und versuiche es erneut.");
    } else {
      setLoading(true);
      let getQuestion = question;
      setChat((chat) => [...chat, { isBot: false, msg: question }]);
      setQuestion("");
      try {
        const response = await fetch("http://localhost:1337/get_answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(question),
        });

        if (!response.ok) {	
		  response.text().then(text => {toast.error("Fehler beim Empfangen der Daten: "+text);})
          setLoading(false);
        } else {
          const data = await response.json();
          setChat([
            ...chatRef.current,
            {
              isBot: true,
              msg: data.answer,
              source: data.source,
            },
          ]);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Fehler beim Empfangen der Antwort, bitte erneut versuchen.");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Stack>
        <div className=" mx-2 px-md-5 py-sm-4 chat-scroll">
          {chat.length > 0 ? (
            chat.map((msg) => (
              <Stack direction="vertical" gap={3}>
                <div
                  className={
                    msg.isBot
                      ? " p-4 text-start w-100 position-relative bot-msg mb-3"
                      : " p-4 text-start w-100 position-relative user-msg mb-3"
                  }
                >
                  <div>
                    {msg.isBot ? (
                      <span style={{ fontSize: "12px" }}>FI-TS AI</span>
                    ) : (
                      <span style={{ fontSize: "12px" }}>Sie</span>
                    )}
                  </div>
                  <div className="w-100">
                    <div>
                      {msg.isBot ? (
                        <>
                          {msg.msg == null ? (
                            <div>
                              <span class="blinking-cursor"> █</span>
                            </div>
                          ) : (
                            <Stack direction="vertical" gap={3}>
                              <span>{msg.msg}</span>
                              <span style={{ fontSize: "12px" }}>
                                {msg.source != null && msg.source != ""
                                  ? "Source: " + msg.source[0]["name"]
                                  : ""}
                              </span>
                            </Stack>
                          )}
                        </>
                      ) : (
                        msg.msg
                      )}
                    </div>
                  </div>
                </div>
              </Stack>
            ))
          ) : (
<Stack className="align-items-center ms-sm-5 ps-sm-3" gap={1} style={{ color: "black" }}>
  <h1 className="text-4xl bg-gradient-to-r text-transparent bg-clip-text from-red-500 to-gray-500 font-bold p-4">
    FI-TS AI Chat 
  </h1>

  <h3 style={{ color: "gray" }}>Chatbot basierend auf eigene Dateien</h3>
</Stack>

          )}
          {loading ? <Stack gap={2} direction="horizontal" className="loading">
            <Spinner size="sm" animation="grow" />
            <Spinner size="sm" animation="grow" />
            <Spinner size="sm" animation="grow" />
          </Stack> : ""}
        </div>
        <div className="px-4 justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center mb-sm-0">
            <FormControl
              rows={1}
              className="chat-input p-2"
              as="textarea"
              value={question}
              onChange={(e) => handleInputChanges(e)}
              onKeyDown={(e) => {
                if (e.code == "Enter" && !e.shiftKey) {
                  e.preventDefault(); // prevent moving to next line
                  askAI(); // call function ask
                }
              }}
            />

            <div
              className="d-flex flex-column mx-2 justify-content-end align-items-center"
              style={{ height: "100%", cursor: "pointer", color: "#4e4e4e" }}
              onClick={askAI}
            >
              <Image
                src="/send-icon.svg"
                alt="Send"
                width={20}
                height={20}
                priority
              />
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}
