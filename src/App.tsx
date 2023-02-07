import { Routes, Route, useLocation } from "react-router-dom";
import AccountDetailedView from "./pages/pm/detailed/accounts/AccountDetailedView";
import ClientDetailedView from "./pages/pm/detailed/clients/ClientDetailedView";
import JobDetailedView from "./pages/pm/detailed/jobs/JobDetailedView";
import TabsView from "./pages/pm/tabs/TabsView";
import { RequireAuth } from "react-auth-kit";
import SignIn from "./pages/signin/SignIn";
import { Box, VStack } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Reports from "./pages/reports/Reports";
import Updates from "./pages/updates/Updates";
import Timetracker from "./pages/timetracker/Timetracker";
import HumanResourcesTabView from "./pages/hr/tabs/HumanResourcesTabsView";
import ProviderDetailedView from "./pages/hr/detailed/providers/ProviderDetailedView";
import EmployeeDetailedView from "./pages/hr/detailed/employees/EmployeeDetailedView";
import GoogleRedirect from "./pages/signin/GoogleRedirect";

const signInPath = "/sign-in";

const App = () => {
    const location = useLocation();
    return (
        <VStack w={"full"} minH={"100vh"} spacing={0}>
            {!location.pathname.toLowerCase().includes("/sign-in") && (
                <Navbar />
            )}
            <Box w={"full"} flex={1} bgColor={"whitesmoke"}>
                <Routes>
                    <Route path={signInPath} element={<SignIn />} />
                    <Route
                        path={`${signInPath}/redirect`}
                        element={<GoogleRedirect />}
                    />

                    <Route
                        path={"/"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <Home />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/timetrack/reports"
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <Reports />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/timetrack/load"
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <Timetracker />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/human-resources/updates"
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <Updates />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path={"/project-management"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <TabsView />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={"/project-management/clients/:id"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <ClientDetailedView />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={"/project-management/accounts/:id"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <AccountDetailedView />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={"/project-management/jobs/:id"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <JobDetailedView />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path={"/human-resources"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <HumanResourcesTabView />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={"/human-resources/employees/:id"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <EmployeeDetailedView />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={"/human-resources/providers/:id"}
                        element={
                            <RequireAuth loginPath={signInPath}>
                                <ProviderDetailedView />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Box>
        </VStack>
    );
};

export default App;
