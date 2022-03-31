import { Route, Routes } from "react-router-dom"
import { environment } from "../environments/environment";
import MicroFrontend from "./MicroFrontend"

const Login = () => <MicroFrontend name="Login" host={environment.loginHost} />
const Reports = () => <MicroFrontend name="Reports" host={environment.reportsHost} />

const App = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/reports" element={<Reports />} />
        </Routes>
    )
}

export default App