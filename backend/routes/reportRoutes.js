const express = require("express");
const router = express.Router();

const {
  createReport,
  handleVote,
  getAllReports,
  getMyReports,
  updateReportStatus,
   deleteReport 
} = require("../controllers/reportController");

const {authMiddleware} = require("../controllers/auth-controller");

// User reports disaster
router.post("/report", authMiddleware, createReport);

//User can vote
router.patch("/vote", authMiddleware, handleVote);


// Admin can see all reports
router.get("/all", authMiddleware, getAllReports);

// Logged in user can see their reports
router.get("/myreports", authMiddleware, getMyReports);

//Admin can update the report status
router.patch("/updatereport/:id",authMiddleware,updateReportStatus);

//Admin can delete the report
router.delete("/deletereport/:id",authMiddleware, deleteReport);

module.exports = router;