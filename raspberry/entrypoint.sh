#!/bin/sh

# Étape 1 : Lancer Nginx en arrière-plan
nginx -g "daemon off;" > /dev/stdout 2> /dev/stderr &

# Sauvegarder le PID de Nginx
NGINX_PID=$!

# Étape 2 : Exécuter register.sh
echo "Exécution de register.sh..."
./register.sh

# Étape 3 : Ramener Nginx au premier plan
echo "Récupération de Nginx au premier plan..."
wait "$NGINX_PID"