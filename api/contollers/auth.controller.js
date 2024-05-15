import User from "../models/user.model.js";
import bycryptjs from "bcryptjs"

export const signup = async (req, res) => {
    const { fName, lName, 
            password,email,
            gender,defaultAddress,
            defaultPayment,addresses,
            paymentMethods,isReceivingOffers,
            dateOfBirth
            } = req.body;
    const hashedPassword  = bycryptjs.hashSync(password,10)
    const newUser = new User({ fName, lName,
                             gender, email,
                             defaultAddress, password : hashedPassword , 
                            defaultPayment,addresses,
                            paymentMethods,isReceivingOffers,
                            dateOfBirth});
    await newUser.save();
    res.status(201).json("User created successfully");
    console.log("Data has been saved");
};