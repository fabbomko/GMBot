const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ButtonBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, // Only needed for reactions
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

module.exports = {
  shardcommand,
  setupClient(client) {
    client.on("messageCreate", messageHandler),
      client.on("messageReactionAdd", reactionAddHandler),
      client.on("messageReactionRemove", reactionRemoveHandler);
  },
};

async function shardcommand(message) {
    let prodrole = "1349214817139036241"; //change id for this later, just for test server
    if (!message.member.roles.cache.has(prodrole))
      return message.reply("You are not a Producer/Admin in Wyatt's server.");

    const argsshard = message.content.slice(1).trim().split(" ");
    /*console.log("This is argsshard now: ");
    console.log(argsshard);
    console.log("This is argsshard[1]: ", argsshard[1]);*/
    console.log("this is channel id: ", message.channel.id);
    console.log("can a channel be fetched? ", client.channels.cache.get("1347075302790008835"));
    var receiver_channel = client.channels.cache.get(message.channel.id) //the command !shard is used in the same channel it wants to update the shards in, receiverchannel is an obkejct
    console.log("receiver_channel has type of", typeof receiver_channel);
    const numnewshards = parseInt(argsshard[1]); //# of shards, 0 is shard word
    
    const argsdescr = message.channel.topic.trim().split(" "); //args of channel description
    //console.log(argsdescr);
    var numBshards = 0;

    for (let i = 0; i < argsdescr.length; i++){
      if (argsdescr[i] === "Shards" || argsdescr[i] === "shards"){
        let numshards = parseInt(argsdescr[i-1]);
        //console.log("This is numshards before: ", numshards);
        //console.log("This is numnewshards: ", numnewshards);
        numshards += numnewshards;
        numBshards = numshards;
        //console.log("This is numshards: ", numshards);
        argsdescr[i-1] = numshards.toString(); //updates string value of shards number
        //console.log("This is new value of descr value for shards: ", argsdescr[i-1]);
        break;
      }
    }
    let textdescr = argsdescr.join(" "); //new channel description
    //console.log("New description is going to be: ", textdescr);
    if (receiver_channel === undefined)
        console.log("channel is undefined bruh");
    receiver_channel.setTopic(textdescr)
      .then(updated => console.log(`Channel's new topic is ${updated.topic}`)) // Optional: log the updated topic
      .catch(console.error); // Optional: handle any errors
    return message.reply(`✅ **Confessional is being updated to ${numBshards} shards.**`);
}