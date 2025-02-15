const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const taskRoutes = require('./routes/tasks');
const attendanceRoutes = require('./routes/attendance');

const app = express();

// Allow all origins CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/tasks', taskRoutes);

// Add the new route
app.use('/api/attendance', attendanceRoutes);

// Database sync and server start
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database sync failed:', err);
  });