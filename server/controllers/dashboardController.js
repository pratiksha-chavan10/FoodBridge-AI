const User = require("../models/User");
const Donation = require("../models/Donation");

const dashboard = async (req, res) => {
    try {
        switch (req.user.role) {
            case "donor":{
                // donor dashboard
                const total=await Donation.countDocuments({
                    donor: req.user.id
                })
                const available=await Donation.countDocuments({
                    donor: req.user.id,
                    status:"Available"
                });
                const claimed=await Donation.countDocuments({
                    donor: req.user.id,
                    status:"Claimed"
                });
                const pickedUp=await Donation.countDocuments({
                    donor: req.user.id,
                    status:"Picked Up"
                });
                const completed=await Donation.countDocuments({
                    donor: req.user.id,
                    status:"Completed"
                });

                return res.status(200).json({
                    success:true,
                    message:"Dashboard data is fetched successfully",
                    data:{
                        "totalDonations": total,
                        "availableDonations": available,
                        "claimedDonations": claimed,
                        "pickedUpDonations":pickedUp,
                        "completedDonations": completed
                    }
                });
            }  

            case "ngo":{
                // ngo dashboard
                const mydonations=await Donation.countDocuments({
                    donor: req.user.id
                });
                const total=await Donation.countDocuments({
                    claimedBy: req.user.id
                });
                const claimed = await Donation.countDocuments({
                    claimedBy: req.user.id,
                    status: "Claimed"
                });
                const pickedUp=await Donation.countDocuments({
                    claimedBy: req.user.id,
                    status:"Picked Up"
                });
                const completed=await Donation.countDocuments({
                    claimedBy: req.user.id,
                    status:"Completed"
                });
                const available=await Donation.countDocuments({
                    status:"Available"
                });
                return res.status(200).json({
                    success:true,
                    message:"Dashboard data is fetched successfully",
                    data:{
                        "myDonations":mydonations,
                        "totalDonations": total,
                        "claimedDonations": claimed,
                        "pickedUpDonations":pickedUp,
                        "completedDonations": completed,
                        "availableDonations": available
                    }
                });
            }  

            case "volunteer":{
                // volunteer dashboard
                const total = await Donation.countDocuments({
                    assignedVolunteer: req.user.id
                });

                const pickedUp = await Donation.countDocuments({
                    assignedVolunteer: req.user.id,
                    status: "Picked Up"
                });

                const completed = await Donation.countDocuments({
                    assignedVolunteer: req.user.id,
                    status: "Completed"
                });

                const pending = await Donation.countDocuments({
                    assignedVolunteer: req.user.id,
                    status: "Claimed"
                });
                return res.status(200).json({
                    success:true,
                    message:"Dashboard data is fetched successfully",
                    data:{
                        "totalAssignedDonations": total,
                        "pendingDonations": pending,
                        "pickedUpDonations":pickedUp,
                        "completedDonations": completed                       
                    }
                });
            }

            case "admin":{
                // admin dashboard

                //users
                const users=await User.countDocuments();
                const donors=await User.countDocuments({
                    role:"donor"
                });
                const ngos=await User.countDocuments({
                    role:"ngo"
                });
                const volunteers=await User.countDocuments({
                    role:"volunteer"
                });

                //donations
                const totalDonations = await Donation.countDocuments();

                const availableDonations = await Donation.countDocuments({
                    status: "Available"
                });

                const claimedDonations = await Donation.countDocuments({
                    status: "Claimed"
                });

                const pickedUpDonations = await Donation.countDocuments({
                    status: "Picked Up"
                });

                const completedDonations = await Donation.countDocuments({
                    status: "Completed"
                });
                return res.status(200).json({
                    success:true,
                    message:"Dashboard data is fetched successfully",
                    data: {
                        totalUsers: users,
                        totalDonors: donors,
                        totalNGOs: ngos,
                        totalVolunteers: volunteers,

                        totalDonations: totalDonations,
                        availableDonations: availableDonations,
                        claimedDonations: claimedDonations,
                        pickedUpDonations: pickedUpDonations,
                        completedDonations: completedDonations
                    }
                });
            }

            default:
                // invalid role
        }
    }catch(error){
        console.error(error);

            return res.status(500).json({
            success: false,
            message: "Internal Server Error"
    }); 
};

    
}

module.exports={dashboard};