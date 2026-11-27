
const sendAlert = require('../models/admin/sendAlert');

// Create a new notice
const createAlert = async (req, res) => {
    try {
        const { alertMessage } = req.body;

        if (!alertMessage || !alertMessage.trim()) {
            return res.status(400).json({
                success: false,
                message: "Notice message is required"
            });
        }

        const newNotice = await sendAlert.create({
            alertMessage: alertMessage.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Notice published successfully",
            notice: newNotice
        });

    } catch (error) {
        console.log("Error while creating notice:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to publish notice"
        });
    }
};


// Get all notices for logged-in users
const getAllAlerts = async (req, res) => {
    try {
        const notices = await sendAlert
            .find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notices
        });

    } catch (error) {
        console.log("Error while fetching notices:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch notices"
        });
    }
};

module.exports = {
    createAlert,
    getAllAlerts
};
