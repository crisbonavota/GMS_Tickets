import App from './app/app';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { StrictMode } from 'react';
import { AuthProvider } from 'react-auth-kit';
import { generateReactMicrofrontEntrypoint } from '@gms-micro/microfront-utils';
import { config } from '@gms-micro/deploy';

const app = config.apps.find(app => app.name === 'login');

if (app) {
    const mainComponent =
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

    generateReactMicrofrontEntrypoint(app.name, mainComponent);
}

