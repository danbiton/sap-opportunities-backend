FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build 2>/dev/null || echo "No build"
EXPOSE 8080
CMD ["npm", "start"]
