import { useEffect } from 'react';
import { environment } from '../environments/environment';

interface Props {
    name: string;
}

const MicroFrontend = ({ name }: Props) => {
    useEffect(() => {
        const scriptId = `micro-frontend-script-${name}`;

        const renderMicroFrontend = () => {
            // history?
            (window as any)[`render${name}`](`${name}-container`);
        };

        if (document.getElementById(scriptId)) {
            renderMicroFrontend();
            return;
        }

        // In development, the apps are served from multiple ports, in production, they're under the same port
        // Example: the reports app manifest is served from http://localhost/reports-app/asset-manifest.json in prod but from http://<reportsHost>/asset-manifest.json in dev
        
        /* This is because the hot-reload server that we use for development (npm i -G serve) is super basic and can't be configured to serve static files through custom paths,
           but with the prod express server, we can configure that the apps static files can be served trough custom paths (<app-name>-app/), so in dev we
           workaround this by serving each app on it's own port (take a look to the server.js to see the static files serving) */

        const renderRemoteJS = async () => {
            const basePath = environment.production 
                ? `/${name.toLowerCase()}-app` // Prod: the server serves the static files from <appname>-app/
                : `${environment[`${name.toLocaleLowerCase()}Host`]}`; // Dev: the server serves the static files from <appHost>/

            const response = await fetch(`${basePath}/asset-manifest.json`);
            const manifest =  await response.json();

            const script = document.createElement('script');
            script.id = scriptId;
            script.crossOrigin = '';
            script.src = `${basePath}${manifest.files['main.js']}`;
            script.onload = () => {
                renderMicroFrontend();
            };
            document.head.appendChild(script);
        };

        renderRemoteJS();

        return () => {
            (window as any)[`unmount${name}`] &&
                (window as any)[`unmount${name}`](`${name}-container`);
        };
    }, [name]);

    return <main id={`${name}-container`} />;
};

export default MicroFrontend;