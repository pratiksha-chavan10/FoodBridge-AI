import { useEffect, useState } from "react";
import api from "../api/api";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {

        try {

            const response = await api.get("/user/all");

            setUsers(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to fetch users.");

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/user/${id}`);

            alert("User deleted successfully!");

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Delete failed");

        }

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Manage Users
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full border border-gray-300">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 border">Name</th>

                            <th className="p-3 border">Email</th>

                            <th className="p-3 border">Role</th>

                            <th className="p-3 border">Phone</th>

                            <th className="p-3 border">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id}>

                                <td className="border p-3">{user.name}</td>

                                <td className="border p-3">{user.email}</td>

                                <td className="border p-3 capitalize">{user.role}</td>

                                <td className="border p-3">{user.phone}</td>

                                <td className="border p-3">

                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default ManageUsers;