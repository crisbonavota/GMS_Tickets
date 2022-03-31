import { Route, Routes } from "react-router-dom"
import { environment } from "../environments/environment";
import MicroFrontend from "./MicroFrontend"

const loginHost = environment.loginHost;
const Login = () => <MicroFrontend name="Login" host={loginHost} />

const App = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<Login />} />
        </Routes>
    )
}

export default App