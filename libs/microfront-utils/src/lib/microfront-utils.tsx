import ReactDOM from 'react-dom';
import { AuthProvider } from 'react-auth-kit';
import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '@gms-micro/theme-chakra-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// The idea of this function is to add two methods to the window object:
// One to render a React app on a dom element, another one to unmount the app.
// That way, the container app can render/unmount the micro-frontend at will.
export const generateReactMicrofrontEntrypoint = (
    appName: string,
    mainComponent: JSX.Element
) => {
    const containerId = `${appName}-container`;
    // @ts-ignore
    window[`render${appName.toLowerCase()}`] = () => {
        ReactDOM.render(mainComponent, document.getElementById(containerId));
    };

    // @ts-ignore
    window[`unmount${appName.toLowerCase()}`] = () => {
        const el = document.getElementById(containerId);
        if (!el) return;
        ReactDOM.unmountComponentAtNode(el);
    };
};

export const WithAuthProvider = (props: { children: React.ReactNode }) => {
    return (
        <AuthProvider
            authType={navigator.cookieEnabled ? 'cookie' : 'localstorage'}
            authName={'_gms_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}
        >
            {props.children}
        </AuthProvider>
    );
};

export const WithChakraProvider = (props: { children: React.ReactNode }) => {
    return <ChakraProvider theme={getTheme()}>{props.children}</ChakraProvider>;
};

export const WithQueryProvider = (props: { children: React.ReactNode }) => {
    const client = new QueryClient();
    const isDev = window.location.hostname === 'localhost';
    return (
        <QueryClientProvider client={client}>
            {props.children}
            {isDev && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
};
