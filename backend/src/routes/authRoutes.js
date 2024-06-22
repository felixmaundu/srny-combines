// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', authController.getAllUsers);
router.get('/:userId', authController.getUserById);

module.exports = router;
