FROM node:20-alpine

WORKDIR /group-backend

COPY  package*.json ./
RUN npm install

COPY . .


RUN npm run build

EXPOSE 3030

CMD [ "npm", "start" ]
