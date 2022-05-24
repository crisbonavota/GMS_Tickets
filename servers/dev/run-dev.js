const { spawn } = require('child_process');
const config = require('../../libs/deploy/src/lib/deploy.json');

const initialPort = 3000;

// Main container initial serve
spawn('npx.cmd', ['nx', 'run', 'container:serve', '--port', '3000'], {
    stdio: 'inherit',
});

// Microfrontends serve
const apps = config.apps.filter((app) => app.serveOn.development);
apps.forEach((app, i) =>
    spawn(
        'npx.cmd',
        [
            'nx',
            'run',
            `${app.name}:serve`,
            '--port',
            //@ts-ignore
            app.devPort ? app.devPort : initialPort + i + 1,
        ],
        { stdio: 'inherit' }
    )
);
