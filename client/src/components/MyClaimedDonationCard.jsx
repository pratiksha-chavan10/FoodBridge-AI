function MyClaimedDonationCard({ donation, onAssign }) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold text-green-700">
                    {donation.foodName}
                </h2>

                <span className="bg-blue-500 text-white px-4 py-1 rounded-full">
                    {donation.status}
                </span>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

                <div>
                    <p className="text-gray-500">Quantity</p>
                    <p>{donation.quantity} {donation.unit}</p>
                </div>

                <div>
                    <p className="text-gray-500">Category</p>
                    <p>{donation.category}</p>
                </div>

                <div>
                    <p className="text-gray-500">Expiry</p>
                    <p>{new Date(donation.expiryDate).toLocaleDateString()}</p>
                </div>

                <div>
                    <p className="text-gray-500">Location</p>
                    <p>
                        {donation.pickupAddress?.city},{" "}
                        {donation.pickupAddress?.state}
                    </p>
                </div>

            </div>

            <div className="mt-5">

                <p className="text-gray-500">
                    Description
                </p>

                <p>
                    {donation.description || "No description"}
                </p>

            </div>

            {!donation.assignedVolunteer && (

                <button
                   onClick={() => {
                        console.log("Button clicked");
                        onAssign(donation._id);
                    }}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    {donation.assignedVolunteer ? (
                        <div className="mt-6 p-4 bg-green-100 rounded-lg">

                            <h3 className="font-bold text-green-700">
                                Volunteer Assigned ✅
                            </h3>

                            <p>
                                <strong>Name:</strong> {donation.assignedVolunteer.name}
                            </p>

                            <p>
                                <strong>Phone:</strong> {donation.assignedVolunteer.phone}
                            </p>

                            <p>
                                <strong>Email:</strong> {donation.assignedVolunteer.email}
                            </p>

                        </div>
                    ) : (
                        <button
                            onClick={() => onAssign(donation._id)}
                            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg"
                        >
                            Assign Volunteer
                        </button>
                    )}
                </button>

            )}

            {donation.assignedVolunteer && (

                <button
                    disabled
                    className="mt-6 w-full bg-gray-500 text-white py-3 rounded-lg"
                >
                    Volunteer Assigned
                </button>

            )}

        </div>

    );

}

export default MyClaimedDonationCard;