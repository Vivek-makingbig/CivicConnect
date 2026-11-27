const mongoose = require("mongoose");

const reportDisasterSchema = new mongoose.Schema({

  disasterType: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },


  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  assignedRescuer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  status: {
    type: String,
    enum: ["Pending", "In progress", "Team assigned", "Resolved"],
    default: "Pending"
  },
  imageUrl: {
    type: String,
    default: ""
  },

  imagePublicId: {
    type: String,
    default: ""
  },

  // voting system
  upvotedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  upvoteCount: { type: Number, default: 0 },
  downvoteCount: { type: Number, default: 0 },



  // OTP verification system
  otpEncrypted: {
    type: String,
    default: null
  },

  otpHash: {
    type: String,
    default: null
  },

  otpExpiresAt: {
    type: Date,
    default: null
  },

  otpAttempts: {
    type: Number,
    default: 0
  },

  otpVerified: {
    type: Boolean,
    default: false
  },

}, { timestamps: true });

module.exports = mongoose.model("ReportDisaster", reportDisasterSchema);
