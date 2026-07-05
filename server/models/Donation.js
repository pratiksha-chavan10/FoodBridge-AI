const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({

    donor: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
        required: true
    },

    foodName: {
        type: String,
        required: true
    },

    quantity: {
    type: Number,
    required: true
    },

    unit: {
        type: String,
        enum: ["kg", "grams", "liters", "plates", "packets", "boxes"],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    pickupAddress: {
        street: String,
        area: String,
        city: String,
        state: String,
        pincode: String,
        
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: ["Available", "Claimed", "Picked Up", "Completed", "Expired"],
        default: "Available"
    },

    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    claimedAt: {
        type: Date,
        default: null
    },
    assignedVolunteer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    pickedUpAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
}

}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);