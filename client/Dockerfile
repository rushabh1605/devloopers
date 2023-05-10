FROM node:17-alpine

ENV REACT_APP_APOLLO_SERVER_URL=https://devlooperbackend.azurewebsites.net/api/%7B*segments%7D?code=sfrMvIRi9550yQNmtIa1a4u-wfGhNq7cEyrkoxqAq7AQAzFurGhChw==

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]