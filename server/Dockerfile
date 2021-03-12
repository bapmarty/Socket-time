FROM node

LABEL maintainer="contact@baptistemrt.fr"

WORKDIR /usr/src/

ENV PATH /usr/src/node_modules/.bin:$PATH
ADD package.json /usr/src/package.json

RUN npm install

CMD ["node", "server.js"]