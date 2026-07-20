const User = require("../models/User");
const Donation= require("../models/Donation");


const createDonation = async (req, res) => {
    try{
        const donor=req.user.id;
        const { foodName,quantity,unit,category,expiryDate,pickupAddress,description } = req.body;

        //1
        if (!foodName || !quantity || !unit || !category || !expiryDate || !pickupAddress) {
            return res.status(400).json({
                success: false,
                message: "Fields with * are required."
            });
        }

        if (new Date(expiryDate) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Expiry date cannot be in the past."
            });
        }
        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than zero."
            });
        }
        //2 donation object
        const newDonation = new Donation({
            donor,
            foodName ,
            quantity, 
            unit,
            category,
            expiryDate,
            pickupAddress,
            description,
                       
        });
        
        //3
        const savedDonation = await newDonation.save();

        //4
        return res.status(201).json({
                success: true,
                message: "Donation Created Successfully",
                data: savedDonation
            });
    
    }catch(error){
        console.error(error);

            return res.status(500).json({
            success: false,
            message: "Internal Server Error"
    });   

    }
};

const getMyDonations = async (req, res) => {
    try {
        const donations=await Donation.find({
            donor:req.user.id
        });
        return res.status(200).json({
            success: true,
            message: "Donations fetched successfully",
            data: donations
        });

    } catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
};

const getDonationsById=async (req,res)=>{
    try{
        const donation = await Donation.findById(req.params.id)
            .populate("donor", "name email phone")
            .populate("claimedBy", "name")
            .populate("assignedVolunteer", "name phone");

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Donations fetched successfully",
            data: donation
        });

    }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
};

const updateDonation=async (req,res)=>{
    const donation=await Donation.findById(req.params.id);
    if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        };

    if(req.user.id!==donation.donor.toString()){
         return res.status(403).json({
                success: false,
                message: "You are not the owner of this donation"
            });
    }
    if (donation.status !== "Available") {
        return res.status(400).json({
            success: false,
            message: "Only available donations can be updated."
        });
    }
    
    if (req.body.foodName) {
        donation.foodName = req.body.foodName;
    }

    if (req.body.quantity) {
        donation.quantity = req.body.quantity;
    }
    if (req.body.unit) {
        donation.unit = req.body.unit;
    }

    if (req.body.category) {
        donation.category = req.body.category;
    }

    if (req.body.expiryDate ) {
        donation.expiryDate = req.body.expiryDate;
    }
    if (req.body.pickupAddress) {
       donation.pickupAddress = req.body.pickupAddress;
    }

    if (req.body.description) {
        donation.description = req.body.description;
    }
    if (expiryDate && new Date(expiryDate) < new Date()) {
        return res.status(400).json({
            success: false,
            message: "Expiry date cannot be in the past."
        });
    }
    await donation.save();
    return res.status(200).json({
            success: true,
            message: "Donation Updated successfully",
            data: donation
        });


};

const deleteDonation=async (req,res)=>{
    const donation=await Donation.findById(req.params.id);
    if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        };

    if(req.user.id!==donation.donor.toString()){
         return res.status(403).json({
                success: false,
                message: "You are not the owner of this donation"
            });
    }
    if (donation.status !== "Available") {
        return res.status(400).json({
            success: false,
            message: "Only available donations can be updated."
        });
    }
    
    
    await donation.deleteOne();
    return res.status(200).json({
            success: true,
            message: "Donation Deleted successfully",
            data: donation
        });


};

const getAllDonations = async (req, res) => {

    try {

        const donations = await Donation.find()

            .populate("donor", "name")

            .populate("claimedBy", "name")

            .populate("assignedVolunteer", "name")

            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: donations
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const claimDonation=async (req,res)=>{
    try{
        const donation=await Donation.findById(req.params.id);
        if (!donation) {
                return res.status(404).json({
                    success: false,
                    message: "Donation not found"
                });
        };
        if (donation.expiryDate < new Date()) {

            // Optional: Automatically update status
            donation.status = "Expired";
            await donation.save();

            return res.status(400).json({
                success: false,
                message: "This donation has expired and cannot be claimed."
            });
        }
        
        if(donation.status!=="Available"){
            return res.status(400).json({
                success:false,
                message:"Donation no longer available"
            })
        };
        if(donation.donor.toString()===req.user.id){
            return res.status(403).json({
                success:false,
                message:"You cant claim your own donation"
            })
        };

        donation.status="Claimed";
        donation.claimedBy=req.user.id;
        donation.claimedAt=new Date();

        await donation.save();

        return res.status(200).json({
            success: true,
            message: "Donations Fetched successfully",
            data: donation
        });

    }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
};

const myClaimedDonations= async (req,res)=>{
   try{
    if(req.user.role!=="ngo"){
            return res.status(403).json({
                success:false,
                message:"You cant claim any donation,You are not NGO"
            })
    };

    const donations = await Donation.find({
        claimedBy: req.user.id
    })
    .populate("assignedVolunteer", "name email phone");
        
    if(donations.length===0){
        return res.status(400).json({
            success:false,
            message:"No donation found"
        })
    };
    return res.status(200).json({
            success: true,
            message: "Donations Fetched successfully",
            data: donations
        });


   }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }

};

const pickUpDonation=async (req,res)=>{
    try{
        const donation=await Donation.findById(req.params.id);
        if (!donation){
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        };
        if(req.user.role!=="ngo"){
            return res.status(403).json({
                success:false,
                message:"You are not NGO"
            })
        };
        if(donation.status!=="Claimed"){
            return res.status(400).json({
                success:false,
                message:"Donation is not claimed yet"
            })
        };

       if (donation.claimedBy.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: "You cant't pickup donation because you didn't claimed it"
            });
        };

        donation.status="Picked Up";
        donation.pickedUpAt=new Date();

        await donation.save();

        return res.status(200).json({
            success: true,
            message: "Donation marked as picked up successfully",
            data: donation
        });


    }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
}

