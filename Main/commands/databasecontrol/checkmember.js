const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Members = require('../../models/members');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkmember') // Replace underscores with hyphens or remove them
    .setDescription('Check a Member\'s Data')
    .addStringOption(option => option.setName('discord_name').setDescription('Discord Name').setRequired(true)),

  async execute(interaction) {
    try {
      const discordName = interaction.options.getString('discord_name');

      const memberData = await Members.findOne({ where: { Discord_Name: discordName } });

      if (!memberData) {
        await interaction.reply({ content: `No data found for member with Discord Name ${discordName}.`, ephemeral: true });
        return;
      }

      const embed = new EmbedBuilder()

        .setColor(0x0099FF)
	    .setTitle(`Data for Member with Discord Name ${discordName}`)
	    .setDescription('Information from database')
        .setTimestamp()
        .addFields(
		{ name: 'Username', value: String(memberData.dataValues.username) },
        { name: 'Discord ID', value: String(memberData.dataValues.Discord_ID) },
        { name: 'Discord Name', value: String(memberData.dataValues.Discord_Name) },
        { name: 'RL Tracker Link', value: String(memberData.dataValues.RL_Tracker_Link) },
        { name: 'RL Tracker Name', value: String(memberData.dataValues.RL_Tracker_Name) },
        { name: 'Salary', value: String(memberData.dataValues.Salary) },
        { name: 'Orentation Done', value: String(memberData.dataValues.Orientatation) },
        { name: 'Players Team', value: String(memberData.dataValues.Team_Association) },
        { name: 'Non Playing', value: String(memberData.dataValues.NON_Playing) },
        { name: 'Is FM', value: String(memberData.dataValues.FM) },
        { name: 'Is GM', value: String(memberData.dataValues.GM) },
        { name: 'Is AGM', value: String(memberData.dataValues.AGM) },
        { name: 'Platform', value: String(memberData.dataValues.Platform) },
	    );
	   

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
    }
  },
};
