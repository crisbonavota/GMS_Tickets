import App from './app/app';
import { StrictMode } from 'react';
import {
    generateReactMicrofrontEntrypoint,
    WithAuthProvider,
    WithChakraProvider,
    WithQueryProvider,
} from '@gms-micro/microfront-utils';
import { config } from '@gms-micro/deploy';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './app/redux/store';

const name = 'pm-projects';
const app = config.apps.find((app) => app.name === name);
if (!app) throw new Error(`App ${name} not found`);

const mainComponent = (
    <StrictMode>
        <ReduxProvider store={store}>
            <WithAuthProvider>
                <WithChakraProvider>
                    <WithQueryProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </WithQueryProvider>
                </WithChakraProvider>
            </WithAuthProvider>
        </ReduxProvider>
    </StrictMode>
);

generateReactMicrofrontEntrypoint(app.name, mainComponent);
