const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

async function balanceCommand(message) {
  const user = message.mentions.users.first() || message.author;
  const guildId = message.guild.id;
  let noserverrank = false; // Assume server lb already set up

  const wallet = await db.get(`money.${guildId}.${user.id}`) || 0;
  const bank = await db.get(`bank.${guildId}.${user.id}`) || 0;

  const guildData = await db.get(`money.${guildId}`) || {};
  const entries = Object.entries(guildData)
    // 🔒 filter out invalid / null balances
    .map(([userId, amount]) => [userId, Number(amount) || 0])
    .filter(([, amount]) => amount > 0); // optional: hide zero balances

  if (entries.length === 0) {
    noserverrank = true;
  }

  // Sort by balance descending
  if (!noserverrank) {
    entries.sort((a, b) => b[1] - a[1]);
    const userRank = entries.findIndex(e => e[0] === message.author.id);
    const embed = new MessageEmbed()
      .setColor("#f5c542")
      .setTitle(`${user.username}'s Balance`)
      .addField("💼 Wallet", `**${wallet.toLocaleString()}**`, true)
      .addField("🏦 Bank", `**${bank.toLocaleString()}**`, true)
      .setFooter({ //Shows user's rank
        text: `Your rank: ${
          userRank === -1 ? "N/A" : userRank + 1
        }`
      });

    message.channel.send({ embeds: [embed] });
  }
  else { //There isn't a server rank defined yet so noserverrank = true
    const embed = new MessageEmbed()
      .setColor("#f5c542")
      .setTitle(`${user.username}'s Balance`)
      .addField("💼 Wallet", `**${wallet.toLocaleString()}**`, true)
      .addField("🏦 Bank", `**${bank.toLocaleString()}**`, true);

    message.channel.send({ embeds: [embed] });
  }
  
}

