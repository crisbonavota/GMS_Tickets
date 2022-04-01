import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/quicksand';
import '@fontsource/b612';
import '@fontsource/b612-mono';
import App from './app/app';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';

ReactDOM.render(
    <StrictMode>
        <ChakraProvider theme={getTheme()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>,
    document.getElementById('root')
);
