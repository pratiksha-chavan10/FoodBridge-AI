import {
    Home,
    User,
    LogOut,
    LayoutDashboard,
    HeartHandshake
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (

        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-md">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

                {/* Logo */}

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3"
                >

                    <div className="bg-green-600 text-white rounded-xl p-2">

                        <HeartHandshake size={28} />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-green-700">
                            FoodBridge AI
                        </h1>

                        <p className="text-xs text-gray-500">
                            Reduce Waste • Feed People
                        </p>

                    </div>

                </Link>

                {/* Menu */}

                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                    >
                        <User size={20} />
                        Profile
                    </Link>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;