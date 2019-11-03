FROM node:10
ENV YOUTUBE_API_KEY=""
ENV REDIS_HOST=""
ENV REDIS_PORT=6379
ENV EXPRESS_PORT =80
ENV REDIS_PASS=""
ENV INTERVAL_MS=1800000
ENV YOUTUBE_ID=""

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
EXPOSE 80
CMD npm run start