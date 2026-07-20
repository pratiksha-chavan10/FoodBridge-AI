import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardCard from "../components/DashboardCard";
import {
    FaBox,
    FaCheckCircle,
    FaHandsHelping,
    FaTruck,
    FaClipboardCheck
} from "react-icons/fa";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    async function fetchDashboard() {
        try {
            const response = await api.get("/dashboard");

            setDashboardData(response.data.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!dashboardData) {
    return <h2>Loading...</h2>;
}

return (
    <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-center mb-10">
            Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <DashboardCard
                title="Total Donations"
                value={dashboardData.totalDonations}
                icon={FaBox}
                color="text-blue-500"
            />

            <DashboardCard
                title="Available Donations"
                value={dashboardData.availableDonations}
                icon={FaCheckCircle}
                color="text-green-500"
            />

            <DashboardCard
                title="Claimed Donations"
                value={dashboardData.claimedDonations}
                icon={FaHandsHelping}
                color="text-yellow-500"
            />

            <DashboardCard
                title="Picked Up Donations"
                value={dashboardData.pickedUpDonations}
                icon={FaTruck}
                color="text-orange-500"
            />

            <DashboardCard
                title="Completed Donations"
                value={dashboardData.completedDonations}
                icon={FaClipboardCheck}
                color="text-purple-500"
            />

        </div>

    </div>
);
}
export default Dashboard;