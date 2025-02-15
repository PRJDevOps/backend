const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, attendanceController.markAttendance);
router.get('/my', authMiddleware, attendanceController.getMyAttendance);
router.get('/', authMiddleware, attendanceController.getAllAttendance);
router.put('/:id', authMiddleware, attendanceController.updateAttendance);

module.exports = router;