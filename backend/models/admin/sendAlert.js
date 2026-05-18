const mongoose = require('mongoose');

const sendAlertSchema = new mongoose.Schema({
    alertMessage: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true,
        index: true   // ✅ faster filtering
    }
}, { timestamps: true });

module.exports = mongoose.model("sendAlert", sendAlertSchema);