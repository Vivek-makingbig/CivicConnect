const express = require("express");
const router = express.Router();

const {
    createAlert,
    getAllAlerts
} = require("../controllers/sendAlertController");

const {
    authMiddleware,
    checkRole
} = require("../controllers/auth-controller");

// Admin creates a notice
router.post(
    "/createalert",
    authMiddleware,
    checkRole("admin"),
    createAlert
);

// Any logged-in user can view notices
router.get(
    "/allalerts",
    authMiddleware,
    getAllAlerts
);

module.exports = router;