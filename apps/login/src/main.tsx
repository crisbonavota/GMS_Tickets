import ReactDOM from 'react-dom';
import App from './app/app';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { StrictMode } from 'react';
import { AuthProvider } from 'react-auth-kit';

declare global {
    interface Window {
        renderLogin: (containerId: string) => void;
        unmountLogin: (containerId: string) => void;
    }
}

export const mainComponent =
    <StrictMode>
        <AuthProvider
            authType='cookie'
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
        >
            <ChakraProvider theme={getTheme()}>
                <App />
            </ChakraProvider>
        </AuthProvider>

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
