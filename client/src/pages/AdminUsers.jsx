import { useEffect, useState } from "react";
import api from "../api/api";

function AdminUsers() {
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
            alert("Failed to fetch users");
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Delete this user?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/user/${id}`);

            alert("User deleted successfully");

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

                <table className="w-full border">

                    <thead className="bg-green-600 text-white">

                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id} className="border-b text-center">

                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">{user.phone}</td>

                                <td className="p-3">

                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

export default AdminUsers;