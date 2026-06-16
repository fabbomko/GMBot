const competitionInfo = require("./competitionInfo.json");
const Submission = require("./Submission.js");
const Competition = require("./Competition.js");
const { MessageEmbed } = require("discord.js");
const centralLogChannelId = "1378457150556471450";
let centralLogChannel;
const prefix = "!gm";
let competitions = new Map();
const fs = require('fs');
let settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8')); //GM34
let locksubmitGM = settings.locksubmit; //boolean variable to lock submit in GM34 main server oog
let lockvote = settings.lockvote; //boolean variable to lock voting
const GMphasechannelID = '1502417722418401341'; //GM34 thing
const REACTIONS = [
  "0️⃣",
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟",
];
const ZERO_WIDTH_DIGITS = [
  "\u200B", // 0
  "\u200C", // 1
  "\u200D", // 2
  "\uFEFF", // 3
  "\u2060", // 4
  "\u2061", // 5
  "\u2062", // 6
  "\u2063", // 7
  "\u2064", // 8
  "\u180E", // 9
];
// SIMPLY FOR GM ONLY!
let confessional_ids = [
  "1365054415567847566", //American
  "1365054536942882816", //Briswall
  "1365054723727818782", //Evelyn --
  "1365054580626554930", //Nova
  "1365054630563676364", //Olympus
  "1365054663459602522", //Sund
  "1365054814911860767", //Axio
  "1365054869047742575", //EoEM
  "1365054911867257035", //Hanshin
  "1365055009779351684", //Luxilla
  "1365055048442449980", //Pelu
  "1365055080856031312", //Snyzyy
  "1365055325824352396", //Corcilya
  "1365055424692228136", //Milk
  "1365055361807159307", //Mojave --
  "1365055472641511475", // Mortum
  "1365055508637286561", //Slaya
  "1365055744315232256", //True Albanian
  "1365055824317382666", //Blitzantia
  "1365055880424325240", //Clyxill    //20
  "1365055923927646229", //Empirus
  "1365058357748301844", //Fiji
  "1365058426039832676", //Gennarovic
  "1365058469757063278", //Moldoven
  "1365058809751666832", //Azalea
  "1365058853179494422", //Belakraine
  "1365058893809582120", //Corn
  "1365058927007502408", //Duck
  "1365058971647610940", //Florida
  "1365059002672877578", //Interflux
  "1365059046952145006", //Polnoc
];
async function initializeComps(client) {
  // Calls !gm recover to all guilds in the competitionInfo.json file.
  //If judging channel has no 'END' message, it will send a message and not recover. leaving the comp as blank.
  centralGuild = await client.guilds.fetch("1347075302790008832"); //GM Bot Test Server
  centralLogChannel = await centralGuild.channels.fetch(centralLogChannelId);
  let compNum = 0;
  let recoveredNum = 0;
  for (const serverID in competitionInfo) {
    let currGuild;
    let compInfo = competitionInfo[serverID];
    // Is the bot inside the guild, or does the guild exist?
    try {
      currGuild = await client.guilds.fetch(serverID); // Throw error if guild not found.
    } catch (err) {
      centralLogChannel.send(
        `❌ Error initializing competition **${compInfo["name"]}**. GM Bot is not in that server!`
      );
      continue;
    }

    let comp = new Competition(
      (guildID = serverID),
      (adminRoleID = compInfo.adminRoleID),
      (playerRoleID = compInfo.playerRoleID),
      (judgeChannelID = compInfo.judgeChannelID)
    );
    comp.judgeChannel = await currGuild.channels.fetch(judgeChannelID);
    console.log("Judge channel: ", comp.judgeChannel.name);

    recoveredNum = await comp.getSubmissions(currGuild, (delimiter = "END")); //Recover submissions if possible.
    if (recoveredNum === 0) {
      centralLogChannel.send(
        `\n-\n-\n-\n❌ ${recoveredNum} Submissions recovered: **${compInfo.name}** (Please have 'END' after the challenge is done.)`
      ); //Still make the comp, submissions will be empty.
    } else {
      centralLogChannel.send(
        `\n-\n-\n-\n✅ ${recoveredNum} Submissions recovered: **${compInfo.name}**`
      );
    }
    competitions.set(guildID, comp);
    if (!comp) {
      centralLogChannel.send(
        `❌Competition NOT initialized: **${compInfo.name}.**\n`
      );
    } else {
      centralLogChannel.send(
        `✅ Competition initialized: **${compInfo.name}.**\n`
      );
      compNum += 1;
    }
  }
  console.log(`${compNum} Competitions initialized.`);
}

