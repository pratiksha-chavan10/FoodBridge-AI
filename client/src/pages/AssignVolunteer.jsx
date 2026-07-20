import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function AssignVolunteer() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [volunteers, setVolunteers] = useState([]);
    const [volunteerId, setVolunteerId] = useState("");

    useEffect(() => {
        fetchVolunteers();
    }, []);

    async function fetchVolunteers() {

        try {

            const response = await api.get("/user/volunteers");

            setVolunteers(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to fetch volunteers");

        }

    }

    async function handleAssign() {

        if (!volunteerId) {
            return alert("Please select a volunteer");
        }

        try {

            await api.put(
                `/donation/${id}/assignvolunteer`,
                {
                    volunteerId
                }
            );

            alert("Volunteer assigned successfully!");

            navigate("/myClaimedDonations");

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Assignment failed");

        }

    }

    return (

        <div className="max-w-xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Assign Volunteer
            </h1>

            <select
                value={volunteerId}
                onChange={(e) => setVolunteerId(e.target.value)}
                className="w-full border rounded-lg p-3"
            >

                <option value="">
                    Select Volunteer
                </option>

                {volunteers.map((volunteer) => (

                    <option
                        key={volunteer._id}
                        value={volunteer._id}
                    >
                        {volunteer.name}
                    </option>

                ))}

            </select>

            <button
                onClick={handleAssign}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
                Assign Volunteer
            </button>

        </div>

    );

}

export default AssignVolunteer;