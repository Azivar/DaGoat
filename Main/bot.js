// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const sequelize = require('./sequelize');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('./config');
const Members = require('./models/members');
const { assignRoleToNewMember } = require('./roleControl/roleAssign'); // Adjust the path accordingly

const commands = [
  require('./commands/updateMember'),
  require('./commands/addNewMember'),
];

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    // ... Add other intents as needed
  ],
});

// Register commands with Discord API
const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands.map(command => command.data.toJSON()) },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const handleNewMember = async (member) => {
    console.log('Handling new member event...');
    try {
      console.log('New member joined:', member.user.tag);
  
      // Use the Sequelize instance for database operations
      await sequelize.sync(); // Ensure tables are created (if they don't exist)
  
      // Get the guild object
      const guild = member.guild;
  
      // Get the system channel ID
      const systemChannelId = guild.systemChannelId;
  
      console.log(`New member joined in system channel with ID: ${systemChannelId}`);
  
      // You can perform additional logic here if needed
      // For example, you can directly add the new member to the database here
  
      // Add new member to the database (example)
      await Members.create({
        Discord_ID: member.id,
        username: member.user.username,
        Discord_Name: member.user.tag,
        // Add other properties as needed
      });
  
      console.log('Member added to the database successfully.');
      assignRoleToNewMember(member);
  
      // You can add more logic here based on the system channel or member details
    } catch (error) {
      console.error('Error handling new member:', error);
    }
  };
  
  client.on('guildMemberAdd', handleNewMember);

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for when a slash command is executed
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    const command = commands.find(cmd => cmd.data.name === commandName);
    if (command) {
      await command.execute(interaction);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
  }
});

// Log in to Discord with your app's token
client.login(config.token);
