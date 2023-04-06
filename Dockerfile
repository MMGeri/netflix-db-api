FROM node:lts-alpine
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 10021
CMD [ "npm", "start" ]