const DAILY_COOLDOWN = 60 * 60 * 1000 * 24; // 24 hours
async function dailyCommand(message) {
  const guildId = message.guild.id;
  const userId = message.author.id;

  const lastDaily = await db.get(`dailyCooldown.${guildId}.${userId}`);
  const now = Date.now();

  const grandyapperId = "1391411359618695288"; //100,000
  const elysianId = "1391411309693632582"; //50,000
  const conqId = "1391411285152759949"; //10,000
  const brabId = "1391411219994247309"; //7,500
  const juggernautId = "1391411179846631475"; //5,000
  const titanId = "1391411147571331184"; //3,000
  const royalId = "1391411102067462214"; //2,000
  const activeId = "1391411052549247166"; // 800
  const regularId = "1391410992654581984"; // 400
  const freqId = "1459644247023026186"; //200
  const memberId = "1375496972827365490"; //For just being a member, last on the list for having bare minimimum or no activity, 100

  //Check if already claimed daily:
  if (lastDaily && now - lastDaily < DAILY_COOLDOWN) {
    const remaining = DAILY_COOLDOWN - (now - lastDaily);
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return message.reply(
      `⏳ You need to wait **${hours} hours and ${minutes} more minutes** before claiming your daily again.`
    );
  }

  if (message.member.roles.cache.has(grandyapperId)){
    const amount = 20000;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#f104b6")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(elysianId)){
    const amount = 10000;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#ddd385")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(conqId)){
    const amount = 7000;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#e67e22")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(brabId)){
    const amount = 4000;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#dd2222")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(juggernautId)){
    const amount = 3000;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#472f2f")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(titanId)){
    const amount = 2000;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#25e2b9")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(royalId)){
    const amount = 1400;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#ffee00")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(activeId)){
    const amount = 800;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#b469c7")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(regularId)){
    const amount = 400;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#4cc0eb")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(freqId)){
    const amount = 200;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  else if (message.member.roles.cache.has(memberId)){
    const amount = 100;
    await db.add(`money.${guildId}.${userId}`, amount);
    await db.set(`dailyCooldown.${guildId}.${userId}`, now);
    let embed = new MessageEmbed()
    .setColor("#35d8bc")
    .setTitle("Daily")
    .setDescription(
      `You earned <:Grand:1459478565442682994> **${amount}** from your daily check-in!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    return message.channel.send({ embeds: [embed] });
  }
  return;
}

async function depositCommand(message, args) {
  const guildId = message.guild.id;
  const userId = message.author.id;
  const wallet = await db.get(`money.${guildId}.${userId}`) || 0;

  if (!args[0]) {
    return message.reply("❌ Specify an amount or `all`.");
  }

  let amount;

  if (args[0].toLowerCase() === "all") {
    amount = wallet;
  } else {
    amount = Number(args[0]);

    // 🚨 HARD NaN BLOCK
    if (!Number.isFinite(amount)) {
      return message.reply(
        "❌ Invalid amount. Use a number like `!gm dep 500` or `!gm dep all`."
      );
    }
  }

  if (amount <= 0) {
    return message.reply("❌ Deposit amount must be greater than 0.");
  }

  if (amount > wallet) {
    return message.reply("❌ You don’t have that much money to deposit.");
  }

  await db.sub(`money.${guildId}.${userId}`, amount);
  await db.add(`bank.${guildId}.${userId}`, amount);

  return message.reply(
    `🏦 Deposited <:Grand:1459478565442682994> **${amount.toLocaleString()}** into your bank.`
  );
}

async function withdrawCommand(message, args) {
  const guildId = message.guild.id;
  const userId = message.author.id;
  const bank = await db.get(`bank.${guildId}.${userId}`) || 0;

  if (bank <= 0) {
    return message.reply("❌ You don’t have any money in the bank.");
  }

  if (!args[0]) {
    return message.reply("❌ Specify an amount or `all`.");
  }

  let amount;

  // Withdraw all
  if (args[0].toLowerCase() === "all") {
    amount = bank;
  } else {
    amount = Number(args[0]);

    // 🚨 HARD NaN BLOCK
    if (!Number.isFinite(amount)) {
      return message.reply(
        "❌ Invalid amount. Use `!gm with 500` or `!gm with all`."
      );
    }
  }

  if (amount <= 0) {
    return message.reply("❌ Withdrawal amount must be greater than 0.");
  }

  if (amount > bank) {
    return message.reply("❌ You don’t have that much money in the bank.");
  }

  await db.sub(`bank.${guildId}.${userId}`, amount);
  await db.add(`money.${guildId}.${userId}`, amount);

  return message.reply(
    `💸 Withdrew <:Grand:1459478565442682994> **${amount.toLocaleString()}** from your bank.`
  );
}

async function addCommand(message, args) {
  const user = message.mentions.users.first();
  const amount = Number(args[1]);

  const guildId = message.guild.id;

  await db.add(`money.${guildId}.${user.id}`, amount);

  return message.channel.send(
    `✅ Added <:Grand:1459478565442682994> **${amount.toLocaleString()}** to **${user.username}**`
  );
}

async function removeCommand(message, args) {
  const user = message.mentions.users.first();
  const amount = Number(args[1]);

  const guildId = message.guild.id;

  await db.sub(`money.${guildId}.${user.id}`, amount);

  return message.channel.send(
    `✅ Removed <:Grand:1459478565442682994> **${amount.toLocaleString()}** to **${user.username}**`
  );
}

async function setCommand(message, args) {
  const user = message.mentions.users.first();
  const amount = Number(args[1]);

  const guildId = message.guild.id;

  await db.set(`money.${guildId}.${user.id}`, amount);

  return message.channel.send(
    `✅ Set the balance of **${user.username}** to <:Grand:1459478565442682994> **${amount.toLocaleString()}**`
  );
}

async function giveCommand(message, args) {
  const user = message.mentions.users.first();
  if (!user) return;

  const amount = Number(args[1]);
  if (!Number.isFinite(amount) || amount <= 0) return message.reply("❌ That is not a valid amount to give.");

  const guildId = message.guild.id;
  const giverId = message.author.id;

  const giverBalance = await db.get(`money.${guildId}.${giverId}`) || 0;

  // Not enough money
  if (giverBalance < amount) {
    return message.reply("❌ You do not have enough money in your wallet to give.");
  }

  // Transfer
  await db.sub(`money.${guildId}.${giverId}`, amount);
  await db.add(`money.${guildId}.${user.id}`, amount);

  return message.channel.send(
    `💸 **${message.author.username}** gave <:Grand:1459478565442682994> **${amount.toLocaleString()}** to **${user.username}**`
  );
}

const ROB_COOLDOWN = 2 * 60 * 60 * 1000; // 2 hours
async function robCommand(message) {
  const robuser = message.mentions.users.first();
  const thief = message.author;
  const guildId = message.guild.id;

  const now = Date.now();
  let robbery = false; //boolean of whether successful or not, assume false

  if (!robuser || robuser.id === thief.id) {
    return message.reply("❌ You must mention someone else to rob.");
  }

  const lastRob = await db.get(`robCooldown.${guildId}.${thief.id}`);
  if (lastRob && now - lastRob < ROB_COOLDOWN) {
    const remaining = ROB_COOLDOWN - (now - lastRob);
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return message.reply(`⏳ You must wait **${hours}h ${minutes}m** before robbing again.`);
  }

  const robbedmoney = await db.get(`money.${guildId}.${robuser.id}`) || 0; // how much money robbed person has in wallet
  if (robbedmoney < 0 || robbedmoney === 0) return message.reply("❌ They do not have any money in their wallet to steal from.");

  let theif_networth = parseInt(await db.get(`money.${guildId}.${thief.id}`));
  let th_n2 = parseInt(await db.get(`bank.${guildId}.${thief.id}`));
  theif_networth = theif_networth + th_n2;
  let rbmoney = parseInt(robbedmoney);
  let pfail = theif_networth/(rbmoney + theif_networth); //probability of failure
  if (pfail < 0.2) pfail = 0.2;
  else if (pfail > 0.8) pfail = 0.8; // the limits

  if (Math.random() < pfail) { //Roverry Unsuccessful
    const fine = Math.floor(Math.random() * (CRIME_MAX - CRIME_MIN + 1)) + CRIME_MIN;
    await db.sub(`money.${guildId}.${thief.id}`, fine);
    await db.set(`robCooldown.${guildId}.${thief.id}`, now);
    return message.reply(`👮 Your robbery failed and you have been fined ${fine.toLocaleString()}`);
}

  const stolen_amount = Math.floor((1 - pfail) * robbedmoney);
  await db.add(`money.${guildId}.${thief.id}`, stolen_amount);
  await db.sub(`money.${guildId}.${robuser.id}`, stolen_amount);
  await db.set(`robCooldown.${guildId}.${thief.id}`, now);
  return message.channel.send(
    `💰 Success! You stole <:Grand:1459478565442682994> **${stolen_amount.toLocaleString()}** from **${robuser.username}**`
  );
}

const BANK_JOIN_WINDOW = 60_000; // 1 minute
const MAX_JOINERS = 5;
const BANKROB_COOLDOWN = 12 * 60 * 60 * 1000; // 12 hours
async function bankrobCommand(message) {
  const robuser = message.mentions.users.first();
  const thief = message.author;
  const guildId = message.guild.id;

  const now = Date.now();
  let robbery = false; //boolean of whether successful or not, assume false

  if (!robuser || robuser.id === thief.id) {
    return message.reply("❌ You must mention someone else to rob.");
  }

  const lastBankRob = await db.get(`bankrobCooldown.${guildId}.${thief.id}`);
  if (lastBankRob && now - lastBankRob < BANKROB_COOLDOWN) {
    const remaining = BANKROB_COOLDOWN - (now - lastBankRob);
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return message.reply(`⏳ You must wait **${hours}h ${minutes}m** before robbing again.`);
  }

  const robbedmoney = await db.get(`bank.${guildId}.${robuser.id}`) || 0;
  if (robbedmoney <= 0) {
    return message.reply("❌ They do not have any money in their bank to steal from.");
  }

  // 🔔 ROBBERY ANNOUNCEMENT EMBED
  const joiners = new Set();
  joiners.add(thief.id);

  const embed = new MessageEmbed()
    .setTitle("🚨 Bank Robbery In Progress!")
    .setColor("RED")
    .setDescription(
      `**${thief.username}** is attempting to rob **${robuser.username}'s** bank!\n\n` +
      `Type **\`!gm bank-join\`** within **1 minute** to assist and improve success chances.`
    )
    .setFooter({ text: "More helpers = higher success rate" });

  await message.channel.send({ embeds: [embed] });

  // ⏱️ WAIT 1 MINUTE FOR JOINERS
  const collector = message.channel.createMessageCollector({
    time: BANK_JOIN_WINDOW
  });

  collector.on("collect", msg => {
    if (
      msg.content.toLowerCase() === "!gm bank-join" &&
      !joiners.has(msg.author.id) &&
      joiners.size < MAX_JOINERS &&
      msg.author.id !== robuser.id 
    ) {
      joiners.add(msg.author.id);
      msg.react("🤝");
    }
    if (msg.author.id === robuser.id ) {
      msg.reply("❌ You can't join a robbery against your own bank.");
    }
  });

  await new Promise(resolve => collector.on("end", resolve));

  // BASE FAILURE PROBABILITY
  let pfail = 0.85;

  // each helper reduces failure chance by 5%, capped
  const helpers = joiners.size - 1;
  pfail = Math.max(0.02, pfail - helpers * 0.05);

  if (Math.random() < pfail) { // Robbery Unsuccessful
    const fine = Math.floor(Math.random() * (CRIME_MAX - CRIME_MIN + 1)) + CRIME_MIN;
    await db.sub(`money.${guildId}.${thief.id}`, fine);
    await db.set(`bankrobCooldown.${guildId}.${thief.id}`, now);
    return message.reply(`👮 Your robbery failed and you have been fined ${fine.toLocaleString()}`);
  }

  const stealPercent = Math.min(0.7, 1 - pfail);
  const stolen_amount = Math.floor(robbedmoney * stealPercent);
  await db.add(`money.${guildId}.${thief.id}`, stolen_amount);
  await db.sub(`money.${guildId}.${robuser.id}`, stolen_amount);
  await db.set(`robCooldown.${guildId}.${thief.id}`, now);

  return message.channel.send(
    `💰 Success! You stole <:Grand:1459478565442682994> **${stolen_amount.toLocaleString()}** from **${robuser.username}**\n` +
    `🤝 Helpers: **${helpers}**`
  );
}


const LB_PAGE_SIZE = 10;
async function leaderboardCommand(message) {
  await message.guild.members.fetch();

  const guildId = message.guild.id;
  const walletData = await db.get(`money.${guildId}`) || {};
  const bankData = await db.get(`bank.${guildId}`) || {};

  // Build net worth entries
  const entries = Object.keys(walletData).map(userId => {
    const wallet = Number(walletData[userId]) || 0;
    const bank = Number(bankData[userId]) || 0;
    return [userId, wallet + bank];
  });

  if (entries.length === 0) {
    return message.channel.send("❌ No economy data for this server yet.");
  }

  // Sort by net worth descending
  entries.sort((a, b) => b[1] - a[1]);

  let page = 0;
  const maxPage = Math.ceil(entries.length / LB_PAGE_SIZE);

  const generateEmbed = (page) => {
    const start = page * LB_PAGE_SIZE;
    const current = entries.slice(start, start + LB_PAGE_SIZE);

    const desc = current.map((entry, index) => {
      const userId = entry[0];
      const netWorth = entry[1];
      const member = message.guild.members.cache.get(userId);
      const name = member ? member.user.username : "Unknown User";


      return `**${start + index + 1}.** ${name} — <:Grand:1459478565442682994> **${netWorth.toLocaleString()}**`;
    }).join("\n");

    const userRank = entries.findIndex(e => e[0] === message.author.id);

    return new MessageEmbed()
      .setTitle("🏆 Grand Mapper Net Worth Leaderboard")
      .setColor("#f5c542")
      .setDescription(desc)
      .setFooter({
        text:
      `Page ${page + 1} / ${maxPage} • Your rank: ${
      userRank === -1 ? "N/A" : userRank + 1
      } • Wallet: !gm lb-cash • Bank: !gm lb-bank`
      });
  };

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("lb_prev")
      .setLabel("Previous Page")
      .setStyle("SECONDARY")
      .setDisabled(true),

    new MessageButton()
      .setCustomId("lb_next")
      .setLabel("Next Page")
      .setStyle("PRIMARY")
      .setDisabled(maxPage <= 1)
  );

  const lbMessage = await message.channel.send({
    embeds: [generateEmbed(page)],
    components: [row]
  });

  const collector = lbMessage.createMessageComponentCollector({ time: 120000 });

  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
      return interaction.reply({
        content: "❌ Only the command user can control this leaderboard.",
        ephemeral: true
      });
    }

    if (interaction.customId === "lb_prev") page--;
    if (interaction.customId === "lb_next") page++;

    page = Math.max(0, Math.min(page, maxPage - 1));

    row.components[0].setDisabled(page === 0);
    row.components[1].setDisabled(page === maxPage - 1);

    await interaction.update({
      embeds: [generateEmbed(page)],
      components: [row]
    });
  });

  collector.on("end", () => {
    row.components.forEach(btn => btn.setDisabled(true));
    lbMessage.edit({ components: [row] });
  });
}

