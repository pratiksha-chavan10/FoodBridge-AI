function DonationCard({ donation, onDelete }) {

    const getStatusColor = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-500";
            case "Claimed":
                return "bg-blue-500";
            case "Picked Up":
                return "bg-yellow-500";
            case "Completed":
                return "bg-purple-500";
            case "Expired":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border">

            {/* Header */}

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold text-green-700">
                    🍛 {donation.foodName}
                </h2>

                <span
                    className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusColor(donation.status)}`}
                >
                    {donation.status}
                </span>

            </div>

            {/* Details */}

            <div className="grid grid-cols-2 gap-5 mt-6">

                <div>
                    <p className="text-gray-500 text-sm">
                        Quantity
                    </p>
                    <p className="font-semibold">
                        {donation.quantity} {donation.unit}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Category
                    </p>
                    <p className="font-semibold">
                        {donation.category}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Expiry Date
                    </p>
                    <p className="font-semibold">
                        {new Date(donation.expiryDate).toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Created On
                    </p>
                    <p className="font-semibold">
                        {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                </div>

            </div>

            {/* Address */}

            <div className="mt-6">

                <p className="text-gray-500 text-sm mb-1">
                    Pickup Address
                </p>

                <p className="font-medium">
                    📍 {donation.pickupAddress?.street},
                    {" "}{donation.pickupAddress?.area},
                    {" "}{donation.pickupAddress?.city},
                    {" "}{donation.pickupAddress?.state}
                    {" - "}
                    {donation.pickupAddress?.pincode}
                </p>

            </div>

            {/* Description */}

            <div className="mt-6">

                <p className="text-gray-500 text-sm mb-1">
                    Description
                </p>

                <p className="text-gray-700">
                    {donation.description || "No description provided"}
                </p>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(donation._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default DonationCard;