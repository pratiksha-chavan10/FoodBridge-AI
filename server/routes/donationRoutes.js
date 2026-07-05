const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const { createDonation,getMyDonations,getDonationsById,updateDonation,deleteDonation,getAllDonations,claimDonation,myClaimedDonations,pickUpDonation,completeDonation,assignedVolunteer,filterDonations} = require("../controllers/donationController");

router.post("/create", authMiddleware,authorizeRoles("donor","ngo"), createDonation);//"Before calling createDonation, run authMiddleware."
router.get("/my",authMiddleware,authorizeRoles("donor","ngo"),getMyDonations);
router.get("/all", authMiddleware, getAllDonations);
router.get("/claim/my",authMiddleware,authorizeRoles("ngo"),myClaimedDonations);
router.put("/:id/claim",authMiddleware,authorizeRoles("ngo"),claimDonation);
router.put("/:id/pickup", authMiddleware,authorizeRoles("volunteer"),pickUpDonation);
router.put("/:id/complete", authMiddleware,authorizeRoles("volunteer"), completeDonation);
router.put("/:id/assignvolunteer", authMiddleware,authorizeRoles("ngo"), assignedVolunteer);
router.get("/:id",authMiddleware,authorizeRoles("donor","ngo"),getDonationsById);
router.put("/:id",authMiddleware,authorizeRoles("donor","ngo"),updateDonation);
router.delete("/:id",authMiddleware,authorizeRoles("donor","ngo"),deleteDonation);



module.exports = router;