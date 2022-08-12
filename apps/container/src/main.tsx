import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/quicksand';
import '@fontsource/b612';
import '@fontsource/b612-mono';
import App from './app/app';
import {
    WithAuthProvider,
    WithChakraProvider,
    WithQueryProvider,
} from '@gms-micro/microfront-utils';

ReactDOM.render(
    <StrictMode>
        <WithAuthProvider>
            <WithChakraProvider>
                <WithQueryProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </WithQueryProvider>
            </WithChakraProvider>
        </WithAuthProvider>
    </StrictMode>,
    document.getElementById('root')
);
