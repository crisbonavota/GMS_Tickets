import App from './app/app';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { getAuthUser } from '@gms-micro/auth-methods';
import { generateReactMicrofrontEntrypoint } from '@gms-micro/microfront-utils';
import { BrowserRouter } from 'react-router-dom';

const authUser = getAuthUser('');

export const mainComponent =
    <StrictMode>
        <ChakraProvider theme={getTheme()}>
            <BrowserRouter>
                {authUser && <App authUser={authUser} />}
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>;

generateReactMicrofrontEntrypoint('home', mainComponent);
