FROM node:12.18.4-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
