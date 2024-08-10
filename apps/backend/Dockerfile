FROM node:20-alpine 

# Set working directory
WORKDIR /app

COPY . .

# First install the dependencies (as they change less often)
RUN npm install

RUN npm run build:backend

EXPOSE 3001

WORKDIR /app/apps/backend
CMD ["npm","start"]