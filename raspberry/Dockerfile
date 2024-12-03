# Raspberry image
FROM nginx:latest

RUN apt-get update && \
    apt-get install \
    -y lsof \
    curl \
    autossh \
    -y jq


# SSH
RUN ssh-keygen -f ~/.ssh/id_rsa -N ""