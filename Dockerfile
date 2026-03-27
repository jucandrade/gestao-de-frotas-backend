FROM node:22.15-alpine

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/src/main.js"]
