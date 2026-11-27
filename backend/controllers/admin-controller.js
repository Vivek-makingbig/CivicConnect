const bcrypt = require('bcryptjs');
const User = require('../models/auth/User');
const ReportDisaster = require('../models/user/reportDisaster');

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
// const getAllRescuers = async (req, res) => {
//     try {
//         const rescuers = await User.find({ role: 'rescue' })
//             .select('-password')
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             success: true,
//             rescuers
//         });

//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({
//             success: false,
//             message: "Error while fetching rescuers"
//         });
//     }
// };

// 2. Get all rescuers with their active mission count
const getAllRescuers = async (req, res) => {
    try {
        const rescuers = await User.find({ role: 'rescue' })
            .select('-password')
            .sort({ createdAt: -1 })
            .lean();

        const missionCounts = await ReportDisaster.aggregate([
            {
                $match: {
                    assignedRescuer: { $ne: null },
                    status: {
                        $in: ['Team assigned', 'In progress']
                    }
                }
            },
            {
                $group: {
                    _id: '$assignedRescuer',
                    activeMissions: { $sum: 1 }
                }
            }
        ]);

        const countMap = {};

        missionCounts.forEach((mission) => {
            countMap[mission._id.toString()] =
                mission.activeMissions;
        });

        const rescuersWithMissions = rescuers.map((rescuer) => {
            const count =
                countMap[rescuer._id.toString()] || 0;

            return {
                ...rescuer,
                activeMissions: count,
                availability: count === 0 ? 'Free' : 'Busy'
            };
        });

        return res.status(200).json({
            success: true,
            rescuers: rescuersWithMissions
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
// const getRescuerByEmail = async (req, res) => {
//     const { email } = req.params;

//     try {
//         const rescuer = await User.findOne({
//             email: email.toLowerCase(),
//             role: 'rescue'
//         }).select('-password');

//         if (!rescuer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Rescuer not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             rescuer
//         });

//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({
//             success: false,
//             message: "Error while fetching rescuer"
//         });
//     }
// };

const getRescuerByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const rescuer = await User.findOne({
            email: email.trim().toLowerCase(),
            role: 'rescue'
        }).select('-password');

        if (!rescuer) {
            return res.status(404).json({
                success: false,
                message: "Rescuer not found"
            });
        }

        const activeMissions = await ReportDisaster.countDocuments({
            assignedRescuer: rescuer._id,
            status: {
                $in: ['Team assigned', 'In progress']
            }
        });

        const rescuerData = {
            ...rescuer.toObject(),
            activeMissions,
            availability: activeMissions === 0 ? 'Free' : 'Busy'
        };

        return res.status(200).json({
            success: true,
            rescuer: rescuerData
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