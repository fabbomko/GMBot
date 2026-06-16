/*const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest'); // ✅ FIXED: imported from correct package
const { SlashCommandBuilder } = require('@discordjs/builders');

const botID = "1345972822815801416"
const serverID = "1347075302790008832"
const botToken = x or 1984'd by discord

const rest = new REST({ version: "10" }).setToken(botToken);

async function registerSlashCommands() {
	try {
		await rest.put(Routes.applicationGuildCommands(botID, serverID), {
			body: [
				new SlashCommandBuilder()
					.setName("shard")
					.setDescription("Provides information about the user.")
					.addStringOption(option =>
						option
							.setName("amount")
							.setDescription("The amount of shards to give")
							.setRequired(true)
					)
					.toJSON()
			],
		});
		console.log("✅ Slash command registered!");
	} catch (error) {
		console.error("❌ Failed to register command:", error);
	}
};
module.exports = registerSlashCommands;*/