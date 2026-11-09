const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth/User');

//Register user
const registerUser = async (req, res) => {
    const { userName, email, password, district } = req.body;
    try {
        // Check whether an user exits or not with the given user email

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User with the given email already exits.Please try again with another email id"
            });

        }

        //Hashing the user password
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User(
            {
                userName,
                email,
                password: hashPassword,
                district
            }
        );
        await newUser.save();
        res.status(200).json(
            {
                success: true,
                message: "Registration successfull"
            }
        );
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Some error occured while registering the user"
        });
    }
}


//Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'User does not exist'
                }
            );
        }
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password! please try again"
            });
        }


        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
                district: checkUser.district,
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "10m" }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).json(
            {
                success: true,
                message: "Logged in successfully",
                User:
                {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    userName: checkUser.userName,
                    district: checkUser.district
                },
            }
        );

    }
    catch (e) {
        return res.status(500).json(
            {
                success: false,
                message: 'Some error occured while loging'
            }
        );
    }
};



// User log out
const logoutUser = (req, res) => {
   res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
}).json({
        success: true,
        message: "Logged out successfully"
    });
}


//auth middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        });
    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.User = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({
            success: false,
            message: "Unathorised user"
        });
    }
};
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };