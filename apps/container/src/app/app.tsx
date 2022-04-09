import { Box, VStack } from '@chakra-ui/react';
import { Route, Routes, useLocation } from "react-router-dom"
import MicroFrontend from "./MicroFrontend"
import Navbar from "./navbar/navbar";

const Login = () => <MicroFrontend name="Login" />
const Reports = () => <MicroFrontend name="Reports" />

const App = () => {
    const location = useLocation();
    return (
        <VStack w={'full'} minH={'100vh'} spacing={0}>
            {!location.pathname.toLowerCase().includes('/sign-in') && <Navbar />}
            <Box w={'full'} flex={1} bgColor={'whitesmoke'}>
                <Routes>
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            </Box>
        </VStack>

    )
}

export default App