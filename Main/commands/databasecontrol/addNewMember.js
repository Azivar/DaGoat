// commands/addNewMember.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { DataTypes } = require('sequelize');
const Members = require('../../models/members');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addnewmember')
    .setDescription('Add a new member')
    .addIntegerOption(option => option.setName('discordid').setDescription('Discord ID').setRequired(true)),

  async execute(interaction) {
    const discordId = interaction.options.getInteger('discordid');

    try {
      // Create a new member
      const newMember = await Members.create({
        Discord_ID: discordId,
      });

      await interaction.reply(`Member added successfully with ID ${newMember.id}.`);
    } catch (error) {
      console.error('Error adding member:', error);
      await interaction.reply({ content: 'There was an error adding the member.', ephemeral: true });
    }
  },
};