// populateDatabase.js
const { Client, GatewayIntentBits } = require('discord.js');
const Members = require('./models/members');
const sequelize = require('./sequelize');
const config = require('./config');

// Replace 'YOUR_GUILD_ID' with your actual guild ID
const GUILD_ID = config.guildId;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    try {
      const guild = await client.guilds.fetch(GUILD_ID);
      const members = await guild.members.fetch();
      
      const promises = [];
  
      members.forEach((member) => {
        promises.push(
          Members.create({
            Discord_ID: member.id,
            username: member.user.username,
            Discord_Name: member.user.tag,
            // Add other properties as needed
          })
        );
      });
    await Promise.all(promises);

    console.log('All members added to the database');
  } catch (error) {
    console.error('Error fetching guild or members:', error);
  } finally {
    await sequelize.close(); // Close the database connection after all members are added
    console.log('Database population completed. Connection closed.');
    process.exit(); // Exit the script
  }
});

client.login(config.token);
