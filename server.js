const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mainServer = express();
const loginServer = express();
const reportsServer = express();
const servers = [mainServer, loginServer, reportsServer];

servers.forEach(server => {
    server.use(helmet({ contentSecurityPolicy: false }));
    // @ts-ignore
    server.use(express.urlencoded({ extended: true, strict: false }));
    server.use(express.json());
    server.use(cors());
})

const basePath = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';
// eslint-disable-next-line no-undef
mainServer.use(`${basePath}/`, express.static(`${__dirname}/dist/apps/container`));
// eslint-disable-next-line no-undef
loginServer.use(`${basePath}/`, express.static(`${__dirname}/dist/apps/login`));
// eslint-disable-next-line no-undef
reportsServer.use(`${basePath}/`, express.static(`${__dirname}/dist/apps/reports`));

mainServer.get(`${basePath}*`, (req, res) => {
    res.sendFile(`${__dirname}/dist/apps/container/index.html`);
});

loginServer.get(`${basePath}*`, (req, res) => {
    res.sendFile(`${__dirname}/dist/apps/login/asset-manifest.json`);
});

reportsServer.get(`${basePath}*`, (req, res) => {
    res.sendFile(`${__dirname}/dist/apps/reports/asset-manifest.json`);
});

// eslint-disable-next-line no-undef
const mainPort = process.env.PORT ? process.env.PORT : 3000;
const loginPort = 3001;
const reportsPort = 3002;

mainServer.listen(mainPort, () => console.log(`Example app listening on port ${mainPort}`));
loginServer.listen(loginPort, () => console.log(`Example app listening on port ${loginPort}`));
reportsServer.listen(reportsPort, () => console.log(`Example app listening on port ${reportsPort}`));
