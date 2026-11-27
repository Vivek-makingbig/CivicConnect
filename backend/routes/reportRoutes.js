const express = require("express");
const router = express.Router();

const {
  createReport,
  handleVote,
  getReportStats,
  getAssignedMissions,
  getAllReports,
  getMyReports,
  updateReportStatus,
  deleteReport,
  verifyOTP,
  assignRescuer
} = require("../controllers/reportController");

const { authMiddleware, checkRole } = require("../controllers/auth-controller");
const upload = require("../middleware/upload");

// User reports disaster
// router.post("/report", authMiddleware, upload.single("image"), createReport);
router.post("/report", authMiddleware, checkRole("user"), upload.single("image"), createReport);

//User can vote
router.patch("/vote", authMiddleware, handleVote);


// Public platform statistics
router.get("/stats", getReportStats);

//To get reports with status = team assigned / in progress
// router.get("/assigned", authMiddleware, getAssignedMissions);
router.get("/assigned", authMiddleware, checkRole("rescue"), getAssignedMissions);


// Rescuer verifies OTP to complete mission
router.post("/verify-otp/:id", authMiddleware, checkRole("rescue"), verifyOTP);

// Admin can see all reports
// router.get("/all", authMiddleware, getAllReports);
router.get("/all", authMiddleware, getAllReports);


// Logged in user can see their reports
// router.get("/myreports", authMiddleware, getMyReports);
router.get("/myreports", authMiddleware, checkRole("user"), getMyReports);

//Admin can update the report status
// router.patch("/updatereport/:id",authMiddleware,updateReportStatus);
router.patch("/updatereport/:id", authMiddleware, checkRole("admin"), updateReportStatus);

//Admin can delete the report
// router.delete("/deletereport/:id",authMiddleware, deleteReport);
router.delete("/deletereport/:id", authMiddleware, checkRole("admin"), deleteReport);


// Admin assigns a report to a rescuer by email
router.patch("/assign/:id",authMiddleware,checkRole("admin"),assignRescuer);

module.exports = router;