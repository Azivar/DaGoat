// commands/updateMember.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const Members = require('../models/members');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('updatemember')
    .setDescription('Update a field of a member')
    .addStringOption(option => option.setName('username').setDescription('Username of the member').setRequired(true))
    .addStringOption(option => option.setName('field').setDescription('Field to update').setRequired(true))
    .addStringOption(option => option.setName('value').setDescription('New value').setRequired(true)),
  async execute(interaction) {
    const username = interaction.options.getString('username');
    const field = interaction.options.getString('field');
    const value = interaction.options.getString('value');

    try {
      const member = await Members.findOne({
        where: { username: username },
      });

      if (member) {
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
