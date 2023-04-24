FROM node:lts-alpine
EXPOSE 10021
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json .
RUN chown -R node:node /home/node/app
USER node
RUN npm install
COPY . .
CMD [ "npm", "start" ]