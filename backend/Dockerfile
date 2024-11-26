FROM node:latest

RUN apt-get update &&\
    apt-get install -y openssh-server

# SSH
RUN mkdir ~/.ssh
RUN touch ~/.ssh/authorized_keys
RUN sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config 

EXPOSE 22
EXPOSE 80

WORKDIR /app

CMD service ssh start && npx ts-node-dev --respawn --transpile-only --poll index.js