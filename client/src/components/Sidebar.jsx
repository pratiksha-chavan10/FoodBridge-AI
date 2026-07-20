import {
    LayoutDashboard,
    Package,
    PlusCircle,
    User,
    Users,
    HandHeart,
    Truck,
    Shield,
    LogOut,
    HeartHandshake
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    const donorMenu = [
        {
            text: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            to: "/dashboard"
        },
        {
            text: "Create Donation",
            icon: <PlusCircle size={20} />,
            to: "/createDonation"
        },
        {
            text: "My Donations",
            icon: <Package size={20} />,
            to: "/my-donations"
        },
        {
            text: "Profile",
            icon: <User size={20} />,
            to: "/profile"
        }
    ];

    const ngoMenu = [
        {
            text: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            to: "/dashboard"
        },
        {
            text: "Available Donations",
            icon: <HandHeart size={20} />,
            to: "/available-donations"
        },
        {
            text: "Claimed Donations",
            icon: <Package size={20} />,
            to: "/myClaimedDonations"
        },
        {
            text: "Profile",
            icon: <User size={20} />,
            to: "/profile"
        }
    ];

    const volunteerMenu = [
        {
            text: "Dashboard",
            icon: <Truck size={20} />,
            to: "/volunteer-dashboard"
        },
        {
            text: "Profile",
            icon: <User size={20} />,
            to: "/profile"
        }
    ];

    const adminMenu = [
        {
            text: "Dashboard",
            icon: <Shield size={20} />,
            to: "/admin-dashboard"
        },
        {
            text: "Manage Users",
            icon: <Users size={20} />,
            to: "/manage-users"
        },
        {
            text: "Manage Donations",
            icon: <Package size={20} />,
            to: "/admin/donations"
        },
        {
            text: "Profile",
            icon: <User size={20} />,
            to: "/profile"
        }
    ];

    let menu = [];

    if (user?.role === "donor") menu = donorMenu;
    if (user?.role === "ngo") menu = ngoMenu;
    if (user?.role === "volunteer") menu = volunteerMenu;
    if (user?.role === "admin") menu = adminMenu;

    return (

        <div className="w-72 min-h-screen bg-gradient-to-b from-green-700 to-emerald-900 text-white flex flex-col">

            <div className="p-6 border-b border-green-600">

                <div className="flex items-center gap-3">

                    <HeartHandshake size={36} />

                    <div>

                        <h1 className="text-2xl font-bold">
                            FoodBridge AI
                        </h1>

                        <p className="text-sm text-green-200">
                            Reduce Waste • Feed People
                        </p>

                    </div>

                </div>

            </div>

            <div className="flex-1 px-4 py-6 space-y-2">

                {menu.map((item) => (

                    <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                        ${
                            location.pathname === item.to
                                ? "bg-white text-green-700 font-semibold shadow-lg"
                                : "hover:bg-green-600"
                        }`}
                    >
                        {item.icon}
                        {item.text}
                    </Link>

                ))}

            </div>

            <div className="p-5 border-t border-green-600">

                <div className="flex items-center gap-3 mb-4">

                    <div className="w-12 h-12 rounded-full bg-white text-green-700 flex items-center justify-center text-xl font-bold">

                        {user?.name?.charAt(0)}

                    </div>

                    <div>

                        <h2 className="font-semibold">

                            {user?.name}

                        </h2>

                        <p className="text-green-200 text-sm capitalize">

                            {user?.role}

                        </p>

                    </div>

                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex justify-center items-center gap-2 transition"
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Sidebar;