FROM node:lts-alpine
EXPOSE 10021
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json .
RUN chown -R node:node /home/node/app
RUN apk --no-cache add curl

USER node
RUN npm install --production
COPY . .
CMD [ "npm", "start" ]