const completeDonation=async (req,res)=>{
    try{
        const donation=await Donation.findById(req.params.id);
        if (!donation){
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        };
        if(req.user.role!=="ngo"){
            return res.status(403).json({
                success:false,
                message:"You are not NGO"
            })
        };
        if(donation.status!=="Picked Up"){
            return res.status(400).json({
                success:false,
                message:"Donation is not picked up yet"
            })
        };

       if (donation.claimedBy.toString() !== req.user.id){
            return res.status(403).json({
                success: false,
                message: "You cant't complete donation because you didn't claimed it"
            });
        };

        donation.status="Completed";
        donation.completedAt=new Date();

        await donation.save();

        return res.status(200).json({
            success: true,
            message: "Donation marked as completed successfully",
            data: donation
        });


    }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
};
const assignedVolunteer=async (req,res)=>{
    try{
        const donation=await Donation.findById(req.params.id);

        if (!donation){
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        };
        if (donation.claimedBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You haven't claimed this donation."
            });
        }
        if (donation.status !== "Claimed") {
            return res.status(400).json({
                success: false,
                message: "Volunteer can only be assigned to claimed donations."
            });
        }
        const { volunteerId } = req.body;
        if (!volunteerId) {
            return res.status(400).json({
                success: false,
                message: "Volunteer ID is required."
            });
        }
        
        
        const vol=await User.findById(volunteerId);
        if(!vol){
            return res.status(404).json({
                success: false,
                message: "Volunteer not found"
            });
        }
        if (vol.role !== "volunteer") {
            return res.status(403).json({
                success: false,
                message: "This user is not a volunteer"
            });
        }
        if (!vol.ngo || vol.ngo.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "This volunteer does not belong to your NGO"
            });
        }
        if (donation.assignedVolunteer) {
            return res.status(400).json({
                success: false,
                message: "Volunteer already assigned"
            });
        }
        donation.assignedVolunteer = volunteerId;

        await donation.save();

        return res.status(200).json({
            success: true,
            message: "Volunteer Assigned successfully",
            data: donation
        });
        
    }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
 };

    const myAssignedDonations = async (req, res) => {
        try {
            if (req.user.role !== "volunteer") {
                return res.status(403).json({
                    success: false,
                    message: "You are not a volunteer"
                });
            }
            const donations = await Donation.find({
                assignedVolunteer: req.user.id
            })
            .populate("donor", "name phone")
            .populate("claimedBy", "name");

            return res.status(200).json({
                success: true,
                data: donations
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success:false,
                message:"Internal Server Error"
            });

        }
    };

const filterDonations=async (req,res)=>{
    try{
        const { status, category } = req.query;
        const filter = {};
    
        if (status) {
            filter.status = status;
        }
    
        if (category) {
            filter.category = category;
        }

        const donations = await Donation.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Donations fetched successfully",
            total: donations.length,
            data: donations
        });

        }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
};

const pagination = async (req,res)=>{
    try{
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Number(req.query.limit) || 10);

        const skip = (page - 1) * limit;
        const total = await Donation.countDocuments();

        const donations = await Donation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: "Donations fetched successfully",
            total,
            page,
            limit,
            count: donations.length,
            data: donations
        });
    }catch (error) {
        console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
             });   
    }
}

const getAllDonationsForAdmin = async (req, res) => {

    try {

        const donations = await Donation.find()
            .sort({ createdAt: -1 })
            .populate("donor", "name email")
            .populate("claimedBy", "name")
            .populate("assignedVolunteer", "name");

        return res.status(200).json({

            success: true,
            data: donations

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

const deleteDonationByAdmin = async (req, res) => {
    try {

        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        await donation.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Donation deleted successfully"
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
    createDonation,
    getMyDonations,
    getDonationsById,
    updateDonation,
    deleteDonation,
    getAllDonations,
    claimDonation,
    myClaimedDonations,
    pickUpDonation,
    completeDonation,
    assignedVolunteer,
    filterDonations,
    myAssignedDonations,
    getAllDonationsForAdmin,
    deleteDonationByAdmin
};