import App from './app/app';
import { StrictMode } from 'react';
import {
    generateReactMicrofrontEntrypoint,
    WithAuthProvider,
    WithChakraProvider,
    WithQueryProvider,
} from '@gms-micro/microfront-utils';
import { config } from '@gms-micro/deploy';

const name = 'hr-employees';
const app = config.apps.find((app) => app.name === name);
if (!app) throw new Error(`App ${name} not found`);

const mainComponent = (
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <WithQueryProvider>
                    <App />
                </WithQueryProvider>
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>
);

generateReactMicrofrontEntrypoint(app.name, mainComponent);
