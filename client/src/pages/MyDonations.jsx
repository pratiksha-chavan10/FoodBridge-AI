import { useEffect, useState } from "react";
import api from "../api/api";
import DonationCard from "../components/DonationCard";

function MyDonations() {

    const [donations, setDonations] = useState([]);

    async function fetchDonations() {

        try {

            const response = await api.get("/donation/my");

            setDonations(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }


    useEffect(() => {
        fetchDonations();
    }, []);


    async function handleDelete(id) {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this donation?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await api.delete(`/donation/${id}`);

        alert("Donation deleted successfully!");

        fetchDonations(); // Refresh the list

    } catch (error) {

        console.error(error);

        alert("Failed to delete donation.");

    }
}

    return (
    <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-8">
            My Donations
        </h1>

        {donations.length === 0 ? (

            <div className="bg-white shadow rounded-lg p-8 text-center">
                <h2 className="text-xl font-semibold">
                    No Donations Found
                </h2>

                <p className="text-gray-500 mt-2">
                    Create your first donation to help someone.
                </p>
            </div>

        ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {donations.map((donation) => (
                    <DonationCard
                        key={donation._id}
                        donation={donation}
                        onDelete={handleDelete}
                    />
                ))}

            </div>

        )}

    </div>
);
}

export default MyDonations;