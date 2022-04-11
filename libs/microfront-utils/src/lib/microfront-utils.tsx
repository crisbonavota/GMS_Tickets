import ReactDOM from "react-dom";

// The idea of this function is to add two methods to the window object:
// One to render a React app on a dom element, another one to unmount the app.
// That way, the container app can render/unmount the micro-frontend at will.
export const generateReactMicrofrontEntrypoint = (appName: string, mainComponent: JSX.Element) => {
    const containerId = `${appName}-container`;
    // @ts-ignore
    window[`render${appName.toLowerCase()}`] = () => {
        ReactDOM.render(mainComponent, document.getElementById(containerId));
    };

    // @ts-ignore
    window[`unmount${appName.toLowerCase()}`] = () => {
        const el = document.getElementById(containerId);
        if (!el) return;
        ReactDOM.unmountComponentAtNode(el);
    }
}