async function bankLeaderboardCommand(message) {
  await message.guild.members.fetch();

  const guildId = message.guild.id;
  const bankData = await db.get(`bank.${guildId}`);

  const entries = Object.entries(bankData)
    .map(([userId, bank]) => [userId, Number(bank) || 0])
    .filter(([, bank]) => bank > 0);

  if (entries.length === 0) {
    return message.channel.send("❌ No bank data for this server yet.");
  }

  entries.sort((a, b) => b[1] - a[1]);

  let page = 0;
  const maxPage = Math.ceil(entries.length / LB_PAGE_SIZE);

  const generateEmbed = (page) => {
    const start = page * LB_PAGE_SIZE;
    const current = entries.slice(start, start + LB_PAGE_SIZE);

    const desc = current.map((entry, index) => {
      const userId = entry[0];
      const bank = entry[1];
      const member = message.guild.members.cache.get(userId);
      const name = member ? member.user.username : "Unknown User";

      return `**${start + index + 1}.** ${name} — 🏦 <:Grand:1459478565442682994> **${bank.toLocaleString()}**`;
    }).join("\n");

    const userRank = entries.findIndex(e => e[0] === message.author.id);

    return new MessageEmbed()
      .setTitle("🏦 Grand Mapper Bank Leaderboard")
      .setColor("#4CAF50")
      .setDescription(desc)
      .setFooter({
        text: `Page ${page + 1} / ${maxPage} • Your rank: ${
          userRank === -1 ? "N/A" : userRank + 1
        }`
      });
  };

  return paginateLeaderboard(message, generateEmbed, maxPage);
}

