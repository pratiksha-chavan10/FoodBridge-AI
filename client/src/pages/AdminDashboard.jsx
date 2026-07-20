import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const navigate = useNavigate();

    async function fetchStats() {

        try {

            const response = await api.get("/user/dashboard");

            setStats(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to fetch dashboard data.");

        }

    }

    if (!stats) {

        return (
            <div className="text-center mt-20 text-xl">
                Loading Dashboard...
            </div>
        );

    }

    return (

    <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-10">
            Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard title="Total Users" value={stats.totalUsers} color="bg-blue-500" />

            <StatCard title="Donors" value={stats.totalDonors} color="bg-green-500" />

            <StatCard title="NGOs" value={stats.totalNGOs} color="bg-purple-500" />

            <StatCard title="Volunteers" value={stats.totalVolunteers} color="bg-yellow-500" />

            <StatCard title="Donations" value={stats.totalDonations} color="bg-pink-500" />

            <StatCard title="Available" value={stats.available} color="bg-teal-500" />

            <StatCard title="Claimed" value={stats.claimed} color="bg-orange-500" />

            <StatCard title="Completed" value={stats.completed} color="bg-red-500" />

            <StatCard title="Expired" value={stats.expired} color="bg-gray-600" />

        </div>

        <div className="mt-10 flex justify-center gap-6">

            <button
                onClick={() => navigate("/manage-users")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
                Manage Users
            </button>

            <button
                onClick={() => navigate("/admin/donations")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >
                Manage Donations
            </button>

        </div>

    </div>

);
}

function StatCard({ title, value, color }) {

    return (

        <div className={`${color} text-white rounded-xl shadow-lg p-6`}>

            <h2 className="text-lg font-semibold">
                {title}
            </h2>

            <p className="text-4xl font-bold mt-4">
                {value}
            </p>

        </div>

    );

}


export default AdminDashboard;