import ReactDOM from 'react-dom';
import App from './app/app';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

declare global {
    interface Window {
        renderReports: (containerId: string) => void;
        unmountReports: (containerId: string) => void;
    }
}

export const mainComponent =
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>;

window.renderReports = (containerId) => {
    ReactDOM.render(mainComponent, document.getElementById(containerId)
    );
};

window.unmountReports = (containerId) => {
    const el = document.getElementById(containerId);
    if (!el) {
        return;
    }

    ReactDOM.unmountComponentAtNode(el);
};