async function cashLeaderboardCommand(message) {
  await message.guild.members.fetch();
  const guildId = message.guild.id;

  const walletData = await db.get(`money.${guildId}`);

  const entries = Object.entries(walletData)
    .map(([userId, cash]) => [userId, Number(cash) || 0])
    .filter(([, cash]) => cash > 0);

  if (entries.length === 0) {
    return message.channel.send("❌ No wallet data for this server yet.");
  }

  entries.sort((a, b) => b[1] - a[1]);

  let page = 0;
  const maxPage = Math.ceil(entries.length / LB_PAGE_SIZE);

  const generateEmbed = (page) => {
    const start = page * LB_PAGE_SIZE;
    const current = entries.slice(start, start + LB_PAGE_SIZE);

    const desc = current.map((entry, index) => {
      const userId = entry[0];
      const cash = entry[1];
      const member = message.guild.members.cache.get(userId);
      const name = member ? member.user.username : "Unknown User";

      return `**${start + index + 1}.** ${name} — 💼 <:Grand:1459478565442682994> **${cash.toLocaleString()}**`;
    }).join("\n");

    const userRank = entries.findIndex(e => e[0] === message.author.id);

    return new MessageEmbed()
      .setTitle("💼 Grand Mapper Wallet Leaderboard")
      .setColor("#f5c542")
      .setDescription(desc)
      .setFooter({
        text: `Page ${page + 1} / ${maxPage} • Your rank: ${
          userRank === -1 ? "N/A" : userRank + 1
        }`
      });
  };

  return paginateLeaderboard(message, generateEmbed, maxPage);
}

