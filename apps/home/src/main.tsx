import App from './app/app';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { getAuthUser } from '@gms-micro/auth-methods';
import { generateReactMicrofrontEntrypoint } from '@gms-micro/microfront-utils';
import { BrowserRouter } from 'react-router-dom';
import { config } from '@gms-micro/deploy';

const app = config.apps.find(app => app.name === "home");

if (app) {
    const authUser = getAuthUser(app.path);

    const mainComponent =
        <StrictMode>
            <ChakraProvider theme={getTheme()}>
                <BrowserRouter>
                    {authUser && <App authUser={authUser} />}
                </BrowserRouter>
            </ChakraProvider>
        </StrictMode>;

    generateReactMicrofrontEntrypoint(app.name, mainComponent);
}

