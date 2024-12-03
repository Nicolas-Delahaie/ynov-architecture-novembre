FROM node:latest

RUN apt-get update &&\
    apt-get install -y openssh-server

# SSH
RUN touch ~/.ssh/authorized_keys &&\
    chmod 600 ~/.ssh/authorized_keys &&\
    chown root:root ~/.ssh/authorized_keys &&\
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config &&\
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config &&\
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config 

EXPOSE 22
EXPOSE 80

WORKDIR /app

CMD service ssh start && npx ts-node-dev --respawn --transpile-only --poll index.js