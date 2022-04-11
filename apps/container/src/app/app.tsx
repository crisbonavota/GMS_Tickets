import { Box, VStack } from '@chakra-ui/react';
import { Route, Routes, useLocation } from "react-router-dom"
import { environment } from '../environments/environment';
import MicroFrontend from "./MicroFrontend"
import Navbar from "./navbar/navbar";
import NotFound from './not-found/not-found';

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
    const microfrontNames = environment.apps ? (environment.apps as string).split(',') : [];
    const initialPort = 3001;
    const microfronts = microfrontNames.map((name, index) => <MicroFrontend key={name} name={name} port={initialPort + index} />);
    
    // By default we use the app name as route, but you can change this by adding an element to this array
    const customPaths = [{ app: 'login', route: '/sign-in' }];

    return microfronts.map((microfront) =>
        <Route
            key={microfront.key}
            // If the customPaths has an element with the same app name, we use the route from that element
            path={customPaths.some(cPath => cPath.app === microfront.props['name'])
                ? customPaths.find(cPath => cPath.app === microfront.props['name'])?.route
                : `/${microfront.props['name']}`}
            element={microfront}
        />);
}

export default App