async function paginateLeaderboard(message, generateEmbed, maxPage) {
  let page = 0;

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("lb_prev")
      .setLabel("Previous Page")
      .setStyle("SECONDARY")
      .setDisabled(true),

    new MessageButton()
      .setCustomId("lb_next")
      .setLabel("Next Page")
      .setStyle("PRIMARY")
      .setDisabled(maxPage <= 1)
  );

  const lbMessage = await message.channel.send({
    embeds: [generateEmbed(page)],
    components: [row]
  });

  const collector = lbMessage.createMessageComponentCollector({ time: 120000 });

  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== message.author.id) {
      return interaction.reply({
        content: "❌ Only the command user can control this leaderboard.",
        ephemeral: true
      });
    }

    if (interaction.customId === "lb_prev") page--;
    if (interaction.customId === "lb_next") page++;

    page = Math.max(0, Math.min(page, maxPage - 1));

    row.components[0].setDisabled(page === 0);
    row.components[1].setDisabled(page === maxPage - 1);

    await interaction.update({
      embeds: [generateEmbed(page)],
      components: [row]
    });
  });

  collector.on("end", () => {
    row.components.forEach(btn => btn.setDisabled(true));
    lbMessage.edit({ components: [row] });
  });
}

const WORK_COOLDOWN = 60 * 60 * 1000; // 1 hour
const WORK_MIN = 50;
const WORK_MAX = 300;
const gmjobs = [
  "drew some countryballs for Grand Mapper",
  "notified mods of a raider",
  "submitted an application for Grand Mapper",
  "took screenshots of chat for gm silly",
  "spread GRAND MAPPER PROPAGANDA!!",
  "submitted for a Grand Mapper challenge",
  "read up on Grand Mapper lore",
  "tested new features for GMbot"
];
const job = gmjobs[Math.floor(Math.random() * gmjobs.length)];

