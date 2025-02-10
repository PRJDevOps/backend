const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Existing routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// New routes
router.get('/users', authMiddleware, authController.getAllUsers);
router.get('/users/:id', authMiddleware, authController.getUserById);

// Get current user route (place it before other user routes)
router.get('/me', authMiddleware, authController.getUser);

router.put('/users/:id', authMiddleware, authController.updateUser);
router.delete('/users/:id', authMiddleware, authController.deleteUser);

module.exports = router;