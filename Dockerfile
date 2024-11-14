FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm install --save-dev @nestjs/cli --force
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:dev"]