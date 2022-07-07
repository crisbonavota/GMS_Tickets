import App from './app/app';
import { StrictMode } from 'react';
import {
    generateReactMicrofrontEntrypoint,
    WithAuthProvider,
    WithChakraProvider,
} from '@gms-micro/microfront-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { config } from '@gms-micro/deploy';
import { environment } from './environments/environment';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './app/redux/store';

const name = 'pm-projects';
const app = config.apps.find((app) => app.name === name);
if (!app) throw new Error(`App ${name} not found`);

const queryClient = new QueryClient();

const mainComponent = (
    <StrictMode>
        <ReduxProvider store={store}>
            <WithAuthProvider>
                <WithChakraProvider>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <App basePath={app.path} />
                            {!environment.production && <ReactQueryDevtools />}
                        </BrowserRouter>
                    </QueryClientProvider>
                </WithChakraProvider>
            </WithAuthProvider>
        </ReduxProvider>
    </StrictMode>
);

generateReactMicrofrontEntrypoint(app.name, mainComponent);
