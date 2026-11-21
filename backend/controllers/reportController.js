const ReportDisaster = require("../models/user/reportDisaster");
const cloudinary = require("../config/cloudinary");

// Create Report
const createReport = async (req, res) => {
  try {

    const { disasterType, location, description} = req.body;

    //for image upload
    let imageUrl = "";
let imagePublicId = "";

if (req.file) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "local-problems" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(req.file.buffer);
  });

  imageUrl = result.secure_url;
  imagePublicId = result.public_id;
}

    const report = new ReportDisaster({
      disasterType,
      location,
      description,
      reportedBy: req.User.id,
      imageUrl,
      imagePublicId,
    });

    await report.save();

    res.status(201).json({
      message: "Disaster reported successfully",
      report
    });

  } catch (error) {
    res.status(500).json({
      message: "Error reporting disaster",
      error: error.message
    });
  }
};


// Handle Community Voting (Upvote / Downvote)
const handleVote = async (req, res) => {
  try {
    const { reportId, action } = req.body; // action: "upvote" or "downvote"
    const userId = req.User.id;            // Matches your authentication property

    const report = await ReportDisaster.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Algorithmic check: Has this user already interacted with this report?
    const hasUpvoted = report.upvotedUsers.includes(userId);
    const hasDownvoted = report.downvotedUsers.includes(userId);

    if (action === "upvote") {
      if (hasUpvoted) {
        // Toggle Off: Remove user and decrease upvote count by 1
        report.upvotedUsers.pull(userId);
        report.upvoteCount = Math.max(0, report.upvoteCount - 1);
      } else {
        // Switch Sides: Remove from downvotes if they are moving to upvotes
        if (hasDownvoted) {
          report.downvotedUsers.pull(userId);
          report.downvoteCount = Math.max(0, report.downvoteCount - 1);
        }
        // Add user to upvotes and increase count
        report.upvotedUsers.push(userId);
        report.upvoteCount += 1;
      }
    } 
    
    else if (action === "downvote") {
      if (hasDownvoted) {
        // Toggle Off: Remove user and decrease downvote count by 1
        report.downvotedUsers.pull(userId);
        report.downvoteCount = Math.max(0, report.downvoteCount - 1);
      } else {
        // Switch Sides: Remove from upvotes if they are moving to downvotes
        if (hasUpvoted) {
          report.upvotedUsers.pull(userId);
          report.upvoteCount = Math.max(0, report.upvoteCount - 1);
        }
        // Add user to downvotes and increase count
        report.downvotedUsers.push(userId);
        report.downvoteCount += 1;
      }
    } 
    
    else {
      return res.status(400).json({ message: "Invalid action. Use 'upvote' or 'downvote'." });
    }

    await report.save();

    res.status(200).json({ 
      message: `Successfully processed ${action}`, 
      upvoteCount: report.upvoteCount,
      downvoteCount: report.downvoteCount
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating vote counters", error: error.message });
  }
};



//get the report statistics on basis of status
const getReportStats = async (req, res) => {
  try {
    const total = await ReportDisaster.countDocuments();
    const solved = await ReportDisaster.countDocuments({ status: "Resolved" });
    const pending = total - solved;

    res.json({ total, solved, pending });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



//Get reports with team assigned / in progress status
const getAssignedMissions = async (req, res) => {
  try {
    const missions = await ReportDisaster.find({ status: ["Team assigned", "In progress"] });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Get All Reports (for admin)
const getAllReports = async (req, res) => {
  try {

    const reports = await ReportDisaster
      .find()
      .populate("reportedBy", "userName email");

    res.json(reports);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Reports of Logged In User
const getMyReports = async (req, res) => {
  try {

    const reports = await ReportDisaster.find({
      reportedBy: req.User.id
    });

    res.json(reports);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update report status(Admin)
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReport = await ReportDisaster.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report Status updated", updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};

//Delete report(Admin)
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReport = await ReportDisaster.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
};



module.exports = {
  createReport,
  handleVote,
  getReportStats,
  getAssignedMissions,
  getAllReports,
  getMyReports,
  updateReportStatus,
  deleteReport
};