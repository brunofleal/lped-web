FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN yarn

CMD ["yarn", "build"]

COPY . .
