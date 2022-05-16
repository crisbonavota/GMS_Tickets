import App from './app/app';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { generateReactMicrofrontEntrypoint, WithAuthProvider, WithChakraProvider } from '@gms-micro/microfront-utils';
import { environment } from './environments/environment';
import { config } from '@gms-micro/deploy';

const name = 'tt-load';
const app = config.apps.find(app => app.name === name);
if (!app) throw (new Error(`App ${name} not found`));

const queryClient = new QueryClient();
const mainComponent =
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                    {!environment.production && <ReactQueryDevtools />}
                </QueryClientProvider>
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>;

generateReactMicrofrontEntrypoint(app.name, mainComponent);