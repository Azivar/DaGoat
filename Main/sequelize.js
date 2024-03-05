const { Sequelize } = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'test';
const configPath = path.join(__dirname, 'config', 'config.json');
const config = require(configPath)[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  logging: console.log, // Enable logging to console
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;