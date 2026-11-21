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
   deleteReport 
} = require("../controllers/reportController");

const {authMiddleware} = require("../controllers/auth-controller");
const upload = require("../middleware/upload");

// User reports disaster

router.post("/report", authMiddleware, upload.single("image"), createReport);

//User can vote
router.patch("/vote", authMiddleware, handleVote);


// Public platform statistics
router.get("/stats", getReportStats);

//To get reports with status = team assigned / in progress
router.get("/assigned", authMiddleware, getAssignedMissions);

// Admin can see all reports
router.get("/all", authMiddleware, getAllReports);

// Logged in user can see their reports
router.get("/myreports", authMiddleware, getMyReports);

//Admin can update the report status
router.patch("/updatereport/:id",authMiddleware,updateReportStatus);

//Admin can delete the report
router.delete("/deletereport/:id",authMiddleware, deleteReport);

module.exports = router;