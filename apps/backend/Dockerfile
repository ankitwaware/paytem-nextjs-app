FROM node:20-alpine 

# Set working directory
WORKDIR /user/backend/src

COPY . .

# First install the dependencies (as they change less often)
RUN npm install

RUN npm run build:backend

EXPOSE 3001

CMD ["npm","start"]