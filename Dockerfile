# Build dependencies
FROM node:18.12.1 as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY . . 
# Build production image
FROM dependencies as builder
RUN npm run build
EXPOSE 8080
CMD npm run start