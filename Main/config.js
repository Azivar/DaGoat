// config.js
const token = require('./token');

module.exports = {
    token: token.token,
    clientId: '1212363560492077097',
    guildId: '1038480254085373983',
    database: {
        dialect: 'mysql',
        host: 'localhost',        // Replace with your MySQL host
        port: 3306,               // Replace with your MySQL port
        username: 'root',// Replace with your MySQL username
        password: 'Mwr7rz9hctqwSuZx',// Replace with your MySQL password
        database: 'RKTUDatabase' // Replace with your MySQL database name
      },
  };
  