async function workCommand(message) {
  const userId = message.author.id;
  const guildId = message.guild.id;

  const lastWorked = await db.get(`workCooldown.${guildId}.${userId}`);
  const now = Date.now();

  if (lastWorked && now - lastWorked < WORK_COOLDOWN) {
    const remaining = WORK_COOLDOWN - (now - lastWorked);
    const minutes = Math.ceil(remaining / 60000);

    return message.reply(
      `⏳ You need to wait **${minutes} more minutes** before working again.`
    );
  }

  const amount = Math.floor(Math.random() * (WORK_MAX - WORK_MIN + 1)) + WORK_MIN;

  await db.add(`money.${guildId}.${userId}`, amount);
  await db.set(`workCooldown.${guildId}.${userId}`, now);

  const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("💼 Work Complete")
    .setDescription(
      `You ${job} and earned <:Grand:1459478565442682994> **${amount}**!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

  message.channel.send({ embeds: [embed] });
}


const CRIME_COOLDOWN = 30 * 60 * 1000; // 30 mins
const CRIME_MIN = 70;
const CRIME_MAX = 1050;
const BADgmcrimes = [ //crimes when not successful
  "weren't nice to Briswall",
  "applied to Grand Mapper but did NOT confirm your application (rookie mistake smh)",
  "went outside and touched grass",
  "went to Brazil",
  "supported M3",
  "did NOT submit for a Grand Mapper challenge",
  "got temp banned by GM mods",
  "violated rule 4"
];
const crimebad = BADgmcrimes[Math.floor(Math.random() * BADgmcrimes.length)];
const GOODgmcrimes = [ //crimes when successful
  "were nice to Briswall",
  "made fun of Pelu",
  "became a GM Discord mod",
  "spammed reactions in the premiere channel",
  "calculated a Grand Mapper statistic",
  "helped Poland get into space",
  "cooked with a Grand Mapper phase quote",
  "won the Grand Mapper draft"
];
const crimegood = GOODgmcrimes[Math.floor(Math.random() * GOODgmcrimes.length)];
async function crimeCommand(message) {
  const userId = message.author.id;
  const guildId = message.guild.id;

  const lastCrime = await db.get(`crimeCooldown.${guildId}.${userId}`);
  const now = Date.now();

  if (lastCrime && now - lastCrime < CRIME_COOLDOWN) {
    const remaining = CRIME_COOLDOWN - (now - lastCrime);
    const minutes = Math.ceil(remaining / 60000);

    return message.reply(
      `⏳ You need to wait **${minutes} more minutes** before committing another crime again.`
    );
  }
  //Check to see if crime successful or not, 40% success rate
  const crimesuccess = Math.random() < 0.4;
  const amount = Math.floor(Math.random() * (CRIME_MAX - CRIME_MIN + 1)) + CRIME_MIN;

  if (crimesuccess) await db.add(`money.${guildId}.${userId}`, amount);
  if (!crimesuccess) await db.sub(`money.${guildId}.${userId}`, amount);
  await db.set(`crimeCooldown.${guildId}.${userId}`, now);

  if (crimesuccess) {
    const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("🥷🏻 Crime Success")
    .setDescription(
      `You ${crimegood} and earned <:Grand:1459478565442682994> **${amount}**!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    message.channel.send({ embeds: [embed] });
  }
  else { //crime NOT a success
    const embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("👮 Crime Failure")
    .setDescription(
      `You ${crimebad} and lost <:Grand:1459478565442682994> **${amount}**!`
    )
    .setFooter({ text: "Grand Mapper Economy" });

    message.channel.send({ embeds: [embed] });
  } 
}

