FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY ./prisma /app/prisma
RUN npm install && npm cache clean --force
RUN npx prisma generate
COPY . .
RUN npm run build
EXPOSE 4000
CMD [ "npm", "run", "start:dev" ]