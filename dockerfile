FROM ubuntu

USER root
RUN mkdir AI-Test
RUN chown root:root AI-Test

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y apt-utils
RUN apt-get install -y git
ENV PYTHONUNBUFFERED=1
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

RUN git clone https://iz02056:01602141886_Pw!login@git.f-i-ts.de/ai-services/ai-test.git /home/patrick/AI-Test
WORKDIR /home/patrick/AI-Test/server

RUN pip3 install -r requirements.txt

RUN apt-get -y install curl
# get install script and pass it to execute: 
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
# and install node 
RUN apt-get install nodejs

EXPOSE 5000
CMD python3 privateGPT.py
