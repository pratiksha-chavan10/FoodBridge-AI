import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useNavigate } from "react-router-dom";



function DonationDetails() {

    const { id } = useParams();


    const [donation, setDonation] = useState(null);

    useEffect(() => {
        fetchDonation();
    }, []);

    

    async function fetchDonation() {

        try {

            const response = await api.get(`/donation/${id}`);

            setDonation(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!donation) {

        return <h2 className="text-center mt-10">Loading...</h2>;

    }

    return (

        <div className="max-w-4xl mx-auto p-8">

            <div className="bg-white shadow-xl rounded-xl p-8">

                <h1 className="text-4xl font-bold text-green-700 mb-8">
                    {donation.foodName}
                </h1>

                {/* We'll improve this layout next */}

            </div>

        </div>

    );

}

export default DonationDetails;