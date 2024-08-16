FROM node:20-alpine 

# Set working directory
WORKDIR /user/backend

COPY package* .

# First install the dependencies (as they change less often)
RUN npm install

COPY tsconfig.json .
COPY Dockerfile .
COPY ZOD .

COPY . .

RUN npm run build:backend

EXPOSE 3001

CMD ["npm","start"]