//BLACKJACK
const activeBlackjack = new Set();

async function blackjackCommand(message, args) {
  const guildId = message.guild.id;
  const userId = message.author.id;
  let bet = 0;
  if (args[0] === "all")
    bet = await db.get(`money.${guildId}.${userId}`);
  else bet = parseInt(args[0]);

  if (!bet || bet <= 0) return message.reply("❌ Enter a valid bet.");
  if (activeBlackjack.has(userId)) return message.reply("⛔ You already have an active blackjack game.");

  const balance = await db.get(`money.${guildId}.${userId}`) || 0;
  if (bet > balance) return message.reply("❌ You don't have enough money.");

  activeBlackjack.add(userId);

  const deck = createDeck();
  shuffle(deck);

  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];

  const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("hit").setLabel("Hit").setStyle("PRIMARY"),
    new MessageButton().setCustomId("stand").setLabel("Stand").setStyle("SUCCESS")
  );

  const embed = buildEmbed(playerHand, dealerHand, false, bet, message.author.username);
  const gameMessage = await message.channel.send({ embeds: [embed], components: [row] });

  const collector = gameMessage.createMessageComponentCollector({
    filter: i => i.user.id === userId,
    time: 60000
  });

  collector.on("collect", async interaction => {
    await interaction.deferUpdate();

    if (interaction.customId === "hit") {
      playerHand.push(deck.pop());

      if (handValue(playerHand) > 21) {
        collector.stop("bust");
      } else {
        await gameMessage.edit({
          embeds: [buildEmbed(playerHand, dealerHand, false, bet, message.author.username)],
          components: [row]
        });
      }
    }

    if (interaction.customId === "stand") {
      collector.stop("stand");
    }
  });

  collector.on("end", async (_, reason) => {
    activeBlackjack.delete(userId);

    if (reason === "time") {
      return gameMessage.edit({ content: "⏳ Blackjack timed out.", components: [] });
    }

    while (handValue(dealerHand) < 17) {
      dealerHand.push(deck.pop());
    }

    const playerTotal = handValue(playerHand);
    const dealerTotal = handValue(dealerHand);

    let result;
    if (reason === "bust" || playerTotal > 21) {
      result = "lose";
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
      result = "win";
    } else if (playerTotal === dealerTotal) {
      result = "push";
    } else {
      result = "lose";
    }

    if (result === "win") {
      await db.add(`money.${guildId}.${userId}`, bet);
    } else if (result === "lose") {
      await db.sub(`money.${guildId}.${userId}`, bet);
    }

    await gameMessage.edit({
      embeds: [buildEmbed(playerHand, dealerHand, true, bet, message.author.username, result)],
      components: []
    });
  });
}

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  const deck = [];
  for (const s of suits) {
    for (const v of values) {
      deck.push({ value: v, suit: s });
    }
  }
  return deck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function handValue(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    if (["J","Q","K"].includes(card.value)) total += 10;
    else if (card.value === "A") {
      total += 11;
      aces++;
    } else total += parseInt(card.value);
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function formatHand(hand) {
  return hand.map(c => `\`${c.value}${c.suit}\``).join(" ");
}

function buildEmbed(player, dealer, reveal, bet, username, result) {
  const embed = new MessageEmbed()
    .setTitle("🃏 Blackjack")
    .setColor("#2ecc71")
    .addField("Your Hand", `${formatHand(player)}\n**Total:** ${handValue(player)}`, true);

  if (reveal) {
    embed.addField("Dealer Hand", `${formatHand(dealer)}\n**Total:** ${handValue(dealer)}`, true);
  } else {
    embed.addField("Dealer Hand", `\`${dealer[0].value}${dealer[0].suit}\` ❓`, true);
  }

  if (result) {
    const text =
      result === "win" ? `✅ You won **${bet}**!` :
      result === "lose" ? `❌ You lost **${bet}**.` :
      `➖ Push — no money lost.`;
    embed.addField("Result", text);
  }

  embed.setFooter({ text: `Player: ${username}` });
  return embed;
}

async function rouletteCommand(message, args) {
  const guildId = message.guild.id;
  const userId = message.author.id;
  let bet = 0;
  if (args[0] === "all")
    bet = await db.get(`money.${guildId}.${userId}`);
  else bet = parseInt(args[0]);
  const choice = args[1]?.toLowerCase();

  if (!bet || bet <= 0) return message.reply("❌ Invalid bet amount.");
  if (!choice) return message.reply("❌ Choose a color or number.");

  const wallet = await db.get(`money.${guildId}.${userId}`) || 0;
  if (wallet < bet) return message.reply("❌ You don’t have enough money.");

  // Roulette wheel
  const wheel = Math.floor(Math.random() * 37); // 0–36

  const redNumbers = [
    1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36
  ];
  const isRed = redNumbers.includes(wheel);
  const isBlack = wheel !== 0 && !isRed;

  let win = false;
  let multiplier = 0;
  let color = "";

  // Check win conditions
  if (choice === "red" && isRed) {
    win = true;
    multiplier = 2;
  } else if (choice === "black" && isBlack) {
    win = true;
    multiplier = 2;
  } else if (choice === "green" && wheel === 0) {
    win = true;
    multiplier = 14;
  } else if (!isNaN(choice) && parseInt(choice) === wheel) {
    win = true;
    multiplier = 36;
  }
  if (isRed) color = "red";
  else if (isBlack) color = "black";

  // Resolve bet
  await db.sub(`money.${guildId}.${userId}`, bet);

  if (win) {
    const winnings = bet * multiplier;
    await db.add(`money.${guildId}.${userId}`, winnings);

    return message.channel.send(
      `🎉 **Roulette Win!**\n` +
      `Wheel landed on **${wheel} ${color}**\n` +
      `You won <:Grand:1459478565442682994> **${winnings.toLocaleString()}**`
    );
  } else {
    return message.channel.send(
      `💥 **Roulette Loss**\n` +
      `Wheel landed on **${wheel} ${color}**\n` +
      `You lost <:Grand:1459478565442682994> **${bet.toLocaleString()}**`
    );
  }
}

module.exports = {
  workCommand,
  balanceCommand,
  dailyCommand,
  robCommand,
  bankrobCommand,
  leaderboardCommand,
  bankLeaderboardCommand,
  cashLeaderboardCommand,
  depositCommand,
  withdrawCommand,
  giveCommand,
  addCommand,
  removeCommand,
  crimeCommand,
  blackjackCommand,
  rouletteCommand,
  setCommand
};