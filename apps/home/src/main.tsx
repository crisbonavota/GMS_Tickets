import App from './app/app';
import { StrictMode } from 'react';
import { generateReactMicrofrontEntrypoint, WithAuthProvider, WithChakraProvider } from '@gms-micro/microfront-utils';
import { BrowserRouter } from 'react-router-dom';
import { config } from '@gms-micro/deploy';

const name = "home";
const app = config.apps.find(app => app.name === name);
if (!app) throw new Error(`App ${name} not found in config`);

const mainComponent =
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>;

generateReactMicrofrontEntrypoint(app.name, mainComponent);

