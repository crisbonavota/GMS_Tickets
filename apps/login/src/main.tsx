import ReactDOM from 'react-dom';
import App from './app/app';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { StrictMode } from 'react';

declare global {
    interface Window {
        renderLogin: (containerId: string) => void;
        unmountLogin: (containerId: string) => void;
    }
}

export const mainComponent =
    <StrictMode>
        <ChakraProvider theme={getTheme()}>
            <App />
        </ChakraProvider>
    </StrictMode>;

window.renderLogin = (containerId) => {
    ReactDOM.render(mainComponent, document.getElementById(containerId)
    );
};

window.unmountLogin = (containerId) => {
    const el = document.getElementById(containerId);
    if (!el) {
        return;
    }

    ReactDOM.unmountComponentAtNode(el);
};
