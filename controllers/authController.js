const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await User.create({
      username,
      email,
      password
    });


    res.status(201).json({
      message: 'User registered successfully',
      user: user
    });
  } catch (error) {
    res.status(400).json({
      message: 'Registration failed',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await user.validatePassword(password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(400).json({
      message: 'Login failed',
      error: error.message
    });
  }
};

exports.logout = async (req, res) => {
  // Note: JWT tokens are stateless, so we can't invalidate them server-side
  // Best practice is to handle logout client-side by removing the token
  res.json({ message: 'Logged out successfully' });
};