//GMBot Test Server

// Set up both Discord.js and Google Sheets Servers.
module.exports = {
  initializeComps,
  setupClient(client) {
    client.on("messageCreate", messageHandler),
      client.on("messageReactionAdd", reactionAddHandler),
      client.on("messageReactionRemove", reactionRemoveHandler);
  },
};
async function messageHandler(message) {
  if (message.author.bot) {
    return;
  }
  //Get comp instance.
  const Comp = competitions.get(message.guild.id);
  const guild = message.guild;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  
  if (message.content.toLowerCase().startsWith("!gm locksubmit on")) { //Locking submissions
      if (message.member.roles.cache.has(Comp.adminRoleID)) { // Check if person saying it is prod
          if (message.guild.id === '1375496972705988628') {
            locksubmitGM = true;
            let channel = message.client.channels.cache.get('1391418940223393903');
            channel.send('Locksubmit in GRAND MAPPER 34 THE BEST SERVER EVERR is ON! 🔒');
            settings.locksubmit = true;
            fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2)); // add this
            message.reply("**✅ Submissions are locked in this server.**");
          } //GM34 server 
          else 
            message.reply("❌ Locksubmit is not configured for this server.");
      }
	    else { //person saying it is NOT prod
        message.reply("**❌ You can't do that. You do not have the producer or admin role.**");
      }
      return;
  }

  if (message.content.toLowerCase().startsWith("!gm lockvote on")) { //Locking votes
      const GMprodroleId = "1375496972882153473";
      if (message.member.roles.cache.has(GMprodroleId)) { // Check if person saying it is prod
          lockvote = true;
          settings.lockvote = true;
          fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));
          let channel = message.client.channels.cache.get('1391418940223393903');
          channel.send('LockVOTE is ON! 🔒');
          message.reply("**✅ Voting is locked.**");
      }
	    else { //person saying it is NOT prod
        message.reply("**❌ You can't do that. You do not have the producer or admin role in the main server.**");
      }
      return;
  }

  if (message.content.toLowerCase().startsWith("!gm addmeme")) {
    if (message.member.roles.cache.has(Comp.adminRoleID)) {
        const input = message.content.trim().split(" ").slice(2).join(" ");
        if (!input || input.trim() === "") {
            await message.reply("❌ Please provide a link. Run the command as `!gm addmeme (comment) <link>`. The caption/comment is completely optional.");
            return;
        }
        const memes = JSON.parse(fs.readFileSync('./memes.json'));
        memes.push(input);
        fs.writeFileSync('./memes.json', JSON.stringify(memes, null, 2));
        message.reply(`✅ Meme added!`);
    } else {
        message.reply("**❌ You can't do that. You do not have the producer or admin role.**");
    }
}
    
 if (message.content.toLowerCase().startsWith("!gm addsilly")) {
    if (message.member.roles.cache.has(Comp.adminRoleID)) {
        const input = message.content.trim().split(" ").slice(2).join(" ");
        if (!input || input.trim() === "") {
            await message.reply("❌ Please provide a link. Run the command as `!gm addsilly (comment) <link>`. The caption/comment is completely optional.");
            return;
        }
        const silly = JSON.parse(fs.readFileSync('./silly.json'));
        silly.push(input);
        fs.writeFileSync('./silly.json', JSON.stringify(silly, null, 2));
        message.reply(`✅ GM silly added!`);
    } else {
        message.reply("**❌ You can't do that. You do not have the producer or admin role.**");
    }
}
  
  if (message.content.toLowerCase().startsWith("!gm locksubmit off")) { //UNlocking submissions
      if (message.member.roles.cache.has(Comp.adminRoleID)) { // Check if person saying it is prod
          if (message.guild.id === '1375496972705988628') {
            locksubmitGM = false;
            settings.locksubmit = false;
            fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2)); 
            let channel = message.client.channels.cache.get('1391418940223393903');
            channel.send('Locksubmit in GRAND MAPPER 34 THE BEST SERVER EVERR is OFF! 🔓');
            message.reply("**✅ Submissions are now UNlocked in this server.**");
          } //GM34 server 
          else 
            message.reply("❌ Locksubmit is not configured for this server.");
      }
	    else 
        return message.reply("**❌ You can't do that. You do not have the producer or admin role.**");
  }

  if (message.content.toLowerCase().startsWith("!gm lockvote off")) {
    const GMprodroleId = "1375496972882153473"; // Ensure this matches your producer role ID
    if (message.member.roles.cache.has(GMprodroleId)) {
        if (message.length > 16){ //there is an additional optionol paramater
          const argunion = message.slice(16).trim();
          const userResponse = argunion;
              // Save the response to the SETTINGS object and FILE
            settings.unionufe = userResponse; 
            lockvote = false;
            settings.lockvote = false;
            fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));
            let logchannel = message.client.channels.cache.get('1391418940223393903');
            logchannel.send(`LockVOTE is OFF! 🔓 \n**Current Union UFE:** ${userResponse}`);
            message.reply("MAKE SURE TO DO `!gm reset` TO CLEAR THE VOTES FROM THE PREVIOUS ELIMINATION IF YOU HAVEN'T ALREADY BEFORE ANY PLAYERS VOTE!! \n Also, to make multiple unions able to vote (but not necessarily all of them) separate them by a space or something like `Union A, Union B`.\n If you want to make everyone able to vote for someone in their respective unions say `all`.\nIf you mistype the union just run this command again and the bot will update it.");
            return message.reply(`**✅ Voting is UNlocked.** Union set to: **${userResponse}**`);
        }
        else { //no union specified when calling it, just !gm lockvote off
          await message.reply("What is the union up for elimination now?\nThis style is used to restrict gm voting when it opens up after results are calculated.\nTo make multiple unions able to vote (but not necessarily all of them) separate them by a space or something like `Union A, Union B`.\n If you want to make everyone able to vote for someone in their respective unions say `all`.\nIf you mistype the union just run this command again and the bot will update it.");
        
          const filter = (m) => m.author.id === message.author.id;
          try {
            const collected = await message.channel.awaitMessages({ 
                filter, 
                max: 1, 
                time: 30000, 
                errors: ['time'] 
            });
            
            const userResponse = collected.first().content;
              // Save the response to the SETTINGS object and FILE
              settings.unionufe = userResponse; 
              fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));

            lockvote = false;
            let logchannel = message.client.channels.cache.get('1391418940223393903');
            logchannel.send(`LockVOTE is OFF! 🔓 \n**Current Union UFE:** ${userResponse}`);
            message.reply("MAKE SURE TO DO `!gm reset` TO CLEAR THE VOTES FROM THE PREVIOUS ELIMINATION IF YOU HAVEN'T ALREADY BEFORE ANY PLAYERS VOTE!!");
            return message.reply(`**✅ Voting is UNlocked.** Union set to: **${userResponse}**`);

        } catch (error) {
            return message.reply("❌ You didn't respond in time. Command cancelled.");
        }
        }
        
    } else {
        return message.reply("❌ You don't have permission to do that because you are not a Producer.");
    }
}

  //gm vote tally - GM34
  if (message.content.toLowerCase() === "!gm tally") {
  const GMprodroleId = "1375496972882153473"; 
  if (!message.member.roles.cache.has(GMprodroleId)) {
    return message.reply("❌ You are not a Grand Mapper producer IN THE MAIN SERVER and cannot run this command!");
  }

  const voteEntries = Object.entries(settings.votes);
  if (voteEntries.length === 0) {
    return message.reply("No votes have been cast yet.");
  }

  const guildData = competitionInfo[message.guild.id];
  let tallyMessage = "**📊 Current Vote Tally:**\n";

  for (const [voterId, targetName] of voteEntries) {
    const voterName = guildData[voterId] || "Unknown Player";
    tallyMessage += `• **${voterName}** voted for **${targetName}**\n`;
  }

  message.reply(tallyMessage);
  message.channel.send("⚠️ MAKE SURE TO RESET THE VOTE TALLY AFTER EVERY ELIMINATION WITH `!gm reset`!!!");
}

  //gmvoting command - GM34
