FROM node:20-alpine 

# Set working directory
WORKDIR /app

COPY . .

# First install the dependencies (as they change less often)
RUN npm install

RUN npm run build:web

EXPOSE 3000

WORKDIR /app/apps/web
CMD ["npm","start"]