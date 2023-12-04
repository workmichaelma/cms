FROM node:18

WORKDIR /usr/src/frontend

COPY package*.json /usr/src/frontend

RUN npm install

COPY . /usr/src/frontend

EXPOSE 3000

CMD npm run start