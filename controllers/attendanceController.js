const Attendance = require('../models/attendance');
const User = require('../models/user');

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    // Check if attendance already marked for today
    const existingAttendance = await Attendance.findOne({
      where: {
        user_id: userId,
        day: today
      }
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        error: 'Attendance already marked for today'
      });
    }

    const attendance = await Attendance.create({
      user_id: userId,
      status: req.body.status || 'present',
      day: today,
      check_in_time: new Date().toTimeString().split(' ')[0],
      notes: req.body.notes
    });

    res.status(201).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get user's attendance history
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      where: { user_id: req.user.id },
      order: [['day', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all attendance (admin only)
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      include: [{
        model: User,
        attributes: ['username', 'email']
      }],
      order: [['day', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: 'Attendance record not found'
      });
    }

    await attendance.update({
      status: req.body.status,
      check_out_time: req.body.check_out_time || new Date().toTimeString().split(' ')[0],
      notes: req.body.notes
    });

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};