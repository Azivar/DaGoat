// config.js
const token = require('./token');

module.exports = {
    token: token.token,
    clientId: '1212363560492077097',
    guildId: '1038480254085373983',
    dialect: 'mysql',
    host: 'rktudatabases-do-user-15983434-0.c.db.ondigitalocean.com', // DigitalOcean MySQL host
    port: 25060, // DigitalOcean MySQL port
    username: 'doadmin', // DigitalOcean MySQL username
    password: token.password, // Replace with your DigitalOcean MySQL password
    database: 'defaultdb', // Replace with your DigitalOcean MySQL database name
    ssl: true,
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< This is important to disable rejection of self-signed SSL certificates
      }
    }
  };
  