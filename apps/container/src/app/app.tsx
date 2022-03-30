import { Route, Routes } from "react-router-dom"
import MicroFrontend from "./MicroFrontend"

const loginHost = process.env['loginHost'] || 'http://localhost:3001';
const Login = () => <MicroFrontend name="Login" host={loginHost} />

const App = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<Login />} />
        </Routes>
    )
}

export default App