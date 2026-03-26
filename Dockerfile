FROM node:22.15-alpine

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/main.js
