import { useEffect, useState } from "react";
import api from "../api/api";

function Profile() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        role: ""
    });

    const [originalUser, setOriginalUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {

        try {

            const response = await api.get("/user/profile");

            setUser(response.data.data);
            setOriginalUser(response.data.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load profile");

        } finally {

            setLoading(false);

        }

    }

    async function handleUpdate(e) {

        e.preventDefault();

        if (!originalUser) return;

        // Check if anything changed
        if (
            user.name === originalUser.name &&
            user.phone === originalUser.phone &&
            user.address === originalUser.address
        ) {

            alert("No changes made.");
            return;

        }

        try {

            const response = await api.put("/user/profile", {
                name: user.name,
                phone: user.phone,
                address: user.address
            });

            alert("Profile updated successfully!");

            setUser(response.data.data);
            setOriginalUser(response.data.data);

            const storedUser = JSON.parse(localStorage.getItem("user"));

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...storedUser,
                    name: response.data.data.name
                })
            );

        } catch (error) {

            console.error(error);

            alert(error.response?.data?.message || "Failed to update profile");

        }

    }

    if (loading) {

        return (
            <h2 className="text-center mt-20 text-2xl">
                Loading...
            </h2>
        );

    }

    return (

        <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}

                <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-10 text-white">

                    <div className="flex items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-white text-green-600 flex items-center justify-center text-5xl font-bold">

                            {user.name?.charAt(0).toUpperCase()}

                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">
                                {user.name}
                            </h1>

                            <p className="capitalize text-lg mt-2">
                                {user.role}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleUpdate}
                    className="p-10 space-y-6"
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="font-semibold">
                                Name
                            </label>

                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        name: e.target.value
                                    })
                                }
                                className="w-full mt-2 border rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={user.phone || ""}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        phone: e.target.value
                                    })
                                }
                                className="w-full mt-2 border rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Role
                            </label>

                            <input
                                value={user.role}
                                disabled
                                className="w-full mt-2 border rounded-xl p-3 bg-gray-100 capitalize"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">
                            Address
                        </label>

                        <textarea
                            rows="4"
                            value={user.address || ""}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    address: e.target.value
                                })
                            }
                            className="w-full mt-2 border rounded-xl p-3"
                        />

                    </div>

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                        >
                            Update Profile
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default Profile;

