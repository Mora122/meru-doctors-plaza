FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src/ ./src/
EXPOSE 5000
CMD ["sh", "-c", "npm run db:migrate && node src/server.js"]
