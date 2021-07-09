# FROM node:14
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn add env-cmd

# Bundle app source
COPY . .

EXPOSE 8080

# CMD [ "env-cmd", "-f", "./.env", "nodemon", "src/app.js" ]
# CMD [ "node", "./src/app.js" ]
CMD [ "./node_modules/.bin/env-cmd", "node", "src/app.js" ]