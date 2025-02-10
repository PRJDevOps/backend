const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  task: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('TODO', 'IN PROGRESS', 'DONE', 'Canceled', 'Backlog'),
    defaultValue: 'TODO'
  },
  priority: {
    type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
    defaultValue: 'MEDIUM'
  },
  team: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async (task) => {
      const lastTask = await Task.findOne({
        order: [['createdAt', 'DESC']]
      });

      const lastNumber = lastTask 
        ? parseInt(lastTask.id.split('-')[1]) 
        : 0;

      task.id = `TASK-${lastNumber + 1}`;
    }
  }
});

module.exports = Task;