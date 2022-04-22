import { Box, VStack } from '@chakra-ui/react';
import { Route, Routes, useLocation } from "react-router-dom"
import { environment } from '../environments/environment';
import MicroFrontend from "./MicroFrontend"
import Navbar from "./navbar/navbar";
import NotFound from './not-found/not-found';
import { config } from '@gms-micro/deploy';

const App = () => {
    const location = useLocation();
    return (
        <VStack w={'full'} minH={'100vh'} spacing={0}>
            {!location.pathname.toLowerCase().includes('/sign-in') && <Navbar />}
            <Box w={'full'} flex={1} bgColor={'whitesmoke'}>
                <Routes>
                    {generateMicrofrontRoutes()}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </VStack>
    )
}

const generateMicrofrontRoutes = () => {
    const apps = environment.production 
        ? config.apps.filter(app => app.serveOn.production) 
        : config.apps.filter(app => app.serveOn.development);
    
    return apps.map((app) =>
        <Route
            // @ts-ignore
            key={app.name}
            path={app.path}
            element={<MicroFrontend name={app.name} port={app.devPort} />}
        />);
}

export default App