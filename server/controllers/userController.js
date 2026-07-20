const User = require("../models/User");
const Donation = require("../models/Donation");

const getMyVolunteers = async (req, res) => {
    try {

        const volunteers = await User.find({
            role: "volunteer",
            ngo: req.user.id
        }).select("name email phone");

        return res.status(200).json({
            success: true,
            message: "Volunteers fetched successfully",
            data: volunteers
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (req.user.id === req.params.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account."
            });
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.deleteOne();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


const getDashboardStats = async (req, res) => {

    try {
        await Donation.updateMany(
            {
                expiryDate: { $lt: new Date() },
                status: "Available"
            },
            {
                $set: {
                    status: "Expired"
                }
            }
        );

        const totalUsers = await User.countDocuments();

        const totalDonors = await User.countDocuments({
            role: "donor"
        });

        const totalNGOs = await User.countDocuments({
            role: "ngo"
        });

        const totalVolunteers = await User.countDocuments({
            role: "volunteer"
        });

        const totalAdmins = await User.countDocuments({
            role: "admin"
        });

        const totalDonations = await Donation.countDocuments();

        const available = await Donation.countDocuments({
            status: "Available"
        });

        const claimed = await Donation.countDocuments({
            status: "Claimed"
        });

        const pickedUp = await Donation.countDocuments({
            status: "Picked Up"
        });

        const completed = await Donation.countDocuments({
            status: "Completed"
        });
        const expired = await Donation.countDocuments({
            status: "Expired"
        });

        return res.status(200).json({

            success: true,

            data: {

                totalUsers,
                totalDonors,
                totalNGOs,
                totalVolunteers,
                totalAdmins,

                totalDonations,
                available,
                claimed,
                pickedUp,
                completed,
                expired

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            address
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    getMyVolunteers,
    getAllUsers,
    deleteUser,
    getDashboardStats,
    getProfile,
    updateProfile
};