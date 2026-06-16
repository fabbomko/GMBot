const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: 'helpcommands',
  description: 'Handles all help commands.',
  
  async execute(message, args) {
    const subCommand = args[0]?.toLowerCase(); // like 'prodhelp' or 'playerhelp'

    if (subCommand === 'prodhelp') {
      let page = 0;
      const embeds = [
      new MessageEmbed()
        .setTitle("⚙️ Production Commands (Page 1/3)")
        .setColor("RANDOM")
        .setDescription("Grand Mapper production commands:")
        .addFields(
          { name: '!gm verify @user', value: 'Verifies @user as a member', inline: false },
          { name: '!gm results', value: 'Get the results of a challenge \n This command only works in comps that have their players registered with the bot', inline: false },
          { name: '!gm locksubmit [on/off]', value: 'Locks players from using the !gm submit command', inline: false },
          { name: '!gm lockvote [on/off]', value: 'Locks players from using the !gm vote command', inline: false }
        )
        .setFooter({ text: "Page 1/3" }),
      
      new MessageEmbed()
      .setTitle("⚙️ Production Commands (Page 2/3)")
      .setColor("RANDOM")
      .setDescription("Admin & banking commands:")
      .addFields(
        { name: '!gm roll', value: 'GM34 COMMAND: Roll a card for a player.', inline: false },
        { name: '!gm risingsun [on/off]', value: 'GM34 COMMAND: Make the sun rise or set.', inline: false },
        { name: '!gm tally', value: 'Get the tally of votes!', inline: false },
        { name: '!gm reset', value: 'Clears the submissions and list of votes!', inline: false }
      )
      .setFooter({ text: "Page 2/3" }),
      
      new MessageEmbed()
        .setTitle("⚙️ Production Commands (Page 3/3)")
        .setColor("RANDOM")
        .setDescription("Grand Mapper production commands:")
        .addFields(
          { name: '!gm elim @user', value: 'Eliminate a player from the Grand Mapper season [NEEDS TO BE UPDATED]', inline: false },
          { name: '!gm register', value: 'Add a new player to the player list! \n (Make sure they have the @GM Competition role AND you say the name the same format as the emoji assigned to them)', inline: false },
          { name: '!gm clear', value: 'CLEAR THE WHOLE LIST OF PLAYERS! This is done at the end of a season. \n (Executive Producers and Hosts only)', inline: false },
          { name: '!gm alarm', value: 'Set up an alarm to reminder producers. The bot will follow up with questions of the time set and the message. \n (Executive Producers and Hosts only)', inline: false }
        )
        .setFooter({ text: "Page 3/3" })
      ];
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("prod_prev")
      .setLabel("⬅ Previous")
      .setStyle("SECONDARY")
      .setDisabled(true),

    new MessageButton()
      .setCustomId("prod_next")
      .setLabel("Next ➡")
      .setStyle("PRIMARY")
  );

  const helpMessage = await message.channel.send({
    embeds: [embeds[page]],
    components: [row]
  });

  const collector = helpMessage.createMessageComponentCollector({
    time: 120000 // 2 minutes
  });

  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
      return interaction.reply({
        content: "❌ Only the command user can control this menu.",
        ephemeral: true
      });
    }

    if (interaction.customId === "prod_next") page++;
    if (interaction.customId === "prod_prev") page--;

    page = Math.max(0, Math.min(page, embeds.length - 1));

    row.components[0].setDisabled(page === 0);
    row.components[1].setDisabled(page === embeds.length - 1);

    await interaction.update({
      embeds: [embeds[page]],
      components: [row]
    });
  });

  collector.on("end", () => {
    row.components.forEach(btn => btn.setDisabled(true));
    helpMessage.edit({ components: [row] });
  });
}

    if (subCommand === 'playerhelp') {
      const embed = new MessageEmbed()
        .setTitle('Player Commands')
        .setDescription('List of player commands:')
        .setColor('RANDOM')
        .addFields(
          { name: '!gm playerhelp', value: 'Shows list of commands for PLAYERS', inline: false },
          { name: '!gm submit', value: 'Submits your PREVIOUS message to the judging channel', inline: false },
          { name: '!gm vote [player]', value: 'Cast a vote for someone at your elimination', inline: false }
        )
        .setFooter('Player Help');

      return message.channel.send({ embeds: [embed] });
    }

  if (subCommand === "econhelp" || subCommand === "econ-help") {
  let page = 0;
  const embeds = [
    new MessageEmbed()
      .setTitle("💰 Economy Commands (Page 1/3)")
      .setColor("RANDOM")
      .setDescription("Basic economy commands:")
      .addFields(
        { name: "!gm econhelp", value: "Shows list of economy commands", inline: false },
        { name: "!gm daily", value: "Collect your daily income (based on activity role)", inline: false },
        { name: "!gm work", value: "Work to earn money", inline: false },
        { name: "!gm crime", value: "Commit a crime for high-risk rewards", inline: false },
        { name: "!gm lb", value: "View the net worth (bank+cash) leaderboard", inline: false },
        { name: "!gm bal @user", value: "View someone's wallet and bank balance. \n If no one is mentioned, it checks your own balance by default.", inline: false },
        { name: "!gm give @user <amount>", value: "Give someone your money", inline: false }
      )
      .setFooter({ text: "Page 1/3" }),

    new MessageEmbed()
      .setTitle("💰 Economy Commands (Page 2/3)")
      .setColor("RANDOM")
      .setDescription("Admin & banking commands:")
      .addFields(
        { name: "!gm add-money @user <amount>", value: "Add money (wallet) to a user (Producers only) \n You can also do !gm add", inline: false },
        { name: "!gm remove-money @user <amount>", value: "Remove money (wallet) from a user (Producers only). \n You can also go !gm remove", inline: false },
        { name: "!gm set-money @user <amount>", value: "Set money (wallet) of a user to that balance (Producers only). \n You can also go !gm set", inline: false },
        { name: "!gm dep (or deposit) <amount>", value: "Deposit money into your bank \n if no amount is given the default is all", inline: false },
        { name: "!gm with (or withdraw) <amount>", value: "Withdraw money from your bank \n if no amount is given the default is all", inline: false },
        { name: "!gm rob @user", value: "Rob someone's wallet balance", inline: false },
        { name: "!gm bank-rob", value: "Rob someone's bank (Riskier but better chance of success the more people join also max you can steal from a bank is 70%)", inline: false },
        { name: "!gm bank-join", value: "Join someone's ONGOING bank robbery", inline: false },
        { name: "!gm lb-cash", value: "View the leaderboard for how much people have in their wallet", inline: false },
        { name: "!gm lb-bank", value: "View the leaderboard for how much people have in their bank", inline: false }
      )
      .setFooter({ text: "Page 2/3" }),
      
      new MessageEmbed()
      .setTitle("💰 Economy Commands (Page 3/3)")
      .setColor("RANDOM")
      .setDescription("Basic economy commands:")
      .addFields(
        { name: "!gm blackjack <amount>", value: "Have a game of blackjack", inline: false },
        { name: "!gm roulette <amount>", value: "Have a game of roulette", inline: false }
      )
      .setFooter({ text: "Page 3/3" }),
  ];

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("econ_prev")
      .setLabel("⬅ Previous")
      .setStyle("SECONDARY")
      .setDisabled(true),

    new MessageButton()
      .setCustomId("econ_next")
      .setLabel("Next ➡")
      .setStyle("PRIMARY")
  );

  const helpMessage = await message.channel.send({
    embeds: [embeds[page]],
    components: [row]
  });

  const collector = helpMessage.createMessageComponentCollector({
    time: 120000 // 2 minutes
  });

  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
      return interaction.reply({
        content: "❌ Only the command user can control this menu.",
        ephemeral: true
      });
    }

    if (interaction.customId === "econ_next") page++;
    if (interaction.customId === "econ_prev") page--;

    page = Math.max(0, Math.min(page, embeds.length - 1));

    row.components[0].setDisabled(page === 0);
    row.components[1].setDisabled(page === embeds.length - 1);

    await interaction.update({
      embeds: [embeds[page]],
      components: [row]
    });
  });

  collector.on("end", () => {
    row.components.forEach(btn => btn.setDisabled(true));
    helpMessage.edit({ components: [row] });
  });
}


    // If no valid subcommand
    return message.channel.send('The help menus are `!gm prodhelp`, `!gm econhelp`, and `!gm playerhelp`!');
  },
};
