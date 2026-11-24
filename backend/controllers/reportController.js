const ReportDisaster = require("../models/user/reportDisaster");
const cloudinary = require("../config/cloudinary");
const crypto = require("crypto");
const sendEmail = require("../services/emailService");

// Create Report
const createReport = async (req, res) => {
  try {

    const { disasterType, location, description } = req.body;

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


    //otp handling
    // Generate OTP
    const otp = generateOTP();

    // Encrypt and hash OTP
    const otpEncrypted = encryptOTP(otp);
    const otpHash = hashOTP(otp);

    const report = new ReportDisaster({
      disasterType,
      location,
      description,
      reportedBy: req.User.id,
      imageUrl,
      imagePublicId,
      otpEncrypted,
      otpHash,
    });

    await report.save();



    //Sending mail
    // Get reporting user's email
    await report.populate("reportedBy", "userName email");

    // Send confirmation email
    if (report.reportedBy?.email) {
      await sendEmail(
        report.reportedBy.email,
        "Your disaster report has been received",
        `Hello ${report.reportedBy.userName},

Your disaster report has been successfully submitted to LocalConnect.

Report Details:
Disaster Type: ${disasterType}
Location: ${location}
Description: ${description}
Status: Pending

Our team will review your report and take the necessary action.

Thank you for helping make your community safer.

Team LocalConnect`
      );
    }
    // Remove sensitive OTP data from response
    const reportData = report.toObject();

    delete reportData.otpEncrypted;
    delete reportData.otpHash;

    res.status(201).json({
      message: "Disaster reported successfully",
      otp,
      report: reportData
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
// const getAssignedMissions = async (req, res) => {
//   try {
//     const missions = await ReportDisaster.find({ status: ["Team assigned", "In progress"] });
//     res.json(missions);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Get reports with team assigned / in progress status
const getAssignedMissions = async (req, res) => {
  try {
    const missions = await ReportDisaster.find({
      status: ["Team assigned", "In progress"]
    }).select("-otpEncrypted -otpHash -otpExpiresAt -otpAttempts -otpVerified");

    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Reports (for admin)
// const getAllReports = async (req, res) => {
//   try {

//     const reports = await ReportDisaster
//       .find()
//       .populate("reportedBy", "userName email");

//     res.json(reports);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// Get All Reports (for admin)
const getAllReports = async (req, res) => {
  try {
    const reports = await ReportDisaster
      .find()
      .populate("reportedBy", "userName email");

    const reportsWithOTP = reports.map((report) => {
      const reportData = report.toObject();

      if (reportData.otpEncrypted) {
        reportData.otp = decryptOTP(reportData.otpEncrypted);
      }

      delete reportData.otpEncrypted;
      delete reportData.otpHash;

      return reportData;
    });

    res.json(reportsWithOTP);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// // Get Reports of Logged In User
// const getMyReports = async (req, res) => {
//   try {

//     const reports = await ReportDisaster.find({
//       reportedBy: req.User.id
//     });

//     res.json(reports);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// Get Reports of Logged In User
const getMyReports = async (req, res) => {
  try {
    const reports = await ReportDisaster.find({
      reportedBy: req.User.id
    });

    const reportsWithOTP = reports.map((report) => {
      const reportData = report.toObject();

      if (reportData.otpEncrypted) {
        reportData.otp = decryptOTP(reportData.otpEncrypted);
      }

      delete reportData.otpEncrypted;
      delete reportData.otpHash;

      return reportData;
    });

    res.json(reportsWithOTP);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Update report status(Admin)
// const updateReportStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (status === "Resolved") {
//       return res.status(403).json({
//         message: "OTP verification is required to resolve a report"
//       });
//     }

//     const updatedReport = await ReportDisaster.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!updatedReport) {
//       return res.status(404).json({ message: "Report not found" });
//     }

//     res.status(200).json({ message: "Report Status updated", updatedReport });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating status", error: error.message });
//   }
// };



// Update report status (Admin)
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status === "Resolved") {
      return res.status(403).json({
        message: "OTP verification is required to resolve a report"
      });
    }

    const report = await ReportDisaster.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Avoid sending duplicate emails
    if (report.status === status) {
      return res.status(200).json({
        message: "Report status is already up to date",
        updatedReport: report
      });
    }

    report.status = status;
    await report.save();

    // Get reporting user's details
    await report.populate("reportedBy", "userName email");

    // Send status update email
    if (report.reportedBy?.email) {
      await sendEmail(
        report.reportedBy.email,
        "Disaster Report Status Updated - LocalConnect",
        `Hello ${report.reportedBy.userName},

The status of your disaster report has been updated.

Report Details:
Disaster Type: ${report.disasterType}
Location: ${report.location}
New Status: ${report.status}

Thank you for using LocalConnect.

Team LocalConnect`
      );
    }

    res.status(200).json({
      message: "Report Status updated",
      updatedReport: report
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating status",
      error: error.message
    });
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



// OTP system 

// Generate 4-digit OTP
const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};




// Encrypt OTP
const encryptOTP = (otp) => {
  const key = Buffer.from(process.env.OTP_ENCRYPTION_KEY, "hex");
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(otp, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

// Hash OTP securely
const hashOTP = (otp) => {
  return crypto
    .createHmac("sha256", process.env.OTP_HASH_SECRET)
    .update(otp)
    .digest("hex");
};

//Decrypt the otp
const decryptOTP = (encryptedData) => {
  const key = Buffer.from(process.env.OTP_ENCRYPTION_KEY, "hex");

  const [ivHex, authTagHex, encrypted] = encryptedData.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};




// Verify OTP and mark disaster report as resolved
// const verifyOTP = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { otp } = req.body;

//     if (!otp || !/^\d{4}$/.test(otp)) {
//       return res.status(400).json({
//         message: "Please enter a valid 4-digit OTP"
//       });
//     }

//     const report = await ReportDisaster.findById(id);

//     if (!report) {
//       return res.status(404).json({
//         message: "Report not found"
//       });
//     }

//     if (report.status === "Resolved") {
//       return res.status(400).json({
//         message: "This mission is already completed"
//       });
//     }

//     if (!report.otpHash) {
//       return res.status(400).json({
//         message: "OTP not found for this report"
//       });
//     }

//     const enteredHash = hashOTP(otp);

//     if (enteredHash !== report.otpHash) {
//       return res.status(400).json({
//         message: "Incorrect OTP"
//       });
//     }

//     report.status = "Resolved";
//     report.otpVerified = true;

//     await report.save();

//     res.status(200).json({
//       message: "Mission completed successfully",
//       status: report.status
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message
//     });
//   }
// };


// Verify OTP and mark disaster report as resolved
const verifyOTP = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    if (!otp || !/^\d{4}$/.test(otp)) {
      return res.status(400).json({
        message: "Please enter a valid 4-digit OTP"
      });
    }

    const report = await ReportDisaster.findById(id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    if (report.status === "Resolved") {
      return res.status(400).json({
        message: "This mission is already completed"
      });
    }

    if (!report.otpHash) {
      return res.status(400).json({
        message: "OTP not found for this report"
      });
    }

    const enteredHash = hashOTP(otp);

    if (enteredHash !== report.otpHash) {
      return res.status(400).json({
        message: "Incorrect OTP"
      });
    }

    report.status = "Resolved";
    report.otpVerified = true;

    await report.save();

    // Get reporting user's details
    await report.populate("reportedBy", "userName email");

    // Send resolution confirmation email
    if (report.reportedBy?.email) {
      await sendEmail(
        report.reportedBy.email,
        "Your Disaster Report Has Been Resolved - LocalConnect",
        `Hello ${report.reportedBy.userName},

Your disaster report has been successfully resolved.

Report Details:
Disaster Type: ${report.disasterType}
Location: ${report.location}
Status: Resolved

Thank you for helping make your community safer.

Team LocalConnect`
      );
    }

    res.status(200).json({
      message: "Mission completed successfully",
      status: report.status
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
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
  deleteReport,
  verifyOTP
};