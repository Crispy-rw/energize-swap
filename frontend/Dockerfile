FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "start"]