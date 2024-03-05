// commands/updateMember.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const Members = require('../models/members');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('updatemember')
    .setDescription('Update a field of a member')
    .addStringOption(option => option
      .setName('username')
      .setDescription('Username of the member')
      .setRequired(true))
      .addStringOption(option => option
        .setName('field')
        .setDescription('Field to update')
        .setRequired(true)
        .addChoices(
          { name: 'Users Discord Name', value: 'Discord_Name' },
          { name: 'The Tracker Link', value: 'RL_Tracker_Link' },
          { name: 'Name on the tracker', value: 'RL_Tracker_Name' },
          { name: 'Current salary of player', value: 'Salary' },
          { name: 'Have they done orientation, true or false', value: 'Orientation' },
          { name: 'Team Association', value: 'Team_Association' },
          { name: 'Are they playing, true or false', value: 'NON_Playing' },
          { name: 'Are they FM, true or false', value: 'FM' },
          { name: 'Are they GM, true or false', value: 'GM' },
          { name: 'Are they AGM, true or false', value: 'AGM' },
          { name: 'What platform is the player using?', value: 'Platform' },
        )
      )
    .addStringOption(option => option
      .setName('value')
      .setDescription('New value')
      .setRequired(true)),
  async execute(interaction) {
    const username = interaction.options.getString('username');
    const field = interaction.options.getString('field');
    const value = interaction.options.getString('value');
      // Check if the user has the required role
      const requiredRole = 'Database Manager'; // Replace with the actual role name or ID
      const member = interaction.guild.members.cache.get(interaction.user.id);
    
      if (!member || !member.roles.cache.some(role => role.name === requiredRole)) {
        await interaction.reply('You do not have the required role to use this command.');
        return;
      }


    try {
      // Check if the field is a valid tag
      const allowedTags = ['Discord_Name', 'RL_Tracker_Link', 'RL_Tracker_Name', 'Salary', 'Orientation', 'Team_Association', 
        'NON_Playing', 'FM', 'GM', 'AGM', 'Platform']; // Replace with your allowed tags
      if (!allowedTags.includes(field)) {
        await interaction.reply(`Invalid field. Allowed fields are: ${allowedTags.join(', ')}.`);
        return;
      }

      const member = await Members.findOne({
        where: { username: username },
      });

      if (member) {
        // Check if the member matches the username tag
        if (member.username !== username) {
          await interaction.reply(`Username tag does not match the member.`);
          return;
        }

        // Check if the value matches the datatype for the specified field
        switch (field) {
          case 'Discord_Name':
            // Add your datatype check for Discord_Name
            // Example: Check if it's a string
            if (typeof value !== 'string') {
              await interaction.reply(`Invalid datatype for Discord_Name. Expected a string.`);
              return;
            }
            // Additional specific checks for Discord_Name
            if (!isValidDiscordUsername(value)) {
              await interaction.reply(`Invalid value for Discord_Name.`);
              return;
            }
            break;
          case 'RL_Tracker_Link':
            // Add your datatype check for RL_Tracker_Link
            // Example: Check if it's a string and a valid URL
            if (typeof value !== 'string' || !isValidUrl(value) || !value.startsWith('https://rocketleague.tracker.network/')) {
              await interaction.reply(`Invalid datatype or URL for RL_Tracker_Link. Expected a valid URL starting with 'https://rocketleague.tracker.network/'.`);
              return;
            }
            break;
          case 'Salary':
            // Add your datatype check for Salary
            // Example: Check if it's a number
            if (isNaN(value)) {
              await interaction.reply(`Invalid datatype for Salary. Expected a number.`);
              return;
            }
            // Additional specific checks for Salary if needed
            break;
          case 'NON_Playing':
            // Add your datatype check for NON_Playing
            // Example: Check if it's a boolean
            if (value !== 'true' && value !== 'false') {
              await interaction.reply(`Invalid datatype for NON_Playing. Expected a boolean.`);
              return;
            }
            break;
            case 'FM':
              // Add your datatype check for NON_Playing
              // Example: Check if it's a boolean
              if (value !== 'true' && value !== 'false') {
                await interaction.reply(`Invalid datatype for FM. Expected a boolean.`);
                return;
              }
              break;
              case 'GM':
                // Add your datatype check for NON_Playing
                // Example: Check if it's a boolean
                if (value !== 'true' && value !== 'false') {
                  await interaction.reply(`Invalid datatype for GM. Expected a boolean.`);
                  return;
                }
              break;
              case 'AGM':
                  // Add your datatype check for NON_Playing
                  // Example: Check if it's a boolean
                  if (value !== 'true' && value !== 'false') {
                    await interaction.reply(`Invalid datatype for AGM. Expected a boolean.`);
                    return;
                  }
              break;
              case 'Orientation':
                // Add your datatype check for NON_Playing
                // Example: Check if it's a boolean
                if (value !== 'true' && value !== 'false') {
                  await interaction.reply(`Invalid datatype for Orientation. Expected a boolean.`);
                  return;
                }
              break;
              case 'Platform':
                // Add your datatype check for Discord_Name
                // Example: Check if it's a string
                if (typeof value !== 'string') {
                  await interaction.reply(`Invalid datatype for Platform. Expected a string.`);
                  return;
                }
              break;
              case 'RL_Tracker_Name':
                // Add your datatype check for Discord_Name
                // Example: Check if it's a string
                if (typeof value !== 'string') {
                  await interaction.reply(`Invalid datatype for Platform. Expected a string.`);
                  return;
                }
              break;

                // Need to make the table for teams so we can validate the option


          // Add datatype checks for other fields as needed

          default:
            // No specific datatype check for other fields
            break;
        }

        // Update the specified field
        await member.update({
          [field]: value,
        });

        await interaction.reply(`Updated ${field} for ${username} to ${value}.`);
      } else {
        await interaction.reply(`Member with username ${username} not found.`);
      }
    } catch (error) {
      console.error('Error updating member field:', error);
      await interaction.reply({ content: 'There was an error updating the member field.', ephemeral: true });
    }
  },
};

// Add your own implementation for isValidDiscordUsername and isValidUrl functions
function isValidDiscordUsername(username) {
  // Your implementation to check if it's a valid Discord username
  
  return /^[\w-]{3,32}$/.test(username);;
}

function isValidUrl(url) {
  // Your implementation to check if it's a valid URL
  
  return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);;
}
