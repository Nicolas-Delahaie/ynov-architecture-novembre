#!/bin/bash

HOST="backend"
USER="root"
API_REGISTER_ENDPOINT="http://$HOST/api/register"
MAC=$(cat /sys/class/net/eth0/address)
echo "MAC address: $MAC"

# read locals ports from config file
LOCAL_PORTS=$(cat /etc/airnet/ports)
echo "Local ports: $LOCAL_PORTS"

# CHEKING KEY RSA
SSH_KEY=$(cat ~/.ssh/id_rsa.pub)

# Get ports from API with the user agent and the mac address
echo "Getting ports from API: $API_REGISTER_ENDPOINT for ports $LOCAL_PORTS"
ENCODED_SSH_KEY=$(echo -n "$SSH_KEY" | jq -sRr @uri)
RESPONSE=$(curl -s -w "%{http_code}" -X POST -d "mac=$MAC&raspberryPorts=$LOCAL_PORTS&sshKey=$ENCODED_SSH_KEY" -A "AirNet/1.0" $API_REGISTER_ENDPOINT)

# checking curl success
if [ $? -ne 0 ]; then
  echo "Error: Unable to fetch $API_REGISTER_ENDPOINT"
  echo "Exiting script."
  exit 1
fi

# checking Http response success
HTTP_STATUS=${RESPONSE: -3}
RESPONSE=${RESPONSE::-3} 
if [[ $HTTP_STATUS -ne 200 ]]; then
  echo "Request failed with status $HTTP_STATUS."
  echo "Response: $RESPONSE"
  exit 1
fi
REMOTE_PORTS=$(echo "$RESPONSE" | tr -d '[]')
echo "Remote ports: $REMOTE_PORTS"

# create an array of ports
IFS=',' read -ra LOCAL_PORTS <<< "$LOCAL_PORTS"
IFS=',' read -ra REMOTE_PORTS <<< "$REMOTE_PORTS"

# Loop over each port and create a reverse SSH tunnel from the raspberry to the server
for i in "${!LOCAL_PORTS[@]}"; do
    LOCAL_PORT=$(echo ${LOCAL_PORTS[$i]} | sed s/://)
    REMOTE_PORT=${REMOTE_PORTS[$i]}
    if lsof -Pi :$LOCAL_PORT -sTCP:LISTEN -t >/dev/null ; then
        echo "Creating reverse SSH tunnel for port $LOCAL_PORT to $REMOTE_PORT"
        ssh -i ~/.ssh/id_rsa -f -N \
          -o "ServerAliveInterval 14400" \
          -o "ServerAliveCountMax 6" \
          -o StrictHostKeyChecking=no \
          $USER@$HOST
    else
        echo "Local port $LOCAL_PORT is not used"
    fi
done