// gmvoting command - GM34
if (!lockvote) {
  if (message.content.toLowerCase().startsWith("!gm vote")) {
    if (message.content.toLowerCase().startsWith("!gm votetally")) return message.reply("❌ This is not a valid command.");
    
    if (message.guild.id !== "1375496972705988628") { 
      return message.reply("❌ This command is only for the main server.");
    }

    const guildData = competitionInfo[message.guild.id];
    const registeredName = guildData[message.author.id] || message.author.username;

    if (!message.member.roles.cache.has(Comp.playerRoleID)) {
      return message.reply("❌ You are NOT a Player!");
    }

    const votedName = message.content.slice("!gm vote".length).trim();
    if (!votedName) {
      return message.reply("❌ Usage: `!gm vote [playername]`");
    }

// --- NEW: ROBUST UNION RESTRICTION LOGIC ---

// 1. Force fetch the member to ensure the cache is up to date
const member = await message.guild.members.fetch(message.author.id);

// 2. Find the Union role. 
// This regex checks for the word "union" anywhere in the name, case-insensitive.
const voterUnionRole = member.roles.cache.find(r => 
  /\bunion\b/i.test(r.name) && r.id !== Comp.playerRoleID
);

if (!voterUnionRole) {
  // Debugging: let's see what roles the bot actually sees
  console.log(`Roles seen for ${message.author.username}:`, member.roles.cache.map(r => r.name));
  return message.reply("❌ I couldn't find a 'Union' role on your profile. Please make sure your team role has the word 'Union' in it.");
}

// 3. Find the target player's ID from your competitionInfo
let targetId = null;
const searchName = votedName.toLowerCase();

for (const [id, name] of Object.entries(guildData)) {
  if (typeof name === 'string' && name.toLowerCase() === searchName) {
    targetId = id;
    break;
  }
}

if (!targetId) {
  return message.reply(`❌ **${votedName}** is not a registered player in the config.\nHint: If you can't find the player you want to vote, make sure your vote for their name is formatted the same as their emoji.`);
}

// 4. Check if the target is in the SAME union 
const targetMember = await message.guild.members.fetch(targetId).catch(() => null);

if (!targetMember || !targetMember.roles.cache.has(voterUnionRole.id)) {
  const teamName = voterUnionRole.name;
  return message.reply(`❌ You can only vote for players currently in the **${teamName}**!`);
}
// --- END UNION RESTRICTION ---

//Check if person saying it is IN THE UNION UFE
const membervoting = message.member;
let hasRole = membervoting.roles.cache.some(role => 
    settings.unionufe.toLowerCase().includes(role.name.toLowerCase())
);
let hasRole2 = membervoting.roles.cache.some(role => 
    role.name.toLowerCase().includes(settings.unionufe.toLowerCase())
); //trying other method to check if has role
if (settings.unionufe.toLowerCase() === "all") hasRole = true; //that person can vote cuz all is enabled
console.log("the person's voting hasrole value is: "+hasRole);
if (!hasRole && !hasRole2) {
    return message.reply(`❌ You are not in the **${settings.unionufe}** Union, which is the only one voting this round!`);
}

if (votedName.toLowerCase() === registeredName.toLowerCase()) {
  return message.reply("❌ You can't vote for yourself.");
}
  // Success: Register the vote
    settings.votes[message.author.id] = votedName;
    fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));

    message.reply(`✅ Vote for **${votedName}** (Union: ${voterUnionRole.name}) registered.`);
  }
}
else if (message.content.toLowerCase().startsWith("!gm vote")) //lockvote is TRUE so votes locked
  return message.reply("**❌ Sorry, voting in Grand Mapper is currently locked. Get a producer to unlock it for you.**");

