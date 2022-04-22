import App from './app/app';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getAuthHeader } from '@gms-micro/auth-methods';
import { generateReactMicrofrontEntrypoint } from '@gms-micro/microfront-utils';
import { environment } from './environments/environment';
import { config } from '@gms-micro/deploy';

const app = config.apps.find(app => app.name === 'tt-reports');

if (app) {
    const queryClient = new QueryClient();
    const authHeader = getAuthHeader(app.path);

    const mainComponent =
        <StrictMode>
            <ChakraProvider theme={getTheme()}>
                <QueryClientProvider client={queryClient}>
                    {authHeader && <App authHeader={authHeader} />}
                    {!environment.production && <ReactQueryDevtools />}
                </QueryClientProvider>
            </ChakraProvider>
        </StrictMode>;

    generateReactMicrofrontEntrypoint(app.name, mainComponent);
}

