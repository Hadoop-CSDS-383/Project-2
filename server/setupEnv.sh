#!/bin/bash

#create the virtual environment
python3 -m venv env

# install dependencies
env/bin/pip install -r dependencies.txt

# create .env file in the backend directory with the provided arguments
dbHost=$1
dbUser=$2
dbPassword=$3
dbName=$4
secretKey=$5

echo "DB_NAME=${dbName}" > backend/.env
echo "DB_USER=${dbUser}" >> backend/.env
echo "DB_PASSWORD=${dbPassword}" >> backend/.env
echo "DB_HOST=${dbHost}" >> backend/.env
echo "SECRET_KEY=${secretKey}" >> backend/.env
echo "DEBUG=on" >> backend/.env