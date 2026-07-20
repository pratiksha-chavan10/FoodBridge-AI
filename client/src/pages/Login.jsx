import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const role = response.data.user.role;

            if (role === "donor") {
                navigate("/dashboard");
            }
            else if (role === "ngo") {
                navigate("/dashboard");
            }
            else if (role === "volunteer") {
                navigate("/volunteerDashboard");
            }
            else if (role === "admin") {
                navigate("/adminDashboard");
            }
            setEmail("");
            setPassword("");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server is not responding.");
            }

        }
    }

    return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-xl shadow-lg w-96"
        >

            <h1 className="text-3xl font-bold text-center mb-6">
                Login
            </h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border p-3 rounded-lg mb-6"
            />

            <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
                Login
            </button>

        </form>

    </div>
);
}

export default Login;