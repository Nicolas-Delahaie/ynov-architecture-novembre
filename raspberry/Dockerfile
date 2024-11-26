# Raspberry image
FROM nginx:latest

RUN apt-get update && \
    apt-get install -y \
    lsof \
    curl \
    autossh

# SSH
RUN ssh-keygen -f ~/.ssh/id_rsa -N ""