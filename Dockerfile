FROM ubuntu

RUN apt update -y && apt install curl -y && apt install git -y

# Install node and npm
ENV NODE_VERSION=13.10.1
RUN apt-get update && \
       apt-get install wget curl ca-certificates rsync -y
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.36.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/

# Install Go
RUN curl -o golang.tar.gz https://dl.google.com/go/go1.15.3.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf golang.tar.gz
ENV PATH $PATH:/usr/local/go/bin
RUN go version

COPY . .
WORKDIR ./gatsby
RUN . "$NVM_DIR/nvm.sh" && npm install
RUN . "$NVM_DIR/nvm.sh" && npx gatsby build
WORKDIR ../fiber
RUN go build -o server
ENTRYPOINT ["./server"]

