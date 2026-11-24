
const express = require('express');
const router = express.Router();

const {
    addRescuer,
    getAllRescuers,
    getRescuerByEmail,
    deleteRescuer
} = require('../controllers/admin-controller');

const {
    authMiddleware,
    checkRole
} = require('../controllers/auth-controller');

// Add a rescuer
router.post(
    '/rescuers',
    authMiddleware,
    checkRole('admin'),
    addRescuer
);

// Get all rescuers
router.get(
    '/rescuers',
    authMiddleware,
    checkRole('admin'),
    getAllRescuers
);

// Get rescuer by email
router.get(
    '/rescuers/:email',
    authMiddleware,
    checkRole('admin'),
    getRescuerByEmail
);

// Delete rescuer by email
router.delete(
    '/rescuers/:email',
    authMiddleware,
    checkRole('admin'),
    deleteRescuer
);

module.exports = router;
