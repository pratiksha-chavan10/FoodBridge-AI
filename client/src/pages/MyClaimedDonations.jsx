import { useEffect, useState } from "react";
import api from "../api/api";
import MyClaimedDonationCard from "../components/MyClaimedDonationCard";
import { useNavigate } from "react-router-dom";

function MyClaimedDonations() {

    const [donations, setDonations] = useState([]);
    const navigate = useNavigate();

    async function fetchClaimedDonations() {

        try {

            const response = await api.get("/donation/claim/my");

            setDonations(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to fetch claimed donations.");

        }

    }

    useEffect(() => {
        fetchClaimedDonations();
    }, []);

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                My Claimed Donations
            </h1>

            {donations.length === 0 ? (

                <h2>No claimed donations.</h2>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {donations.map((donation) => (

                       <MyClaimedDonationCard
                            key={donation._id}
                            donation={donation}
                            onAssign={(id) =>
                                navigate(`/assignVolunteer/${id}`)
                            }
                        />

                    ))}

                </div>

            )}

        </div>

    );

}

export default MyClaimedDonations;