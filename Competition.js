const Submission = require("./Submission.js");
const competitionInfo = require("./competitionInfo.json");


class Competition {
  constructor(guildID, adminRoleID, playerRoleID, judgeChannelID, phaseChannelID) {
    this.guildID = guildID;
    this.adminRoleID = adminRoleID;
    this.playerRoleID = playerRoleID;
    this.judgeChannelID = judgeChannelID;
    this.judgeChannel;
    this.phaseChannel; //GM34 thing
    this.phaseChannelID = this.phaseChannelID; //GM34 thing
    this.submissions = new Array();
    this.subIndex = 0;
    this.REACTIONS = [
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
  }


  /*
  Input: Player Id, Guild. 
  Output: Dictionary correlated with the Player Name and Player Emoji

  Finds the Player name and emoji ID correlated with the inputted Player ID.  
  */
  async findPlayerInfo(playerId, guild) {
    let serverInfo = competitionInfo[guild.id];

    let playerName = serverInfo[playerId.toString()]
    const emojiNames = guild.emojis.cache.map((emoji) => emoji.name);
    const emojiToString = guild.emojis.cache.map((emoji) => emoji.toString());
    let emojiId;

    for (let i = 0; i < emojiNames.length; i++) {
      if (emojiNames[i].includes(playerName)) {
        emojiId = emojiToString[i];
      }
    }
    return {
      name: playerName,
      emoji: emojiId,
    };
  }
  /*
  Recovers Lost Submissions from the guild. Sets the submissions array 
  */
  async getSubmissions(guild, delimiter) {
    try {
    let judgeChannelID = this.judgeChannelID;
    let tempSubmissions = new Array(); 
    let index = 0;
    let foundEnd = false;

    //Guild is caught on initialization. 
    //Does the judge channel exist, did the messages successfully fetch? Return -2 and -3
    //No submission found? Return 0. 
    //Any other error? Return -1

    console.log("Getting submissions for guild: ", guild.name, " with judge channel ID: ", judgeChannelID);
    const targetChannel = this.judgeChannel
    if (!targetChannel) {
      console.log("Judge channel not found for guild: ", guild.name);
      return -2; // -2 indciates no judge channel not found
    }
    else {
      console.log("Judge channel found: ", targetChannel.name);
    }
    console.log()
    const messages = await targetChannel.messages.fetch({ limit: 100 });
    if (!messages || messages.size === 0) {
      console.log("No messages found in the judge channel.");
      return -3; // -2 indicates no message found
    }

    //Loop over the messages WITH reactions, then create and add to a submission.
    for (const currMessage of messages) {
      let msgContent = currMessage[1].content;
      if (msgContent === delimiter) {
        foundEnd = true;
        console.log("Reached the end.");
        break;
      }

      let reactions = currMessage[1].reactions.cache; //Message is a map

      if (reactions.size > 0) {
        let tempCounts = new Array(11).fill(0);

        let content = currMessage[1].content;
        const invisMatch = content.match(
          /\t([\u200B\u200C\u200D\uFEFF\u2060\u2061\u2062\u2063\u2064\u180E]+)\t/
        );
        let userId = '-1'
        if(invisMatch) { //If no hidden character, then use -1. 
        userId = this.decodeHiddenCharacter(invisMatch[1]);
        }

        for (const currReaction of reactions) {
          //Curr reactions is a map
          let emojiNumber = this.REACTIONS.indexOf(currReaction[1]._emoji.name);
          const count = currReaction[1].count;
          tempCounts[emojiNumber] = count - 1;
          //console.log(`${userId} - Score: ${tempCounts}` );

        }
        let tempSub = new Submission(currMessage[1], userId, index);
        tempSub.reaction_counts = tempCounts;
        tempSub.total_counts = parseInt(tempSub.getTotalCount());
        tempSubmissions.push(tempSub);
        index += 1;
      }
    }

    if (!foundEnd) {
      index = 0
    }
    this.submissions = tempSubmissions;  //Resets curr submissions to the recovered submissions.
	console.log(`Found ${this.submissions.length}`);
    return index; 
  }
    catch (error) {
      console.error(`Error fetching submissions for ${guild.name}`, error);
      return -1; // Return -1 to indicate an error
    }
  }

  async judgeSubmission(targetChannel, userId) {
    let submissions = this.submissions;
    let resub = false;
    const messages = await targetChannel.messages.fetch({ limit: 1 });
    const prevMessage = messages.first(); // fetch() returns a Collection

    for (let i = 0; i < this.REACTIONS.length; i++) {
      await prevMessage.react(this.REACTIONS[i]);
    }
    for (let i = 0; i < submissions.length; i++) {
      console.log(submissions[i].playerId, userId);
      if (submissions[i].playerId === userId) {
        console.log(
          `Detected resubmission by ${userId} at index ${submissions[i].index}, \nMESSAGE ID${submissions[i].associatedMessage.id}`
        );
        await submissions[i].associatedMessage.delete(); //Delete the old submission
        submissions = this.removeItems(submissions, i);
        this.submissions = submissions;
        resub = true;
        break;
      }
    }
    this.submissions.push(new Submission(prevMessage, userId, this.sub_index));

    console.log("Sucessful push!");
    this.sub_index += 1;
    //setTimeout(() => judgeMsg.delete().catch(console.error), 2000);
    return resub;
  }

  // Used when fetching old submissions.
  decodeHiddenCharacter(hidden) {
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
    let userId = hidden
      .split("")
      .map((char) => ZERO_WIDTH_DIGITS.indexOf(char))
      .join("");
    return userId;
  }

  removeItems(array, index) {
    console.log(index);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }
}

module.exports = Competition;
