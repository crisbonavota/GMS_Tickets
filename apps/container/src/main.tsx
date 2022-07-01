import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/quicksand';
import '@fontsource/b612';
import '@fontsource/b612-mono';
import App from './app/app';
import { AuthProvider } from 'react-auth-kit';
import { WithAuthProvider, WithChakraProvider } from '@gms-micro/microfront-utils';

ReactDOM.render(
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>,
    document.getElementById('root')
);
