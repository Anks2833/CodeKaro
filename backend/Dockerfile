FROM ubuntu:20.04

RUN dpkg --configure -a
ENV PYTHON_VERSION 3.7.7
ENV PYTHON_PIP_VERSION 20.1
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y install gcc mono-mcs golang-go \
    default-jre default-jdk \
    python3-pip python3 curl && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 18.x instead of 14.x
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install nodejs -y

COPY . /app
WORKDIR /app

EXPOSE 3300

RUN npm install
RUN mkdir temp

CMD ["npm", "start"]