FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["npx", "serve", "build/", "-l", "5173"]