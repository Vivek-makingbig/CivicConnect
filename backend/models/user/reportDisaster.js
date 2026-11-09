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

  status: {
    type: String,
    enum: ["Pending", "In progress", "Team assigned", "Resolved"], 
    default: "Pending"
  },

  // voting system
  upvotedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  upvoteCount: { type: Number, default: 0 },
  downvoteCount: { type: Number, default: 0 }

}, { timestamps: true });

module.exports = mongoose.model("ReportDisaster", reportDisasterSchema);
