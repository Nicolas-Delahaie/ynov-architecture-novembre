#!/bin/bash

HOST="backend"
USER="root"
API_REGISTER_ENDPOINT="http://$HOST/api/register"
MAC=$(cat /sys/class/net/eth0/address)
echo "MAC address: $MAC"

# read locals ports from config file
LOCAL_PORTS=$(cat /etc/airnet/ports)
echo "Local ports: $LOCAL_PORTS"

# CHECKING KEY RSA
SSH_KEY=$(cat ~/.ssh/id_rsa.pub)

# Number of retries and sleep time
MAX_RETRIES=10
SLEEP_TIME=5

# Get ports from API with the user agent and the MAC address
echo "Getting ports from API: $API_REGISTER_ENDPOINT for ports $LOCAL_PORTS"
ENCODED_SSH_KEY=$(echo -n "$SSH_KEY" | jq -sRr @uri)

attempt=0
while true; do
  # Perform the curl request
  RESPONSE=$(curl -s -w "%{http_code}" -X POST -d "mac=$MAC&raspberryPorts=$LOCAL_PORTS&sshKey=$ENCODED_SSH_KEY" -A "AirNet/1.0" $API_REGISTER_ENDPOINT)
  
  # Check if curl was successful
  if [ $? -eq 0 ]; then
    # Extract the HTTP status
    HTTP_STATUS=${RESPONSE: -3}
    RESPONSE=${RESPONSE::-3}

    # Check if HTTP status is 200 (success)
    if [[ $HTTP_STATUS -eq 200 ]]; then
      echo "Request succeeded with status $HTTP_STATUS."
      break
    else
      echo "Request failed with status $HTTP_STATUS. Response: $RESPONSE"
    fi
  else
    echo "Error: Unable to reach $API_REGISTER_ENDPOINT."
  fi

  # Increment attempt counter
  attempt=$((attempt + 1))

  # Check if max retries are reached
  if [ $attempt -ge $MAX_RETRIES ]; then
    echo "Failed to connect to $API_REGISTER_ENDPOINT after $MAX_RETRIES attempts. Exiting."
    exit 1
  fi

  echo "Retrying in $SLEEP_TIME seconds... ($attempt/$MAX_RETRIES)"
  sleep $SLEEP_TIME
done

REMOTE_PORTS=$(echo "$RESPONSE" | tr -d '[]')
echo "Remote ports: $REMOTE_PORTS"

# Create an array of ports
IFS=',' read -ra LOCAL_PORTS <<< "$LOCAL_PORTS"
IFS=',' read -ra REMOTE_PORTS <<< "$REMOTE_PORTS"

# Loop over each port and create a reverse SSH tunnel from the Raspberry to the server
for i in "${!LOCAL_PORTS[@]}"; do
    LOCAL_PORT=$(echo ${LOCAL_PORTS[$i]} | sed s/://)
    REMOTE_PORT=${REMOTE_PORTS[$i]}
    if lsof -Pi :$LOCAL_PORT -sTCP:LISTEN -t >/dev/null ; then
        echo "Creating reverse SSH tunnel for port $LOCAL_PORT to $REMOTE_PORT"
        # WARNING autossh doesn't ensure ssh connection worked
        autossh $USER@$HOST \
          -R localhost:$REMOTE_PORT:localhost:$LOCAL_PORT \
          -i ~/.ssh/id_rsa \
          -f -N \
          -o "ServerAliveInterval 14400" \
          -o "ServerAliveCountMax 6" \
          -o StrictHostKeyChecking=no \
          -M 0
    else
        echo "Local port $LOCAL_PORT is not used"
    fi
done