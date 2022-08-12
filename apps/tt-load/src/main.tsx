import App from './app/app';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    generateReactMicrofrontEntrypoint,
    WithAuthProvider,
    WithChakraProvider,
} from '@gms-micro/microfront-utils';
import { config } from '@gms-micro/deploy';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const name = 'tt-load';
const app = config.apps.find((app) => app.name === name);
if (!app) throw new Error(`App ${name} not found`);

const queryClient = new QueryClient();
const mainComponent = (
    <StrictMode>
        <ReduxProvider store={store}>
            <WithAuthProvider>
                <WithChakraProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </WithChakraProvider>
            </WithAuthProvider>
        </ReduxProvider>
    </StrictMode>
);

generateReactMicrofrontEntrypoint(app.name, mainComponent);
