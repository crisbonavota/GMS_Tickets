import ReactDOM from 'react-dom';
import App from './app/app';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { getAuthHeader } from '@gms-micro/auth-methods';

declare global {
    interface Window {
        renderReports: (containerId: string) => void;
        unmountReports: (containerId: string) => void;
    }
}

const queryClient = new QueryClient();
const authHeader = getAuthHeader('reports');

export const mainComponent =
    <StrictMode>
        <ChakraProvider theme={getTheme()}>
            <QueryClientProvider client={queryClient}>
                {authHeader && <App authHeader={authHeader} />}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ChakraProvider>
    </StrictMode>;

window.renderReports = (containerId) => {
    ReactDOM.render(mainComponent, document.getElementById(containerId)
    );
};

window.unmountReports = (containerId) => {
    const el = document.getElementById(containerId);
    if (!el) {
        return;
    }

    ReactDOM.unmountComponentAtNode(el);
};
