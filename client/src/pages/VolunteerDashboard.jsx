import { useEffect, useState } from "react";
import api from "../api/api";
import VolunteerDonationCard from "../components/VolunteerDonationCard";

function VolunteerDashboard() {

    const [donations, setDonations] = useState([]);

    async function fetchAssignedDonations() {

        try {

            const response = await api.get("/donation/assigned/my");

            setDonations(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to fetch assigned donations.");

        }

    }
    async function handlePickup(id) {

        try {

            await api.put(`/donation/${id}/pickup`);

            alert("Donation picked up successfully!");

            fetchAssignedDonations();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Pickup failed");

        }

    }

    async function handleComplete(id) {

        try {

            await api.put(`/donation/${id}/complete`);

            alert("Donation completed successfully!");

            fetchAssignedDonations();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Completion failed");

        }

    }

    useEffect(() => {
        fetchAssignedDonations();
    }, []);

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                My Assigned Donations
            </h1>

            {
                donations.length === 0 ? (

                    <h2>No assigned donations.</h2>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {donations.map((donation) => (

                            <VolunteerDonationCard
                                key={donation._id}
                                donation={donation}
                                onPickup={handlePickup}
                                onComplete={handleComplete}
                            />

                        ))}

                    </div>

                )
            }

        </div>

    );

}

export default VolunteerDashboard;