if (message.content.toLowerCase().startsWith("!gm submit")) { //gm submit area
  if ((message.guild.id === "1375496972705988628" && !locksubmitGM)) {
    if (message.member.roles.cache.has(Comp.playerRoleID)) {
      const targetChannel = Comp.judgeChannel;
      if (!targetChannel || !targetChannel.isText()) {
        return message.reply("Could not find the target channel.");
      }

      const guildData = competitionInfo[message.guild.id]; //GM34 
      const registeredName = guildData[message.author.id] || message.author.username; //GM34

      try {
        // Fetch last 10 messages from the  channel
        const messages = await message.channel.messages.fetch({ limit: 10 });

        // Find the last message from the same user before this command
        const previousMessage = messages
          .filter(
            (msg) =>
              msg.author.id === message.author.id && msg.id !== message.id
          )
          .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
          .first();

        if (!previousMessage) {
          return message.reply(
            "I couldn't find your previous message to submit."
          );
        }

        let userId = message.author.id;
        console.log(`Author: ${userId} submitted the most recent submission.`);
        let invisibleText = encodeHiddenCharacter(userId);

        message.reply("Wait for your submission to finish processing in the judging channel. This will take about 5 seconds."); //new text

        // Forward text content if any
        await targetChannel.send("\n--\n");
        if (previousMessage.content.trim().length > 0) {
          await targetChannel.send(
            `A player submitted:\t${invisibleText}\t\n${previousMessage.content}`
          );
        }

        // Forward attachments if any
        for (const attachment of previousMessage.attachments.values()) {
          sentMsg = await targetChannel.send({
            content: `-\t${invisibleText}\t-`,
            files: [attachment],
          });
        }

        //FEEDBACK to player to let them know what they submitted
        message.reply("Just so you know, this is what you submitted in the judging channel: ");
        if (previousMessage.content.trim().length > 0) {
          await message.channel.send(
            `\t${invisibleText}\t\n${previousMessage.content}`
          );
        }
        for (const attachment of previousMessage.attachments.values()) {
          sentMsg = await message.channel.send({
            content: `-\t${invisibleText}\t-`,
            files: [attachment],
          });
        }

        // Find previous message in judging, react, create new Submission and add it to array.
        // Check if the person submitting has an existing messageId, If so
        // Delete the old messageId, Update to the new messageId
        let resub = await Comp.judgeSubmission(targetChannel, userId);
        if (resub) {
          message.reply("✅ **You have resubmitted a new Submission!**");
        }
        else
        message.reply("✅ **Submission has been made to the judging channel**");
      } catch (err) {
        console.error("Error processing !gm submit:", err);
        if (err.code === 50035 && err.message.includes("Must be 2000 or fewer in length")) 
    		await message.reply("❌ You sent a message that is over 2000 characters. Make your submission shorter or send it as a link to a google Doc");
        else message.reply(
          "Something went wrong when trying to submit your last message."
        );
      }
    } else {
      message.reply(
        "**You do not have permission to submit a challenge.** Please make sure you have the player role."
      );
    }
  } 
  else //locksubmit is TRUE so submisisons locked in the respective server
    return message.reply("**❌ Sorry, submissions for this server in the grand mapper season are currently locked. Get a producer in this server to unlock them for you.**");
  }
   if (message.content.startsWith("!gm recover")) {
    if (message.member.roles.cache.has(Comp.adminRoleID)) {
      let recoveredNum = await Comp.getSubmissions(guild, (delimiter = "END"));
      let response =
        recoveredNum > 0
          ? `✅ **${recoveredNum} Submissions recovered.**`
          : `❌ **No submissions recovered.** Please make sure you have an 'END' message at the end of the challenge.`;
      message.reply(response);
      centralLogChannel.send(
        `\n-\n-\n-\n${response} **${competitionInfo[Comp.guildID].name}**`
      );
    } else {
      message.reply("**You do not have permission to recover submissions.**");
    }
  }
  //list is for general purposes. Not on startup.
  else if (message.content.startsWith("!gm results")) {
    if (message.member.roles.cache.has(Comp.adminRoleID)) {
      if (Comp.submissions.length === 0) {
        message.reply("**There are currently no submissions.**");
        return;
      }

      try {
        const emojiToString = guild.emojis.cache.map((emoji) =>
          emoji.toString()
        );
        const emojiNameRoles = guild.emojis.cache.map((emoji) => emoji.name);

        const teamNames = await waitForReply(
          message,
          '**What are the teams?** Reply with names *(without the "Union")* seperated by spaces.',
          30000
        );
        let round = await waitForReply(message, "**What round is it?**", 30000);

        round = getOrdinalNumeral(round);
        let teams = new Array();
        let unionScores = new Array();
        let teamEmojis = new Array();
        let numTeams = teamNames.length; //>= 2 makes it a teams challenge. Find highest scoring UNION
        console.log(`num of teams: ${numTeams}`);
        // Get the team emojis.
        // Loop over all players in the current comp
        serverInfo = competitionInfo[Comp.guildID];
        for (currTeam of teamNames) {
          tempSubs = new Array();

          for (const id in serverInfo) {
            if (id === "name") continue;
            if (id === "guildID") continue; //Skip guildID
            if (id === "adminRoleID") continue;
            if (id === "playerRoleID") continue;
            if (id === "judgeChannelID") continue;

            const member = await message.guild.members
              .fetch(id)
              .catch(() => null); // handle a fetch reject to return null
            if (!member) {
              console.log(
                `Member with ID ${id} not found in the server. Skipping...`
              );
              continue;
            }

            let submission = Comp.submissions.find(function (sub) {
              if (sub.playerId === member.id) {
                return sub;
              }
            });

            if (!submission) {
              submission = new Submission(
                (associatedMessage = null),
                (playerId = member.id),
                (index = -1)
              );
            }

            const roleNames = member.roles.cache.map((role) => role.name); // Find their role names

            for (const role of roleNames) {
              // Loop over player roles to see if they are in the current team to look at
              if (role.toLowerCase().includes(currTeam.toLowerCase())) {
                console.log(`Player ${serverInfo[id]} is in team ${currTeam}`);
                tempSubs.push(submission);
              }
            }
          }
          teams.push({ name: currTeam, submissions: tempSubs });
        }

        for (currTeam of teamNames) {
          for (let i = 0; i < emojiNameRoles.length; i++) {
              console.log(`Checking if ${emojiNameRoles[i]} includes ${currTeam}`)
            if (
              emojiNameRoles[i]
                .toLowerCase()
                .trim()
                .includes(currTeam.toLowerCase().trim())
            ) {
               console.log(`Found emoji for ${currTeam}`)
              teamEmojis.push({ team: currTeam, emojiId: emojiToString[i] });
            }
          }
        }
        console.log(teamEmojis);

        // Iterate over the playerIDS/playerNames.
        if (numTeams > 1) {
          str = `# __RESULTS OF YOUR ${round.toUpperCase()} IMMUNITY CHALLENGE__\n`;
        } else {
          str = `# __RESULTS OF YOUR ${round.toUpperCase()} INDIVIDUAL IMMUNITY CHALLENGE__\n`;
        }

        for (const team of teams) {
          let teamEmojiId = teamEmojis.find(
            (item) =>
              item.team.toLowerCase().trim().includes(team.name.toLowerCase().trim())
          );
          if (!teamEmojiId) {
            console.log(`No emoji found for team: ${team.name}`);
            continue; //Skip if no matching emoji found
          }
          teamEmojiId = teamEmojiId.emojiId;
          team.submissions = sortSubmissions(team.submissions);

          str += `\n__**${teamEmojiId}${team.name} Union${teamEmojiId}**__\n`;

          let subCount = team.submissions.length;
          let totalScore = 0;
          let emojisDNS = new Array();
          let namesDNS = new Array();
          let placement = 1;

          for (let i = 0; i < team.submissions.length; i++) {
            let submission = team.submissions[i];
            let playerInfo;
            playerInfo = await Comp.findPlayerInfo(
              submission.playerId,
              message.guild
            );

            if (!playerInfo.name || !playerInfo.emoji) {
              playerInfo = { name: submission.playerId, emoji: "" };
              console.log("Couldn't find the player");
            }

            if (isNaN(submission.getAverage())) {
              emojisDNS.push(playerInfo.emoji);
              namesDNS.push(playerInfo.name);
              continue; //If NaN average, don't include it normally.
            }

            const ordinal = getOrdinalNumeral(placement);
            str += `**${ordinal}.** ${playerInfo.emoji} ${
              playerInfo.name
            }: ${submission.getAverage().toFixed(2)}\n`;
            totalScore += submission.getAverage();

            placement += 1;
          }
          if (namesDNS.length !== 0) {
            str += `**${getOrdinalNumeral(placement)}.** ${emojisDNS.join(
              ""
            )} ${namesDNS.join(", ")}: 0.00 / Did Not Submit\n`;
          }

          if (numTeams >= 2) {
            str += `Union Average: __${(totalScore / subCount).toFixed(2)}\n__`;
            unionScores.push({
              team: team.name,
              average: totalScore / subCount,
            });
          }
        }

        if (numTeams >= 2) {
          let immuneUnion = unionScores[0];

          for (unionObj of unionScores) {
            if (unionObj.average > immuneUnion.average) {
              immuneUnion = unionObj;
            }
          }
          //let teamEmojiId = teamEmojis.find(item => item.team.toLowerCase() === team.name.toLowerCase())

          str += `\n**${
            immuneUnion.team
          }** wins immunity! This means that teams X, Y, Z will be heading to elimination where someone will be the Xth person
    voted out of **${competitionInfo[Comp.guildID].name}**`;
        } else {
          let topScorer = await Comp.findPlayerInfo(
            teams[0].submissions[0].playerId,
            message.guild
          );
          str += `\n**${topScorer.emoji}${
            topScorer.name
          }** wins immunity! The rest of you will be heading to elimination where someone will be the Xth person voted out of **${
            competitionInfo[Comp.guildID].name
          }**`;
        }
         if(str.length > 2000) {
             const chunks = str.match(/[\s\S]{1,2000}/g);
             for(const chunk of chunks) {
                 await message.channel.send(chunk)
             }
         }
         else {
        message.channel.send(str)
      }
      }
      catch (err) {
        console.error("Error processing !gm results:", err);
        message.reply(
          "Something went wrong when trying to get results. Check your input and character limit."
        );
      }
    } else {
      message.reply("**You do not have permission to view the results.**");
    }
    // after getting through !gm results
    lockvote = true;
    message.send("**VOTING IS NOW LOCKED!** To disable it when voting starts, use `!gm lockvote off`.");
  } else if (message.content.includes("!gm reset")) { //with GM34 stuff
    if (message.member.roles.cache.has(Comp.adminRoleID)) {
      if (message.channel.id !== Comp.judgeChannelID) {
        return message.reply("**You can only reset the challenge in the judge channel.**");
      }

      if (message.guild.id === "1375496972705988628"){ //making sure gm reset only affects tally in gm 4.0 server when called there not in MR
        // --- RESET VOTE TALLY ---
        settings.votes = {}; // Clear the object in memory
        fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2)); // Save empty object to file
      // ------------------------
      }

      Comp.submissions = new Array(); 
      message.channel.send("**Reset the current challenge and cleared all votes.**");
      message.channel.send("END"); 

      let channel2 = message.client.channels.cache.get('1391418940223393903');
      channel2.send('**The submissions and voting has been reset!!**');
    } else {
      message.reply("**You do not have permission to reset the challenge.**");
    }
}
 else if (message.content.startsWith("!gm average")) {
    if (message.member.roles.cache.has(Comp.adminRoleID)) {
      // Embed of anyomous results per submission.

      if (Comp.submissions.length === 0) {
        message.reply("**There are currently no submissions.**");
        return;
      }
      const resultsEmbed = new MessageEmbed()
        .setTitle("Results of the Challenge")
        .setColor("#0099ff");

      let idx = 1;
      var submissions = Comp.submissions;
      submissions = submissions.reverse();

      for (const submission of submissions) {
        resultsEmbed.addFields({
          name: `Submission ${idx}`,
          value: `**Average: **${submission.getAverage().toFixed(2)}`,
          inline: false,
        });
        idx += 1;
      }

      message.channel.send({ embeds: [resultsEmbed] });
    } else {
      message.reply(
        "**You do not have permission to view the unformatted results.**"
      );
    }
  }
  // If a submission was manual
  else if (message.content.startsWith("!gm encode")) {
    if (args.length < 3) {
      message.reply(
        "**Please provide a messageID and userID to encode the submission in.**"
      );
    }
    messageID = args[1];
    userID = args[2];
    const judgeChannel = Comp.judgeChannel;

    try {
      targetMessage = await judgeChannel.messages.fetch(messageID);
      if (!targetMessage) {
        return message.reply("**Could not find the message with that ID.**");
      }
      let existingContent = targetMessage.content;
      let encodedID = encodeHiddenCharacter(userID);

      await targetMessage.edit(`-\t${encodedID}\t-\n${existingContent}`);
      message.reply(
        `**Encoded the message ${messageID} with userID ${userID}.**`
      );
    } catch (err) {
      message.reply(
        "**An error occurred while trying to encode the message.**"
      );
    }
  } else if (message.content.startsWith("!gm vote:create")) {
    if (args < 2 || !args[1] || !args[2]) {
      message.channel.send("Please provide a team and the round number.");
      return;
    }
    await createElimination(message, args, Comp);
  }
}

