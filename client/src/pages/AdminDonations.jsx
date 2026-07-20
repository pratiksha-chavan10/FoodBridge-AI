import { useEffect, useState } from "react";
import api from "../api/api";

function AdminDonations() {

    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchDonations();
    }, []);

    async function fetchDonations() {

        try {

            const response = await api.get("/donation/all");

            setDonations(response.data.data);

        } catch (error) {

            console.error(error);
            alert("Failed to fetch donations");

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this donation?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/donation/admin/${id}`);

            alert("Donation deleted successfully");

            fetchDonations();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Delete failed");

        }

    }

    const filteredDonations = donations.filter((donation) => {

        const matchesSearch =
            donation.foodName.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || donation.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Donation Management
                </h1>

                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="Search food..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >

                        <option>All</option>
                        <option>Available</option>
                        <option>Claimed</option>
                        <option>Picked Up</option>
                        <option>Completed</option>
                        <option>Expired</option>

                    </select>

                </div>

            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead className="bg-green-600 text-white">

                        <tr>

                            <th className="p-4 text-left">Food</th>

                            <th className="p-4 text-left">Donor</th>

                            <th className="p-4 text-left">NGO</th>

                            <th className="p-4 text-left">Volunteer</th>

                            <th className="p-4 text-left">Status</th>

                            <th className="p-4 text-center">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredDonations.map((donation) => (

                            <tr
                                key={donation._id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {donation.foodName}
                                </td>

                                <td className="p-4">
                                    {donation.donor?.name || "-"}
                                </td>

                                <td className="p-4">
                                    {donation.claimedBy?.name || "-"}
                                </td>

                                <td className="p-4">
                                    {donation.assignedVolunteer?.name || "-"}
                                </td>

                                <td className="p-4">

                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                                        {donation.status}

                                    </span>

                                </td>

                                <td className="p-4 text-center">

                                    <button
                                        onClick={() => handleDelete(donation._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminDonations;