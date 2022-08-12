import App from './app/app';
import { StrictMode } from 'react';
import {
    generateReactMicrofrontEntrypoint,
    WithAuthProvider,
    WithChakraProvider,
} from '@gms-micro/microfront-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { config } from '@gms-micro/deploy';

const name = 'hr-updates';
const app = config.apps.find((app) => app.name === name);
if (!app) throw new Error(`App ${name} not found`);

const queryClient = new QueryClient();

const mainComponent = (
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>
);

generateReactMicrofrontEntrypoint(app.name, mainComponent);