async function createElimination(message, args, Comp) {
  let team = args[1].toLowerCase().trim();
  const round_Ordinal = getOrdinalNumeral(args[2]);
  const immunePlayers = await waitForReply(
    message,
    `**Who is immune?** Reply with names seperated by spaces (or type *none*)`,
    30000
  );
  const autoVote = await waitForReply(
    message,
    `**Who is the Auto Vote?** Reply with a name (or type *none*)`,
    30000
  );
  let currGuild = message.guild;
  let serverInfo = competitionInfo[currGuild.id];
  let eliminationPlayers = new Array();
  let teamEmojiId = "";
  let str = "";
  const emojiToString = currGuild.emojis.cache.map((emoji) => emoji.toString());
  const emojiNameRoles = currGuild.emojis.cache.map((emoji) => emoji.name);
  for (let i = 0; i < emojiNameRoles.length; i++) {
    if (emojiNameRoles[i].toLowerCase().trim().includes(team)) {
      teamEmojiId = emojiToString[i];
    }
  }
  console.log(`Team Emoji ID: ${teamEmojiId}`);

  skipColumns = [
    "name",
    "guildID",
    "adminRoleID",
    "playerRoleID",
    "judgeChannelID",
  ];
  let index = 0;
  for (const id in serverInfo) {
    if (skipColumns.includes(id)) continue; // skip columns that are not player IDS.
    const member = await currGuild.members.fetch(id).catch(() => null); // handle a fetch reject to return null
    if (!member) {
      console.log(`Member with ID ${id} not found in the server. Skipping!`);
      continue;
    }
    let playerRoles = member.roles.cache.map((role) => role.name); // Find their role names
    let inTeam = false;

    for (const role of playerRoles) {
      if (role.toLowerCase().includes(team)) {
        inTeam = true;
      }
    }

    if (inTeam) {
      console.log(
        `Player ${serverInfo[id]} is in team ${team}.`
      );
      let playerInfo = await Comp.findPlayerInfo(id, message.guild);
      eliminationPlayers.push({
        "name": serverInfo[id],
        "emojiId": playerInfo.emoji,
        "index": index,
      });
    }
    index += 1;
  }
  console.log(eliminationPlayers);

  //Generate the writeup after finding the players UFE.
  for (const player of eliminationPlayers)  {

    let channel_index = player.index

    //players to send to.
    str = `__**${teamEmojiId}WELCOME TO THE ${round_Ordinal.toUpperCase()} ELIMINATION.${teamEmojiId}**__\nYou will be voting someone out.\nYour options are:\n\n`;
    for (const player_curr of eliminationPlayers) {
      if (player.name === player_curr.name) continue; //Skip self
      if (immunePlayers.includes(player_curr.name)) continue; //Skip posting the immune player
      str += `${player_curr.emojiId} ${player_curr.name}\n`;
    }
    str += `\nIf you don't vote, your auto-vote goes to... *${autoVote}* \nfor submissions.\n***VOTE RIGHT HERE IN YOUR*** \n***CONFESSIONAL!***`;
    let sendChannel = await message.guild.channels.fetch(
      confessional_ids[channel_index]
    );
    if (!sendChannel) {
      return console.error(
        `Confessional channel not found for index ${channel_index}`
      );
    }
    await sendChannel.send(str);
  }
}

