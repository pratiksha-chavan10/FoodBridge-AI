import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function CreateDonation() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        foodName: "",
        quantity: "",
        unit: "",
        category: "",
        expiryDate: "",
        pickupAddress: {
            street: "",
            area: "",
            city: "",
            state: "",
            pincode: ""
        },
        description: ""
    });

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleAddressChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            pickupAddress: {
                ...formData.pickupAddress,
                [name]: value
            }
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await api.post(
                "/donation/create",
                formData
            );
            
            alert("Donation Created Successfully!");

            console.log(response.data);

            navigate("/myDonations");

        } catch (error) {
            console.error(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert(error.response?.data?.message || "Failed to create donation");
        }

    }

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8 text-center">
                Create Donation
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 space-y-6"
            >

                {/* Food Name */}

                <div>

                    <label className="block mb-2 font-medium">
                        Food Name
                    </label>

                    <input
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        placeholder="Enter food name"
                        required
                    />

                </div>

                {/* Quantity & Unit */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block mb-2 font-medium">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Unit
                        </label>

                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        >

                            <option value="">Select Unit</option>
                            <option value="kg">kg</option>
                            <option value="grams">grams</option>
                            <option value="liters">liters</option>
                            <option value="plates">plates</option>
                            <option value="packets">packets</option>
                            <option value="boxes">boxes</option>

                        </select>

                    </div>

                </div>

                {/* Category */}

                <div>

                    <label className="block mb-2 font-medium">
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        placeholder="Example: Cooked Food"
                        required
                    />

                </div>

                {/* Expiry Date */}

                <div>

                    <label className="block mb-2 font-medium">
                        Expiry Date
                    </label>

                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                </div>

                {/* Pickup Address */}

                <h2 className="text-xl font-semibold">
                    Pickup Address
                </h2>

                <div>

                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.pickupAddress.street}
                        onChange={handleAddressChange}
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        value={formData.pickupAddress.area}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.pickupAddress.city}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-3"
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.pickupAddress.state}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pickupAddress.pincode}
                        onChange={handleAddressChange}
                        className="border rounded-lg p-3"
                    />

                </div>

                {/* Description */}

                <div>

                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        placeholder="Enter description"
                    />

                </div>

                {/* Submit Button */}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Create Donation
                </button>

            </form>

        </div>

    );

}

export default CreateDonation;