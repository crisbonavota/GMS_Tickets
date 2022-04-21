import App from './app/app';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getAuthHeader } from '@gms-micro/auth-methods';
import { generateReactMicrofrontEntrypoint } from '@gms-micro/microfront-utils';

const queryClient = new QueryClient();
const authHeader = getAuthHeader('reports');

export const mainComponent =
    <StrictMode>
        <ChakraProvider theme={getTheme()}>
            <QueryClientProvider client={queryClient}>
                {authHeader && <App authHeader={authHeader} />}
            </QueryClientProvider>
        </ChakraProvider>
    </StrictMode>;

generateReactMicrofrontEntrypoint('reports', mainComponent);
