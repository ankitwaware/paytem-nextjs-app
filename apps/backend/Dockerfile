FROM node:18-alpine

RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

COPY . .

# First install dependencies (as they change less often)
RUN npm install

RUN npm run build
EXPOSE 8080 8082

CMD ["node", "dist/index.js"]