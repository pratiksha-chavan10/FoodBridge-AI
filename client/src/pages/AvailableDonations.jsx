import { useEffect, useState } from "react";
import api from "../api/api";
import AvailableDonationCard from "../components/AvailableDonationCard";

function AvailableDonations() {

    const [donations, setDonations] = useState([]);

    async function fetchDonations() {

        try {

            const response = await api.get("/donation/all");

            setDonations(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to fetch donations.");

        }

    }

        async function handleClaim(id) {

        const confirmClaim = window.confirm(
            "Do you want to claim this donation?"
        );

        if (!confirmClaim) {
            return;
        }

        try {

            await api.put(`/donation/${id}/claim`);

            alert("Donation claimed successfully!");

            fetchDonations();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Failed to claim donation.");

        }
    }

    useEffect(() => {
        fetchDonations();
    }, []);

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Available Donations
            </h1>

            {donations.length === 0 ? (

                <h2>No donations available.</h2>

            ) : (

                <div className="grid gap-6">

                    {donations.map((donation) => (

                        <AvailableDonationCard
                            key={donation._id}
                            donation={donation}
                            onClaim={handleClaim}
                        />

                    ))}

                </div>

            )}

        </div>

    );

}

export default AvailableDonations;