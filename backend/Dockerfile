FROM python:3.10


RUN apt-get update \
    && apt-get install -y --no-install-recommends && apt-get install -y wait-for-it


COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

ENV PYTHONDONTWRITEBYTECODE 1

# ENV PYTHONUNBUFFERED 1

ENV FLASK_APP="app" \
    FLASK_SKIP_DOTENV="true" \
    PYTHONUNBUFFERED="true" \
    PYTHONPATH="."

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app

CMD /wait &&  flask db reset && flask run --host=0.0.0.0