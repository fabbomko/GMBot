const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Submission = require("./Submission.js");

class Competition {
  constructor(serverid, adminrole) {
    this.server_id = serverid; //Discord ID of specific server
    this.admin_id = adminrole; //"admin" role ID that can do the judge commands
    this.submissions = []; //collects the submissions
    this.submissionIndex = 0;
    console.log("Successfully made a Comp server"); // not sure if I should keep this
  }

  checkadmin(member) { //checks if the user has admin to do the judge commands
    if (!member.roles.cache.has(this.admin_id)){
    //return message.reply("You don't have permission to use this command."); not sure if this line would work 
    return 0; //this means they do NOT have the role, so index.js has if condition where checkadmin = 0 then says the message 
    }
  }

  judge(previousMessage) { // creates judging list here
	  this.submissions[this.submissionIndex] = new Submission();
      previousMessage.submissionIndex = this.submissionIndex;
      console.log("Identifier:", previousMessage.submissionIndex);
      this.submissionIndex++;
  }

  async average(message) {
      if (this.submissions.length === 0) { 
          return message.channel.send("No submissions have been recorded.");
      }

      const embed = new MessageEmbed()
          .setColor(this.getRandomColor())
          .setTitle("Averages for Challenge");

      this.submissions.forEach((submission, index) => {
          embed.addField(`Submission ${index + 1}`, `${submission.getAverage()}`);
      });

      try {
          return await message.channel.send({ embeds: [embed] });
      } catch (error) {
          console.error("Failed to send message:", error);
      }  
  }

  reset() { //resets the list to make them refresh
     this.submissions.length = 0;
     this.submissionIndex = 0;
  }
    
  getRandomColor() { //to make random color of embed each time ig
  return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
 
}

module.exports = Competition;