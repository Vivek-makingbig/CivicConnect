const  sendAlert= require('../models/admin/sendAlert'); 


// Create a new alert
const createAlert = async (req, res) => {
    try {
        const { alertMessage } = req.body;
        const district_admin = req.user.district; 

        const newAlert = await sendAlert.create({ 
            alertMessage, 
            district: district_admin 
        });

        res.status(201).json(newAlert);

    } catch (error) {
        console.log("Error occured while creating alert message");
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all alerts
const getAllAlerts = async (req, res) => {
    try {
        const userDistrict = req.user.district;
        const alerts = await sendAlert.find({district: userDistrict}).sort({ createdAt: -1 }); // Newest first
        res.status(200).json(alerts);
    } catch (error) {
        console.log("Error occured while displaying the alert messages")
        res.status(500).json({ error: error.message });
    }
};

module.exports = {createAlert,getAllAlerts};