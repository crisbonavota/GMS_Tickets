FROM node:17.4
ARG PORT=80
ARG PUBLIC_URL

ENV PORT=$PORT
ENV PUBLIC_URL=$PUBLIC_URL

# Create app directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY dist ./dist
COPY package-server.json ./package.json
RUN npm install --silent

# add app
COPY server.js ./

EXPOSE $PORT
EXPOSE 3001
EXPOSE 3002
CMD [ "node", "server.js" ]
