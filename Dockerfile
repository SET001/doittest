FROM node:11
WORKDIR /app

COPY ./*.json /app/
COPY ./*.js /app/
COPY ./src /app/src

RUN npm install

CMD ["npx", "pm2", "start", "process.config.js", "--no-daemon"]