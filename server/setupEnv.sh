#!/bin/bash

#create the virtual environment
python3 -m venv env

# install dependencies
env/bin/pip install -r dependencies.txt

# create .env file in the backend directory with the provided arguments
dbName=$1
dbUser=$2
secretKey=$3

echo "DB_NAME=${dbName}" > backend/.env
echo "DB_USER=postgres" >> backend/.env
echo "DB_PASSWORD=${dbUser}" >> backend/.env
echo "DB_HOST=127.0.0.1" >> backend/.env
echo "DB_PORT=5432" >> backend/.env
echo "DEBUG=on" >> backend/.env
echo "SECRET_KEY=${secretKey}" >> backend/.env