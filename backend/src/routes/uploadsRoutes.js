// routes/uploadsRoutes.js
const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');
const authMiddleware = require('../middlewares/middleware');

// Middleware to ensure authentication for all routes in this file
router.use(authMiddleware.authenticateToken);

// CRUD endpoints
router.get('/:userId', uploadsController.getUserUploads);
router.post('/:userId', uploadsController.uploadUserFiles);
router.delete('/:userId', uploadsController.deleteUserUploads);

module.exports = router;
