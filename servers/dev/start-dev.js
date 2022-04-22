const { spawn } = require("child_process");
const config = require('../../libs/deploy/src/lib/deploy.json');

// Main container initial serve
spawn("npx.cmd", ["nx", "run", "container:serve", "--port", "3000"], { stdio: 'inherit' });

// Microfrontends serve
const apps = config.apps.filter(app => app.serveOn.development);
apps.forEach(app => spawn("npx.cmd", ["nx", "run", `${app.name}:serve`, "--port", app.devPort.toString()], { stdio: 'inherit' }));