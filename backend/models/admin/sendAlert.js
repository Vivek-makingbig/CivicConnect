const mongoose = require('mongoose');

const sendAlertSchema = new mongoose.Schema({
    alertMessage: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("sendAlert", sendAlertSchema);