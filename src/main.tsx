import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "react-auth-kit";
import { ChakraProvider } from "@chakra-ui/react";
import { getTheme } from "./config/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider
        authType={navigator.cookieEnabled ? "cookie" : "localstorage"}
        authName={"_Tickets_AUTH_"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        <ChakraProvider theme={getTheme()}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </ChakraProvider>
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
);
