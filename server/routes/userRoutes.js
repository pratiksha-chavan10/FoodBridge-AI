const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const {
    getMyVolunteers,
    getAllUsers,
    deleteUser,
    getDashboardStats,
    getProfile,
    updateProfile
} = require("../controllers/userController");

router.get(
    "/volunteers",
    authMiddleware,
    authorizeRoles("ngo"),
    getMyVolunteers
);

router.get(
    "/all",
    authMiddleware,
    authorizeRoles("admin"),
    getAllUsers
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteUser
);

router.get(
    "/dashboard",
    authMiddleware,
    authorizeRoles("admin"),
    getDashboardStats
);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

module.exports = router;