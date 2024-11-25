#!/bin/bash

HOST="backend"
USER="root"
API_REGISTER_ENDPOINT="http://$HOST/api/register"
MAC=$(cat /sys/class/net/eth0/address)
echo "MAC address: $MAC"

# read locals ports from config file
LOCAL_PORTS=$(cat /etc/airnet/ports)
echo "Local ports: $LOCAL_PORTS"

# Get ports from API with the user agent and the mac address
echo "Getting ports from API: $API_REGISTER_ENDPOINT for ports $LOCAL_PORTS"
RESPONSE=$(curl -s -w "%{http_code}" -X POST -d "mac=$MAC&raspberryPorts=$LOCAL_PORTS" -A "AirNet/1.0" $API_REGISTER_ENDPOINT)

# checking curl success
if [ $? -ne 0 ]; then
  echo "Error: Unable to fetch $API_REGISTER_ENDPOINT"
  echo "Exiting script."
  exit 1
fi

# checking Http response success
HTTP_STATUS=${RESPONSE: -3} # Les 3 derniers caractères sont le statut HTTP
REMOTE_PORTS=${RESPONSE::-3}      # Tout sauf les 3 derniers caractères est la réponse
if [[ $HTTP_STATUS -ne 200 ]]; then
  echo "Request failed with status $HTTP_STATUS."
  echo "Response: $RESULT"
  exit 1
fi


echo "Remote ports: $REMOTE_PORTS"

# create an array of ports
IFS=',' read -ra LOCAL_PORTS <<< "$LOCAL_PORTS"
IFS=',' read -ra REMOTE_PORTS <<< "$REMOTE_PORTS"

# Loop over each port and create a reverse SSH tunnel from the raspberry to the server
for i in "${!LOCAL_PORTS[@]}"; do
    LOCAL_PORT=$(echo ${LOCAL_PORTS[$i]} | sed s/://)
    REMOTE_PORT=${REMOTE_PORT[$i]}
    echo "Checking if port $LOCAL_PORT is used"
    if lsof -Pi :$LOCAL_PORT -sTCP:LISTEN -t >/dev/null ; then
        echo "Local port $LOCAL_PORT is used"
        echo "Creating reverse SSH tunnel for port $LOCAL_PORT to $REMOTE_PORT"
        autossh -M 0 -f -N -o "ServerAliveInterval 7200" -o "ServerAliveCountMax 12" -R $REMOTE_PORT:localhost:$LOCAL_PORT $USER@$HOST
    fi
done