FROM node:17.4
ARG PORT=80
ARG PUBLIC_URL

ENV PORT=$PORT
ENV PUBLIC_URL=$PUBLIC_URL

# Create app directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Add necessary files to base directory
COPY dist ./dist
COPY ./libs/deploy/src/lib/deploy.js ./deploy.js
COPY ./libs/deploy/src/lib/deploy.json ./deploy.json
COPY ./servers/prod/package-server.json ./package.json

# install app dependencies
RUN npm install --silent

# add app
COPY ./servers/prod/server.js ./

EXPOSE $PORT
CMD [ "node", "--experimental-json-modules" ,"server.js" ]
