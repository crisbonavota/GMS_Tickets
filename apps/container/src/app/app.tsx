import { Box, VStack } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { environment } from '../environments/environment';
import MicroFrontend from './MicroFrontend';
import Navbar from './navbar/navbar';
import NotFound from './not-found/not-found';
import { config } from '@gms-micro/deploy';
import { RequireAuth } from 'react-auth-kit';
import ClientDetailedView from '../../../pm-projects/src/app/detailed/clients/ClientDetailedView';
import AccountDetailedView from '../../../pm-projects/src/app/detailed/accounts/AccountDetailedView';

const App = () => {
    const location = useLocation();
    return (
        <VStack w={'full'} minH={'100vh'} spacing={0}>
            {!location.pathname.toLowerCase().includes('/sign-in') && (
                <Navbar />
            )}
            <Box w={'full'} flex={1} bgColor={'whitesmoke'}>
                <Routes>
                    {generateMicrofrontRoutes()}
                    <Route
                        path={'/project-management/clients/:id'}
                        element={<ClientDetailedView />}
                    />
                    <Route
                        path={'/project-management/accounts/:id'}
                        element={<AccountDetailedView />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </VStack>
    );
};

const generateMicrofrontRoutes = () => {
    const apps = environment.production
        ? config.apps.filter((app) => app.serveOn.production)
        : config.apps.filter((app) => app.serveOn.development);

    // This has to match the port that servers/dev/run-dev.js is using for main container app
    const initialPort = 3000;

    return apps.map((app, i) => (
        <Route
            // @ts-ignore
            key={app.name}
            path={app.path}
            element={
                app.requireAuth ? (
                    <RequireAuth loginPath={`/sign-in?redirect=${app.path}`}>
                        <MicroFrontend
                            name={app.name}
                            port={
                                app.devPort ? app.devPort : initialPort + i + 1
                            }
                        />
                    </RequireAuth>
                ) : (
                    <MicroFrontend
                        name={app.name}
                        port={app.devPort ? app.devPort : initialPort + i + 1}
                    />
                )
            }
        />
    ));
};

export default App;
