import { useNavigate } from "react-router-dom";

function AvailableDonationCard({ donation, onClaim }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold text-green-700">
                        {donation.foodName}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {donation.category}
                    </p>

                </div>

                <span
                    className={`px-4 py-1 rounded-full text-white text-sm font-semibold
                    ${
                        donation.status === "Available"
                            ? "bg-green-500"
                            : donation.status === "Claimed"
                            ? "bg-blue-500"
                            : donation.status === "Picked Up"
                            ? "bg-orange-500"
                            : donation.status === "Completed"
                            ? "bg-purple-500"
                            : "bg-red-500"
                    }`}
                >
                    {donation.status}
                </span>

            </div>

            {/* Details */}

            <div className="mt-6 grid grid-cols-2 gap-4">

                <div>

                    <p className="text-gray-500 text-sm">Quantity</p>

                    <p className="font-semibold">
                        {donation.quantity} {donation.unit}
                    </p>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">Expiry</p>

                    <p className="font-semibold">
                        {new Date(donation.expiryDate).toLocaleDateString()}
                    </p>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">Location</p>

                    <p className="font-semibold">
                        {donation.pickupAddress?.city},{" "}
                        {donation.pickupAddress?.state}
                    </p>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">Category</p>

                    <p className="font-semibold">
                        {donation.category}
                    </p>

                </div>

            </div>

            {/* Description */}

            <div className="mt-5">

                <p className="text-gray-500 text-sm">
                    Description
                </p>

                <p className="line-clamp-2">
                    {donation.description || "No description provided"}
                </p>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={() => navigate(`/donation/${donation._id}`)}
                    className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                    View Details
                </button>

                {onClaim && (

                    <button
                        onClick={() => onClaim(donation._id)}
                        disabled={donation.status !== "Available"}
                        className={`px-5 py-2 rounded-lg text-white
                        ${
                            donation.status === "Available"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Claim Donation
                    </button>

                )}

            </div>

        </div>

    );

}

export default AvailableDonationCard;