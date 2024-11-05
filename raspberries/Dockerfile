# Utilisation de l'image alpine comme base
FROM alpine:latest

# Installer bash (optionnel)
RUN apk update && apk add bash

# Définir le répertoire de travail
WORKDIR /workspace

EXPOSE 80

# # Commande à exécuter lors du lancement du conteneur
# CMD ["/bin/bash"]