async function reactionAddHandler(reaction, user) {
  if (user.bot) return;
  if (!reaction.message.guild) return; // Prevent DMs from breaking the bot
  // Find Submission object from msg

  const Comp = competitions.get(reaction.message.guild.id);
  if (!Comp) {
    return;
  }

  for (let i = 0; i < Comp.submissions.length; i++) {
    submission = Comp.submissions[i];

    if (reaction.message === submission.associatedMessage) {
      emojiNumber = REACTIONS.indexOf(reaction.emoji.name);
      submission.increase(emojiNumber);
      break;
    }
  }
    console.log('Could not find submission')
}

async function reactionRemoveHandler(reaction, user) {
  if (user.bot) return;
  if (!reaction.message.guild) return; // Prevent DMs from breaking the bot
  const Comp = competitions.get(reaction.message.guild.id);
  if (!Comp) {
    return;
  }

  // Find Submission object from msg
  for (let i = 0; i < Comp.submissions.length; i++) {
    submission = Comp.submissions[i];
    if (reaction.message === submission.associatedMessage) {
      emojiNumber = REACTIONS.indexOf(reaction.emoji.name);
      submission.decrease(emojiNumber);
      break;
    }
  }
}

async function waitForReply(message, prompt, timeout) {
  //Helper function
  return new Promise((resolve, reject) => {
    message.channel.send(prompt);

    const filter = (m) => m.author.id === message.author.id; //returns true if the user who ran the command interacted.
    const collector = message.channel.createMessageCollector({
      filter,
      time: timeout, // Listens to clicks for 60 seconds
      max: 1,
    });
    collector.on("collect", async (response) => {
      let text = response.content.trim().split(/ +/);
      resolve(text); //return this
    });

    collector.on("end", (collected, reason) => {
      if (collected.size === 0) {
        //  collected is what they got if any
        reject(new Error("Empty input (timeout)"));
      }
    });
  });
}

function encodeHiddenCharacter(userId) {
  userId = userId.toString(2);
  userId = userId
    .split("")
    .map((digit) => ZERO_WIDTH_DIGITS[digit])
    .join(""); // do this to every digit
  return userId; // String
}

// Sort by Descending Order.
function sortSubmissions(submissionInput) {
  return submissionInput.sort(function compare(a, b) {
    let a_average = a.getAverage();
    let b_average = b.getAverage();
    if (isNaN(a.getAverage())) {
      a_average = 0;
    }
    if (isNaN(b.getAverage())) {
      b_average = 0;
    }
    return b_average - a_average;
  });
}
function getOrdinalNumeral(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
