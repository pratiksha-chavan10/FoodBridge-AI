const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
            try{
            const { name, email, password, role,ngo, phone, address } = req.body;
            //1
            if (!name || !email || !password || !role || !phone || !address) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required."
                });
            }
            //2
            const existingUser = await User.findOne({ email });
            if(existingUser){
                return res.status(409).json({
                    success: false,
                    message: "User already exists with this email."
                });
            }
            //3
            const hashedPassword = await bcrypt.hash(password, 10);

            //4
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role,
                ngo,
                phone,
                address
            });
            //5
            const savedUser = await newUser.save();
            //6
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    role: savedUser.role
                }
            });
    
        }catch(error){
            console.error(error);

            return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        }
    };


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  1: check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        //2.Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        //3.generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
                process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        // 4. Send Respond
       return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// const createDonation = async (req, res) => {

//     console.log(req.user);

//     res.json({
//         message: "Donation created"
//     });

// }


module.exports = {
    registerUser,
    loginUser
};