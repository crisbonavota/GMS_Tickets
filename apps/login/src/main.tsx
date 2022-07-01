import App from './app/app';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { StrictMode } from 'react';
import { AuthProvider } from 'react-auth-kit';
import { generateReactMicrofrontEntrypoint, WithAuthProvider, WithChakraProvider } from '@gms-micro/microfront-utils';
import { config } from '@gms-micro/deploy';

const name = "login";
const app = config.apps.find(app => app.name === name);
if (!app) throw new Error(`App ${name} not found in config`); 

const mainComponent =
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <App />
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>;

generateReactMicrofrontEntrypoint(app.name, mainComponent);

