const bcrypt = require('bcryptjs');
const User = require('../models/auth/User');

// 1. Add a new rescuer
const addRescuer = async (req, res) => {
    const { userName, email, password, district } = req.body;

    try {
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newRescuer = new User({
            userName,
            email,
            password: hashPassword,
            district,
            role: 'rescue'
        });

        await newRescuer.save();

        return res.status(201).json({
            success: true,
            message: "Rescuer registered successfully"
        });

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Error while registering rescuer"
        });
    }
};


// 2. Get all rescuers
const getAllRescuers = async (req, res) => {
    try {
        const rescuers = await User.find({ role: 'rescue' })
            .select('-password')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            rescuers
        });

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching rescuers"
        });
    }
};


// 3. Get rescuer by email
const getRescuerByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const rescuer = await User.findOne({
            email: email.toLowerCase(),
            role: 'rescue'
        }).select('-password');

        if (!rescuer) {
            return res.status(404).json({
                success: false,
                message: "Rescuer not found"
            });
        }

        return res.status(200).json({
            success: true,
            rescuer
        });

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching rescuer"
        });
    }
};


// 4. Delete rescuer by email
const deleteRescuer = async (req, res) => {
    const { email } = req.params;

    try {
        const rescuer = await User.findOneAndDelete({
            email: email.toLowerCase(),
            role: 'rescue'
        });

        if (!rescuer) {
            return res.status(404).json({
                success: false,
                message: "Rescuer not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rescuer deleted successfully"
        });

    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Error while deleting rescuer"
        });
    }
};


module.exports = {
    addRescuer,
    getAllRescuers,
    getRescuerByEmail,
    deleteRescuer
};