"use client";
import React, { useState } from "react";
import { Button, Stack, Form,Spinner  } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export default function ConfigSideNav() {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadInProgress, setdownloadInProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(null);

  const ingestData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:1337/ingest");
      const jsonData = await res.json();
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log("Fehler beim Einfügen der Dateien");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log(jsonData);
      }
    } catch (error) {
      setIsLoading(false);
      const response = await error.response.text();
      toast.error("Fehler beim Einfügen der Dateien." + response);
    }
    
  };

  const handleDownloadModel = async () => {
    try {
      setdownloadInProgress(true);
      const res = await fetch("http://localhost:1337/download_model");
      const jsonData = await res.json();
      if (!res.ok) {
	    response.text().then(text => {toast.error("Fehler beim herrunterladen des Modells."+text);})  
        setdownloadInProgress(false);
      } else {
        setdownloadInProgress(false);
        toast.success("Modell erfolgreich heruntergeladen");
        console.log(jsonData);
      }
    } catch (error) {
      setdownloadInProgress(false);
      console.log(error);
      toast.error("Fehler beim herrunterladen des Modells");
    }
  };

  const handleFileChange = (event) => {
    if(event.target.files[0]!=null){
      setSelectedFile(event.target.files[0]);
    }
    
  };

  const handleUpload = async () => {
    setIsUploading(true)
    try {
      const formData = new FormData();
      formData.append("document", selectedFile);

      const res = await fetch("http://localhost:1337/upload_doc", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.log("Fehler beim Hochladen der Daten");
		response.text().then(text => {toast.error("Fehler beim Hochladen der Dateien."+text);})
        setSelectedFile(null); // Clear the selected file after successful upload
        document.getElementById("file-input").value = "";
        setIsUploading(false)
      } else {
        const data = await res.json();
        console.log(data);
        toast.success("Dateien erfolgreich hochgeladen.");
        setSelectedFile(null); // Clear the selected file after successful upload
        document.getElementById("file-input").value = "";
        setIsUploading(false)
      }
    } catch (error) {
      console.log("error");
      toast.error("Fehler beim Hochladen der Dateien");
      setSelectedFile(null); // Clear the selected file after successful upload
      document.getElementById("file-input").value = "";
      setIsUploading(false)
    }
  };

return (
  <>
    <div className="mx-4 mt-3">
      <Form.Group className="mb-3">
        <Form.Label>Laden Sie Ihre Dateien hoch:</Form.Label>
        <Form.Control
          type="file"
          size="sm"
          onChange={handleFileChange}
          id="file-input"
        />
      </Form.Group>
    </div>
    <Stack direction="horizontal" className="mx-4 mt-5 pb-10" gap={3}>
    {isUploading? <div className="d-flex justify-content-center">
        <Spinner animation="border" />
        <span className="ms-3">hochladen..</span>
        </div>:
        <Button onClick={(e) => handleUpload()}>1. Hochladen</Button>}
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
          <span className="ms-3">einbetten..</span>
      </div>
      ) : (
        <Button onClick={() => ingestData()}>2. Dateien einfügen</Button>
      )}
    </Stack>
  </>
);
}
