# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY . /code/
#COPY dependencies.txt /code/
RUN pip install -r dependencies.txt
#RUN ./code/setupEnv.sh $DB_HOST $DB_USER $DB_PASSWORD $DB_NAME $SECRET_KEY
