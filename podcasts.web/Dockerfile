FROM node:13.8.0-alpine3.11

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

EXPOSE 10888

VOLUME ["/app"]

CMD ["npm", "run", "start"]
