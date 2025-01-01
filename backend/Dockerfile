FROM node:20-alpine
  
WORKDIR /usr/src/app

RUN apk add --no-cache bash

COPY . .

RUN chmod +x wait-for-it.sh && npm ci

CMD ["sh", "-c", "./wait-for-it.sh db:3306 -- node ./config/db-init.js && npm start"]