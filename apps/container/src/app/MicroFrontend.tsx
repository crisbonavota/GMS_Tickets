import { useEffect } from 'react';

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

        const renderRemoteJS = async () => {
            const response = await fetch(`/${name.toLowerCase()}-app/asset-manifest.json`);
            const manifest =  await response.json();

            const script = document.createElement('script');
            script.id = scriptId;
            script.crossOrigin = '';
            script.src = `/${name.toLowerCase()}-app/${manifest.files['main.js']}`;
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