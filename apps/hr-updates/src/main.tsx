import App from './app/app';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { getAuthHeader } from '@gms-micro/auth-methods';
import { generateReactMicrofrontEntrypoint } from '@gms-micro/microfront-utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { config } from '@gms-micro/deploy';
import { environment } from './environments/environment';
import { ReactQueryDevtools } from 'react-query/devtools';

const app = config.apps.find(app => app.name === 'hr-updates');
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
