import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    defaultAddress: {
        type: String,
        required: true
    },
    addresses: [{
        // Subdocument schema for addresses
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        // Add other address fields as needed
    }],
    defaultPayment: {
        type: String ,
        required : true // Default payment method
    },
    paymentMethods: [{
        type: String // Array of payment methods
    }],
    isReceivingOffers: {
        type: Boolean,
        default: true // Default value for receiving offers
    },
    dateOfBirth: {
        type: Date 
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
