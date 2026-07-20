import {
    LayoutDashboard,
    Package,
    Users,
    User,
    LogOut,
    HeartHandshake,
    Truck
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (

        <div className="w-72 min-h-screen bg-gradient-to-b from-green-700 to-emerald-900 text-white shadow-2xl">

            {/* Logo */}

            <div className="p-6 border-b border-green-600">

                <div className="flex items-center gap-3">

                    <HeartHandshake size={34} />

                    <div>

                        <h1 className="text-2xl font-bold">
                            FoodBridge AI
                        </h1>

                        <p className="text-green-200 text-sm">
                            Reduce Waste • Feed People
                        </p>

                    </div>

                </div>

            </div>

            {/* Menu */}

            <div className="mt-8 space-y-2 px-4">

                <SidebarItem
                    icon={<LayoutDashboard size={20}/>}
                    text="Dashboard"
                    to="/dashboard"
                />

                <SidebarItem
                    icon={<Package size={20}/>}
                    text="Donations"
                    to="/available-donations"
                />

                <SidebarItem
                    icon={<Users size={20}/>}
                    text="Profile"
                    to="/profile"
                />

                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500 transition"
                >

                    <LogOut size={20}/>

                    Logout

                </button>

            </div>

            {/* User */}

            <div className="absolute bottom-8 left-6">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-white text-green-700 flex items-center justify-center font-bold text-xl">

                        {user?.name?.charAt(0)}

                    </div>

                    <div>

                        <p className="font-semibold">

                            {user?.name}

                        </p>

                        <p className="text-green-200 text-sm">

                            {user?.role}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

function SidebarItem({ icon, text, to }) {

    return (

        <Link
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-600 transition"
        >

            {icon}

            {text}

        </Link>

    );

}

export default Sidebar;