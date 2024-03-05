// models/members.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Members = sequelize.define('Members', {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Discord_Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  RL_Tracker_Link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  RL_Tracker_Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Salary: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Orientation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  Team_Association: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  NON_Playing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  Discord_ID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FM: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  GM: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  AGM: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  Platform:{
    type: DataTypes.STRING,
    defaultValue: false,
    allowNull: true,
  }
});

// Sync the model with the database (create the table if not exists)
Members.sync();

module.exports = Members;
