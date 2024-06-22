// routes/userDetailsRoutes.js
const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userDetailsController');
const authMiddleware = require('../middlewares/middleware');

// Middleware to ensure authentication for all routes in this file
router.use(authMiddleware.authenticateToken);

// CRUD endpoints
router.get('/', userDetailsController.getAllUserDetails);
router.get('/:userId', userDetailsController.getUserDetails);
router.post('/', userDetailsController.createUserDetails);
router.put('/:userId', userDetailsController.updateUserDetails);
router.delete('/:userId', userDetailsController.deleteUserDetails);

module.exports = router;
 