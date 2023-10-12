FROM postgres:14-bullseye
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=test
ENV POSTGRES_DB=test_db
COPY  . .
COPY pg-setup.sql /docker-entrypoint-initdb.d/
RUN apt-get update
RUN apt-get install -y python3-pip git python3-venv
RUN pip install -r dependencies.txt
#DB_NAME=[db name here]
ENV DB_NAME=test_db
#DB_USER=[db user here]
ENV DB_USER=root
#DB_PASSWORD=[db user password here]
ENV DB_PASSWORD=test
#DB_HOST=[db host here]
ENV DB_HOST=localhost
#SECRET_KEY=[secret key here]
ENV SECRET_KEY="django-insecure-!@#1234567890"
#DEBUG=on
ENV DEBUG=on
#./setupEnv.sh [db host] [dbUser] [dbUserPassword] [dbName] [secrete django key]
RUN ./setupEnv.sh localhost $POSTGRES_USER $POSTGRES_PASSWORD $POSTGRES_DB "django-insecure-!@#1234567890"
#RUN source venv/bin/activate

CMD ["python3", "--version"]
CMD ["postgres"]
CMD ["python3", "manage.py", "runserver"]
