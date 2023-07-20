import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { Box, VStack } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import SigninPage from "./pages/ticketsmodule/SigninPage";
import Tickets from "./redux/slices/tickets";
import TicketsDetailedView from "./pages/ticketsmodule/detailed/TicketsDetailedView";
import TicketingTabsView from "./pages/ticketsmodule/TicketingTabsView";

const App = () => {
  const location = useLocation();
  return (
    <VStack w={"full"} minH={"100vh"} spacing={0}>
      {!location.pathname.toLowerCase().includes("/signin") && <Navbar />}

      <Box w={"full"} flex={1} bgColor={"whitesmoke"}>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/tickets"
            element={
              <RequireAuth loginPath={"/signin"}>
                <TicketingTabsView />
              </RequireAuth>
            }
          />

          <Route
            path="/ticket/:id"
            element={
              <RequireAuth loginPath={"/signin"}>
                <TicketsDetailedView />
              </RequireAuth>
            }
          />
        </Routes>
      </Box>
    </VStack>
  );
};

export default App;
