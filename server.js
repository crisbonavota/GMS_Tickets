const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet({ contentSecurityPolicy: false }));
// @ts-ignore
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());
server.use(cors());

const basePath = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';
const apps = process.env.APPS ? process.env.APPS.split(',') : [];
server.use(`${basePath}/`, express.static(`${__dirname}/dist/apps/container`));

// Serve each app static files under /<appName>-app
apps.forEach(app => server.use(`${basePath}/${app.toLowerCase()}-app`, express.static(`${__dirname}/dist/apps/${app.toLowerCase()}`)));

server.get(`${basePath}*`, (req, res) => {
    res.sendFile(`${__dirname}/dist/apps/container/index.html`);
});

const mainPort = process.env.PORT ? process.env.PORT : 3000;
server.listen(mainPort, () => console.log(`Example app listening on port ${mainPort}`));
console.log(process.env.APPS.split(','));