const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ButtonBuilder,
} = require("discord.js");

const competitionHandlers = require("./competitionManager.js");
const StringArray = require("./StringArray.js");
const Player = require("./Player.js");
const ListCommand = require("./ListCommand.js");
const Wyattcomp = require("./Wyatt_comp.js");
const competitionInfo = require("./competitionInfo.json");
const Economy = require("./GMEconomy");

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);


let cooldown = true; // [TESTING] THIS IS HOW TO STOP REACTION COOLDOWN
const reactionCooldowns = new Map(); // Track when each user last reacted

let guild;
const logChannelId = "1365408503966990406";
let playerRole = "1251785011695452170"; //GM29 Player Role ID
var producerRole = "1375496972882153473";
const elimRoleId = "1432505627472560260";
const redemptionRoleId = "1181989680426786849";

let PLAYER_NUM = 31;
let players = []; //Collection of Player Objects

let unionEmojis = [
  "<:union_Panaka:1365400154810875944>",
  "<:union_Ganesi:1365400149928575096>",
  "<:union_Millarayen:1365400151467753612>",
  "<:union_Okhoma:1365400152893952011>",
  "<:union_Vehoc:1373036292450943119>",
];
let playerNames = [
 "Archipel",
  "Artus",
  "Celagon",
  "Circliey",
  "Clyxll",
  "Davidoro",
  "Gray",
  "Mexican",
  "Ukrainskyy",
  "Kites",
  "Mortum",
  "Mv mapping",
  "Narvon",
  "New Abyssinia",
  "Pepty",
  "Perlousharp",
  "Phil",
  "Phil 2",
  "Prussian",
  "Seclyria",
  "Spongynesia",
  "Toilet Rat",
  "Tortilla",
  "True Albanian",
  "Wdm",
  "Wyatttfp",
  "Faboomko"
];
let emoji_ids = [
  "<:playerToiletRat:1432838936992022650>",
  "<:playerTrueAlbanian:1431581192658096188>",
  "<:playerNewAbbysinia:1432839162536656986>",
  "<:playerWDM:1432839169675235380>",
  "<:playerPrussian:1431581179043385475>",
  "<:playerCelagon:1431581150077255741>",
  "<:playerTortilla:1431581190095114251>",
  "<:playerWyattTFP:1432838939319992460>",
  "<:playerSeclyria:1431581181538996297>",
  "<:playerMortum:1431581162182283264>",
  "<:playerKites:1431581155437842474>",
  "<:playerSpongynesia:1431581184277745776>",
  "<:playerMexican:1431581158100959323>",
  "<:playerPhil:1432838669273792663>",
  "<:WinnerFaboomko:1385724320134991993>", //Fab for testing
  "<:playerPhil2:0000000000000000000>",
  "<:playerGray:1431581153004879892>",
  "<:playerDavidoro:1431580534273740861>",
  "<:playerClyxll:1431580512362958938>",
  "<:playerCircley:1431580493966606396>",
  "<:playerArtus:1431580208363868285>",
  "<:playerArchipel:1431580098594738186>",
  "<:playerUkrainskyy:1431581160110034984>", //Miyusa's emoji for now
  "<:playerPepty:1431581172470644756>",
  "<:playerNarvon:1431581170507845694>",
  "<:playerMVmapping:1432838654866231468>",
  "<:playerPerloussharp:1431581174794551449>"
];
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

let channels = []; //Array of TopicChannel Objects
let player_ids = [
  "849155046796165121",
    "706757460484161586",
    "682727324696838239",
    "867795568750231553",
    "772551450282164254",
    "1271018490358272064",
    "944778943590961183",
    "853636911142141953",
    "711340695444520970",
    "1012737904935714886",
	"1128416477243002983",
    "1340315534117568615",
    "1122506424757530696",
    "352217207368843265",
    "1267078676047204454",
    "1274510657839956038",
    "1225410918888902686",
      "816225079909679105",
      "760576453208702986",
      "1326647258451673214",
      "1206971398233268287",
      "729857163299913748",
      "1153299570051256370",
      "1149399606564753458",
      "422890165493694465",
      "895047608521850930",
      "532331889655152642" //Fab, for testing purposes
];



const prefix = "!gm";
let log_channel;

let playerInfo = new Array(); //Name, Grands, Minerals, Advantages, Status Effects for All Players.

// Set up both Discord.js and Google Sheets Servers.

// Database for economy system
const { QuickDB } = require("quick.db");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, // Only needed for reactions
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

// Economy system
const db = new QuickDB();
const PREFIX = "!gm";

competitionHandlers.setupClient(client); //Initialize the event handlers

// Economy system management:
const ECONOMY_GUILD_ID = "1375496972705988628"; //Only works in one server
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  // ❗ Restrict economy commands to one server

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const GMprodroleId = "1375496972882153473"; //GM producer role id
  const GM33prodroleId = "1475558041049894923";
  const execprodRole = "1375504548495622266";
  const hostRole = "1375496972882153474";
  //!gm register called
  if (command === "register"){
      if (message.member.roles.cache.has(GMprodroleId)) {
          registerCommand(message);
      }
      else if (message.member.roles.cache.has(GM33prodroleId)) {
          registerCommand(message);
      }
      else return message.reply("❌ You are not a Grand Mapper producer so you cannot use this command.");
  }
    //!gm clear called
  if (command === "clear"){
      if (!message.member.roles.cache.has(execprodRole) && !message.member.roles.cache.has(hostRole)) return message.reply("❌ You are not a Grand Mapper host or executive prod so you cannot use this command.");
      else clearCommand(message);
  }
  if (command === "bal") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    else Economy.balanceCommand(message);
  } 
  if (command === "lb") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    else Economy.leaderboardCommand(message);
  }
  if (command === "lb-bank"){
  Economy.bankLeaderboardCommand(message);
  }
  if (command === "lb-cash"){
  Economy.cashLeaderboardCommand(message);
  }
  if (command === "work") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    else Economy.workCommand(message);
  }
  if (command === "crime") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    else Economy.crimeCommand(message);
  }
  if (command === "daily") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    else Economy.dailyCommand(message);
  }
  if (command === "add-money" || command === "add") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    if (!message.member.roles.cache.has(GMprodroleId)) return message.reply("❌ You are not a Grand Mapper producer so you cannot use this command.");
    if (!args[0].includes("@")) return message.reply("❌ Your message must go as `!gm add-money @user <amount>`");
    if (parseInt(args[1]) < 1) return message.reply("❌ The amount added must be greater than zero.");
    if (message.member.id === "1128416477243002983") return message.reply("❌ You are blacklisted from using this command Mortum.");
    Economy.addCommand(message, args);
  }
  if (command === "remove-money" || command === "remove") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    if (!message.member.roles.cache.has(GMprodroleId)) return message.reply("❌ You are not a Grand Mapper producer so you cannot use this command.");
    if (!args[0].includes("@")) return message.reply("❌ Your message must go as `!gm remove-money @user <amount>`");
    if (parseInt(args[1]) < 1) return message.reply("❌ The amount removed must be greater than zero.");
    if (message.member.id === "1128416477243002983") return message.reply("❌ You are blacklisted from using this command Mortum.");
    Economy.removeCommand(message, args);
  }
  if (command === "set-money" || command === "set") {
    if (message.guild.id !== ECONOMY_GUILD_ID) return message.reply("❌ Sorry, the Grand Mapper economy only works in the main Grand Mapper server.");
    if (!message.member.roles.cache.has(GMprodroleId)) return message.reply("❌ You are not a Grand Mapper producer so you cannot use this command.");
    if (!args[0].includes("@")) return message.reply("❌ Your message must go as `!gm set-money @user <amount>`");
    if (parseInt(args[1]) < 1) return message.reply("❌ The amount set must be greater than zero.");
    if (message.member.id === "1128416477243002983") return message.reply("❌ You are blacklisted from using this command Mortum.");
    Economy.setCommand(message, args);
  }
  if (command === "dep" || command === "deposit") {
  Economy.depositCommand(message, args);
  }
  if (command === "with" || command === "withdraw") {
  Economy.withdrawCommand(message, args);
  }
  if (command === "rob"){
  Economy.robCommand(message);
  }
  if (command === "bank-rob"){
  Economy.bankrobCommand(message);
  }
  if (command === "blackjack"){
  Economy.blackjackCommand(message, args);
  }
  if (command === "roulette"){
  Economy.rouletteCommand(message, args);
  }
  if (command === "give"){
  Economy.giveCommand(message, args);
  }     
});


client.on("ready", async () => {
  console.log("GMBot is Online!");
  console.log("Current System Time:", new Date().toString());
  await competitionHandlers.initializeComps(client)

  log_channel = await client.channels.cache.get(logChannelId);
  
  guild = client.guilds.cache.get("1131317607539167234"); //Get the guild / SERVER  object
  log_channel.send("**GMBot is Online!**");

  await createPlayers(); //Simply create the Players array. not populated

});

client.once("ready", async () => {
  /* Schedule stuff
  const schedule = require('node-schedule');
  //Time stuff for a week
    const job0 = schedule.scheduleJob({
      year: 2026,
      month: 4,
      date: 6,
      hour: 23,
      minute: 49,
      second: 15,
    }, function() {
      const channel = client.channels.cache.get('1453074540946264074');
      if (channel) channel.send("HEYYYY GUYSSS!!!!");
    });
*/
});

/*
    Used when bot restarts. Makes an array of player objects and assigns the channels, and their ids to them. 
    */
async function createPlayers() {
  for (let i = 0; i < PLAYER_NUM; i++) {
    players.push(new Player(playerNames[i], player_ids[i], emoji_ids[i]));
    channels[i] = await client.channels.fetch(confessional_ids[i]); //Returns TextChannel Object
    players[i].channel = channels[i];
    players[i].confessional_id = confessional_ids[i];
  }
}


// Trolling
/*const channelId = '1456410934800027770'; // Replace with your channel ID
const messageContent = 'WELL WELL are you gonna do it then? <:gm_troll:1457746218766565532>';

// In an event like 'ready' or inside a command handler
client.on('ready', () => {
  console.log('Bot is ready!');

  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.send(messageContent)
      .then(() => console.log('Message sent successfully!'))
      .catch(console.error);
  } else {
    console.error(`Channel with ID ${channelId} not found in cache.`);
  }
});*/


client.on("message", async (message) => {
  if (message.content.includes("!gm elim")) {
    if (message.member.roles.cache.has("1375496972882153473")) {
      if (!message.guild.id === "1131317607539167234")
        return message.reply(
          "This server cannot use that command. It is GM only!"
        );
      
      //return message.reply("This command has been temporarily disabled because there is no ongoing Grand Mapper season!");
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      if (args < 1 || !args[1]) {
        message.reply("Please provide a player to eliminate.");
        return;
      }

      // let name = args[1];
      var playerObj; //The player object
      var player = message.mentions.members.first(); //Discord User object

      if (!player) {
        message.reply(`**Player @ not found.**`);
        return;
      }

      //DEBUG
 

      for (let i = 0; i < players.length; i++) {
        if (i == 0)
          console.log("OKAY this is players[i] and user id:");
        console.log(players[i].name)
        console.log(players[i].user_id);
        /*if (player.id === players[i].user_id.trim()) {
          playerObj = players[i];
        }*/
      }
      return;

      //message.channel.send(`Player ${playerObj.name} team is ${playerObj.team}`)
      //player.team = 'Eliminated';
      var teamRole;
      var player_Role;

      const elimRole = guild.roles.cache.find(function (role) {
        return role.id === elimRoleId;
      });
      const redemptionRole = guild.roles.cache.find(function (role) {
        return role.id === redemptionRoleId;
      });
      var player_Role = guild.roles.cache.find(function (role) {
        return role.id === playerRole;
      });

      if (!player_Role) {
        message.reply(`${player} is not a Player.`);
        return;
      }
      const member = guild.members.cache.get(player.id);

      if (
        !member.roles.cache.get(elimRole.id) ||
        member.roles.cache.get(redemptionRole.id)
      ) {
        await member.roles.add(elimRole);
        await member.roles.remove(redemptionRole);
        playerObj.team = "Eliminated";
        await modifyPlayerInfo(playerObj);
        return message.reply(`✅ **${player} has been eliminated.**`);
      } else {
        message.reply(`${player} is already eliminated.`);
        return;
      }
    } else {
      return message.reply(
        "Unable to Eliminate that player from Grand Mapper: You are not a **Producer**."
      );
    }
  } else if (message.content.includes("!gm distribute")) {
    if (message.member.roles.cache.has(producerRole)) {
      //Update the 2D Array with new grands, then update every player's inventory and discription.
      await pullPlayerInfo(); //Update the 2D playerInfo Array

      for (let i = 0; i < players.length; i++) {
        players[i].grandsChallengeGain = parseInt(playerInfo[i][21]);
        let currGrands = players[i].grandsChallengeGain;
        console.log(currGrands);
        if (currGrands !== 0) {
          await channels[i].send(
            `# You recieved ${currGrands} Grands <:Grand:1193685816044691516> from a score of ${
              currGrands / 100
            }.`
          );
        }
        players[i].grands += currGrands;
        await modifyPlayerInfo(players[i]);
      }
      message.channel.send(
        `**✅ Grands have been distributed to ${PLAYER_NUM} Players.**`
      );
      for (let i = 0; i < players.length; i++) {
        if (players[i].grandsChallengeGain != 0) {
          await players[i].updateDescription();
        }
      }
      message.channel.send(
        `**✅ Channel Descriptions have been updated with new Grands**`
      );
    } else {
      message.channel.send(
        "Unable to Distribute Grands: You are not a **Producer**."
      );
    }
  }
});

//GM34 roll command
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.includes("!gm kill") && message.mentions.users.size > 0){
    const mentionedUser = message.mentions.users.first();
    message.reply("**"+mentionedUser.username+" HAS BEEN KILLED BY "+message.author.username+"!!**");
  }
  if (message.content.startsWith("!gm kill") && message.mentions.users.size === 0){
    message.reply("Say who you want to kill smh");
  }

  if (message.content.startsWith("!gm roll")) {
      if (message.channel.id === '1375496976581525546')
      return("STOP FUCKING ROLLING GRAND MAPPER CARDS IN GENERAL!! MOVE THAT TO <#${1375496976581525547}>!!");
      
    let cardp = Math.random(); //card probability
    
    // THE CARD RANDOMLY CHOSEN WITH RARITY SELECTED
    if (cardp > 0.94) {
      let lcard = await LegendCard();
      return message.reply("You rolled a **LEGENDARY**!\n"+lcard);
    }

    if (cardp > 0.8 && cardp < 0.94) {
      let rcard = await RareCard();
      return message.reply("You rolled a RAREEE!!\n"+rcard);
    }

    if (cardp > 0.55 && cardp < 0.8) {
      let uncard = await UncommonCard();
      return message.reply("You rolled an UNcommon!!\n"+uncard);
    }

    if (cardp < 0.55) {
      let comcard = await CommonCard();
      return message.reply("You rolled a common!\n"+comcard);
    }

    return message.reply("❌ That was a bad roll. Try again.");
  }
});

async function LegendCard(){
  let choices = ["ACADIA: https://cdn.discordapp.com/attachments/1211769490547802133/1488393634624835715/Acadia_28.png?ex=69d13b57&is=69cfe9d7&hm=10adf0d9239212f3a032979cfcbda4d32fa4421f4634d86f3a278a5b4a57f3e9&",
    "DUAL BELGIUM MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488393635203387485/Dual_Belgium_13.png?ex=69d13b57&is=69cfe9d7&hm=898830b611c8931ebb45470ffaa72a7aae72953f16ea95dc74e4100a923c3171&=&format=webp&quality=lossless&width=571&height=800",
    "FRKON: https://media.discordapp.net/attachments/1211769490547802133/1488393635736060084/Frkon_7.png?ex=69d13b57&is=69cfe9d7&hm=8a67baf94f814b9aae2f86d248c9cac201b7fc1902906d25e689e1a9eac0fa6a&=&format=webp&quality=lossless&width=571&height=800",
    "GULFSTREAM: https://media.discordapp.net/attachments/1211769490547802133/1488393636222861414/Gulfstream_12.png?ex=69d13b57&is=69cfe9d7&hm=f8e20ab19c06640a6ffd011832a216cc15ed95c44d4dd2d32accda2b5fa35433&=&format=webp&quality=lossless&width=571&height=800",
    "KYIV MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488393636717658202/Kyiv_23.png?ex=69d13b58&is=69cfe9d8&hm=f4b71d7dce375fe3fa98a02478afbd2bf9ef3b97aa083e77556467c640b59a84&=&format=webp&quality=lossless&width=571&height=800",
    "LASER KIWI: https://cdn.discordapp.com/attachments/1375498975880151171/1494475178732814477/Lazer_Kiwi_9.png?ex=69e2bdf8&is=69e16c78&hm=18009eb957f789012683f0aa38859f9fe0fa0bac6a9556461229b2e6a96602d5&",
    "LINEARIS: https://media.discordapp.net/attachments/1211769490547802133/1488393637334224976/Linearis_32.png?ex=69d13b58&is=69cfe9d8&hm=62b572b6c0898db16a7c6252d29f4c19ccafe0637bdba17a22c924f9ceaa44a0&=&format=webp&quality=lossless&width=571&height=800",
    "MINKES: https://media.discordapp.net/attachments/1211769490547802133/1488393645907247104/Minkes_20.png?ex=69d13b5a&is=69cfe9da&hm=09660fc5835f2f2767e708edeb587b455525c6f396cf51542be75bf7a8c32a5e&=&format=webp&quality=lossless&width=571&height=800",
    "NABY: https://media.discordapp.net/attachments/1211769490547802133/1488393646729597069/Naby_31.png?ex=69d13b5a&is=69cfe9da&hm=f928d37bdc392b16faa9ea970d6b9d4d1421f9e453ca72c6cb29295287e8bf7e&=&format=webp&quality=lossless&width=571&height=800",
    "OMEGA MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488393647530709012/Omega_6.png?ex=69d13b5a&is=69cfe9da&hm=b554793d81849267cbcb33f8cacc981c1068c42783e5fb8973b3a6b22c09b07f&=&format=webp&quality=lossless&width=571&height=800",
    "SIMPLE MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488393648344141834/Simple_10.png?ex=69d13b5a&is=69cfe9da&hm=7fe4d0f27d5100485d056c3e082221f244b74ad68ceffe2929c4453df696e579&=&format=webp&quality=lossless&width=571&height=800",
    "SWISS SCENARIOS: https://media.discordapp.net/attachments/1211769490547802133/1488393649296506960/Swiss_18.png?ex=69d13b5b&is=69cfe9db&hm=8b66489413f26caeefc9c2d5924b9a046f5381a36ff248165ce154d02f7f2ac1&=&format=webp&quality=lossless&width=571&height=800",
    "VOYAGER WITH THE SHIELD: https://media.discordapp.net/attachments/1211769490547802133/1488393650240098344/Voyager_5B.png?ex=69d13b5b&is=69cfe9db&hm=5171aaf3dcaccc426f2a711f52155c4418aa4a413e2abba7d9d75f741b7eb6e8&=&format=webp&quality=lossless&width=571&height=800"
  ];
  choices = choices.sort(() => Math.random() - 0.5);
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];
  console.log(randomChoice);
	return randomChoice;
}

async function RareCard(){
  let choices = ["AMERICAN MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406764347981894/American_30.png?ex=69d14791&is=69cff611&hm=b818c2e4c94769fc6d3652715d6d0c0558886c1cde63623fcae7a570ade71ba4&=&format=webp&quality=lossless&width=571&height=800",
    "ARNE: https://media.discordapp.net/attachments/1211769490547802133/1488406764947771392/Arne_27.png?ex=69d14792&is=69cff612&hm=830a561592090d6b42e37010f378d93b2e599031fd84e51e22e394df738a90e8&=&format=webp&quality=lossless&width=571&height=800",
    "ARUX PRODUCTIONS: https://media.discordapp.net/attachments/1211769490547802133/1488406766008926238/Arux_19.png?ex=69d14792&is=69cff612&hm=84523334a37c3de3718544da67824759daf4a0c7da29edbb047c6dbb7869465b&=&format=webp&quality=lossless&width=571&height=800",
    "AZALEA ANIMATIONS: https://media.discordapp.net/attachments/1211769490547802133/1488406766537670726/Azalea_20.png?ex=69d14792&is=69cff612&hm=3266dad4c56cd44fe7ca5c297557d08ea55020abc69f627c5dd590f914cb6272&=&format=webp&quality=lossless&width=571&height=800",
    "CHERI: https://media.discordapp.net/attachments/1211769490547802133/1488406767141523476/Cheri_17.png?ex=69d14792&is=69cff612&hm=16c2107f1bd2fc4265e7359107b7267a2d0c91bbcb130c3923fc1d2057b20b80&=&format=webp&quality=lossless&width=571&height=800",
    "COLONIAL MAPPER: https://media.discordapp.net/attachments/1211769490547802133/1488406767678259252/Colonial_1.png?ex=69d14792&is=69cff612&hm=8c5b3edd3802c40f0baabaa9b7551c1386e5746b36ac91e7a4664334f851349f&=&format=webp&quality=lossless&width=571&height=800",
    "CONCLEROR: https://media.discordapp.net/attachments/1211769490547802133/1488406768265723914/Concleror_15.png?ex=69d14792&is=69cff612&hm=2e3fd817e404705333c893482577719e51f2a63bf6bd82acdfbf6192d469cf00&=&format=webp&quality=lossless&width=571&height=800",
    "DOM: https://media.discordapp.net/attachments/1211769490547802133/1488406789304090624/Dom_26.png?ex=69d14797&is=69cff617&hm=9e0d05b9518e0817f636beb0b2d15c15de4995d0a2432c4dd2b3b53aaa9b85f0&=&format=webp&quality=lossless&width=571&height=800",
    "DOOM MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406790059200552/Doom_16.png?ex=69d14798&is=69cff618&hm=9722d6b999efa343953ca425b5665ad75b329bcf04050b71de7d5669550b5264&=&format=webp&quality=lossless&width=571&height=800",
    "EASTERN MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406790642335855/Eastern_14.png?ex=69d14798&is=69cff618&hm=23db17b11816741c2c02c07ee9b6c80cc5939bb411b609500bf74072ff068a48&=&format=webp&quality=lossless&width=571&height=800",
    "FABOOMKO: https://media.discordapp.net/attachments/1133832241051615314/1490437813441658880/Faboomko_3B.png?ex=69d40de1&is=69d2bc61&hm=baf1e084f0324098e2d281863c3dfa4b08c1448b54b2cac0e45c7dab39943445&=&format=webp&quality=lossless&width=313&height=438",
    "FLORIDA: https://media.discordapp.net/attachments/1211769490547802133/1488406791321686136/Florida_22.png?ex=69d14798&is=69cff618&hm=7452d6c2b8af8788eea3e7a2060d0ef0c6bbb883c7d6b1cec54e31288e400e33&=&format=webp&quality=lossless&width=571&height=800",
    "GREENBALL ANTI-MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406792231977150/GreenBall_1B.png?ex=69d14798&is=69cff618&hm=2b65fbbb6d713c72ccb217ff9a435d45e6d3e588afafb6cb6ffc03eee4b11a41&=&format=webp&quality=lossless&width=571&height=800",
    "HOLY SEALANDIC MAPPER: https://media.discordapp.net/attachments/1211769490547802133/1488406793217380544/Holy_Sealandic_5.png?ex=69d14798&is=69cff618&hm=a4a29b441c10f8836e85a003af392b0612df2821f8e2f2b8e699fac288369396&=&format=webp&quality=lossless&width=571&height=800",
    "INTERFLUX: https://media.discordapp.net/attachments/1211769490547802133/1488406793909567668/Interflux_4.png?ex=69d14798&is=69cff618&hm=85faf455bf350ee2b5943a64927a181a28bef72000106b28a529c63e3eb26b58&=&format=webp&quality=lossless&width=571&height=800",
    "QUEBEC MAPPER: https://media.discordapp.net/attachments/1211769490547802133/1488406813018685641/Quebec_11.png?ex=69d1479d&is=69cff61d&hm=f65cf01dc815236f40a50494c65eaaf1332b0638580c1142861dc7d42360368e&=&format=webp&quality=lossless&width=571&height=800",
    "ROYAL MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406813622796348/Royal_3.png?ex=69d1479d&is=69cff61d&hm=bb1844edf24ce7e8202f48e73e266ff3e9bdbbfaf1054e98cfde3b8756ba859e&=&format=webp&quality=lossless&width=571&height=800",
    "SIIB MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406814218260531/Siib_2B.png?ex=69d1479d&is=69cff61d&hm=5f66b0d896c9896ffe2d6d49acac4fcaadd76358614b49f2e81a8f4070f6b8f9&=&format=webp&quality=lossless&width=571&height=800",
    "SKELETAL MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406814805725234/Skeletal_2.png?ex=69d1479d&is=69cff61d&hm=bc7472b195fa66e714ccac541c77f73fc3784f037d8a54ae35c7f38cddf083fa&=&format=webp&quality=lossless&width=571&height=800",
    "TETNO: https://media.discordapp.net/attachments/1211769490547802133/1488406815715885229/Tetno_4B.png?ex=69d1479e&is=69cff61e&hm=6960e72459932fe031ae3469fadfee06de9e2970a73160b6f1ef181d0650465e&=&format=webp&quality=lossless&width=571&height=800",
    "UHSTRAALIS: https://media.discordapp.net/attachments/1211769490547802133/1488406816613470208/Uhstraalis_25.png?ex=69d1479e&is=69cff61e&hm=13584c6928f2d72147b277115fcc9110f0725f0c5fcf192e5edd9546011d1e9d&=&format=webp&quality=lossless&width=571&height=800",
    "VENANT MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488406817351405649/Venant_8.png?ex=69d1479e&is=69cff61e&hm=5adb8f8d178eef7c43e163a57efa6c5c99989b7896095d80110683d3225ceb62&=&format=webp&quality=lossless&width=571&height=800"
  ];
  choices = choices.sort(() => Math.random() - 0.5);
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];
  console.log(randomChoice);
	return randomChoice;
}

async function UncommonCard(){
  let choices = ["ACADIA: https://media.discordapp.net/attachments/1211769490547802133/1488430881461899304/Acadia_15.png?ex=69d15e07&is=69d00c87&hm=15fac2694eb416cbdcb3f8693f20b503e4f8e53c2f687c45d6886d97e072b0a9&=&format=webp&quality=lossless&width=571&height=800",
    "AMERICAN MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430881998635028/American_14.png?ex=69d15e07&is=69d00c87&hm=ff0b526b89f4b67f2c74341349aec76d44ac8e20c3017f24c7c9e6cdc26bf6f5&=&format=webp&quality=lossless&width=571&height=800",
    "VOYAGER: https://cdn.discordapp.com/attachments/1375498975880151171/1494475802493063289/Voyager_25.png?ex=69e2be8d&is=69e16d0d&hm=60b4083694b05e9288497088f0aa9e100ae0b8e7240a22777f21ade05af304e5",
    "AMERICAN MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430882565001387/American_21.png?ex=69d15e08&is=69d00c88&hm=224f4ce042f06c3cb96f860e1a828e6ad5fa0f11111c0837b3a01fd2a52494e9&=&format=webp&quality=lossless&width=571&height=800",
    "AZALEA ANIMATIONS: https://media.discordapp.net/attachments/1211769490547802133/1488430883651190794/Azalea_1B.png?ex=69d15e08&is=69d00c88&hm=72ab091b6628b0672dffc382cab416d2276aa559c116b2a34bfe13b16f021d6c&=&format=webp&quality=lossless&width=571&height=800",
    "AZALEA ANIMATIONS: https://media.discordapp.net/attachments/1211769490547802133/1488430884100116501/Azalea_18.png?ex=69d15e08&is=69d00c88&hm=bdddd308ec483e475548e268917662624c84b0baf46f86cdc1d37f4cfc814042&=&format=webp&quality=lossless&width=571&height=800",
    "AZALEA ANIMATIONS: https://media.discordapp.net/attachments/1211769490547802133/1488430884603559936/Azalea_29.png?ex=69d15e08&is=69d00c88&hm=9f5fe1fe95253b20752c65d22c3d897d3aa45ef90e935f2cada55bd04a188adb&=&format=webp&quality=lossless&width=571&height=800",
    "ARUX GM18",
    "ARNE: https://cdn.discordapp.com/attachments/1375498975880151171/1494475467309453412/Arne_30.png?ex=69e2be3d&is=69e16cbd&hm=c9390f6b80a6080a5966606cace2dc7ad5dadf2970c614326dd151a12bd7b0c3",
    "CHERI: https://media.discordapp.net/attachments/1211769490547802133/1488430885081448458/Cheri_10.png?ex=69d15e08&is=69d00c88&hm=55b3943a3f00e2ee9b0a9c269487b76aea1eff48762b24902e1398470dcf180b&=&format=webp&quality=lossless&width=571&height=800",
    "CHERI: https://media.discordapp.net/attachments/1211769490547802133/1488430885555540049/Cheri_30.png?ex=69d15e08&is=69d00c88&hm=0b287a39b92594a43e27bbdbcbd033289160e19bc52781b13f1e41a3da0b5cc2&=&format=webp&quality=lossless&width=571&height=800",
    "DOM: https://media.discordapp.net/attachments/1211769490547802133/1488430886033817651/Dom_21.png?ex=69d15e08&is=69d00c88&hm=3c7cbca1b336c6d76b6b5e01ce947ae275fec2658160529ff5e29960810aca95&=&format=webp&quality=lossless&width=571&height=800",
    "DOM: https://media.discordapp.net/attachments/1211769490547802133/1488430896376713226/Dom_28.png?ex=69d15e0b&is=69d00c8b&hm=7369776e80a6bd9d27f055d90875b8e9d095305fdebfa5cd7fd1510aef8cadba&=&format=webp&quality=lossless&width=571&height=800",
    "DOOM MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430896951590985/Doom_9.png?ex=69d15e0b&is=69d00c8b&hm=f535f634c1c19f08707de48b1723f2dd7d6a6a0288e54a07f460c8fd45f160e7&=&format=webp&quality=lossless&width=571&height=800",
    "DOOM MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430897584668672/Doom_18.png?ex=69d15e0b&is=69d00c8b&hm=a0298a60503a5798ee4a8307cc8b2fb8f8d5beaa7ee22cb602200263c5cfca39&=&format=webp&quality=lossless&width=571&height=800",
    "DUAL BELGIUM MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430898478190612/Dual_Belgium_6.png?ex=69d15e0b&is=69d00c8b&hm=48c75901244f2450206362e8e70b235b044f32f3a71ac89e5e3e719231b68b4b&=&format=webp&quality=lossless&width=571&height=800",
    "FABOOMKO: https://media.discordapp.net/attachments/1211769490547802133/1488430899078107176/Faboomko_5B.png?ex=69d15e0c&is=69d00c8c&hm=fac502fec9347ea6b99b2151587c39d6056876bd55a516be0f7dca7f8d169efc&=&format=webp&quality=lossless&width=571&height=800",
    "FLORIDA: https://media.discordapp.net/attachments/1211769490547802133/1488430899857981512/Florida_29.png?ex=69d15e0c&is=69d00c8c&hm=57fa3a2a84667443b0f1bbb983d24c670ba737c1918f157f32ff8e90b449b97a&=&format=webp&quality=lossless&width=571&height=800",
    "GREENBALL ANTI-MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430900588056796/GreenBall_5B.png?ex=69d15e0c&is=69d00c8c&hm=78830b9680f74ea5a4e70ec1e15d9b82e943627d17c73d953ae16b64aa6f82de&=&format=webp&quality=lossless&width=571&height=800",
    "GREENBALL ANTI-MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430901145763861/GreenBall_30.png?ex=69d15e0c&is=69d00c8c&hm=d4717dc9499731d81b4f24f2f3d19fa415d46f48fc93c907f0c6f0381e8faca8&=&format=webp&quality=lossless&width=571&height=800",
    "GREENBALL ANTI-MAPPING: https://cdn.discordapp.com/attachments/1375498975880151171/1494477277755605093/GreenBall_3.png?ex=69e2bfed&is=69e16e6d&hm=6975edb473f27d408c83dd7c421dfd123834b4d47c0af40aed3422aafda932cd&",
    "GREENBALL ANTI-MAPPING: https://cdn.discordapp.com/attachments/1375498975880151171/1494477278422372423/GreenBall_21.png?ex=69e2bfed&is=69e16e6d&hm=73650db22aca38b40c24194d7bd831e50962cf316317291c59c1dc3ddf9a87a7&",
    "GREENBALL ANTI-MAPPING: https://cdn.discordapp.com/attachments/1375498975880151171/1494477279231742234/GreenBall_20.png?ex=69e2bfed&is=69e16e6d&hm=f189bf87af280b69fade41c4db98f2577e475fd794abbbdbbfcbf315e69986d4&",
    "GREENBALL ANTI-MAPPING: https://cdn.discordapp.com/attachments/1375498975880151171/1494477280469319721/GreenBall_11.png?ex=69e2bfed&is=69e16e6d&hm=a99b3e34765e82e25b333317778f93c490d43e17f0bfc96ebdc2d9172cc7f69d&",
    "GULFSTREAM: https://media.discordapp.net/attachments/1211769490547802133/1488430901904805938/Gulfstream_21.png?ex=69d15e0c&is=69d00c8c&hm=f54382ad063d09bed9aeff7e5e7a9c886c5101aeecddd2e9b776df1a78e80d7d&=&format=webp&quality=lossless&width=571&height=800",
    "INTERFLUX: https://media.discordapp.net/attachments/1211769490547802133/1488430902672490620/Interflux_29.png?ex=69d15e0c&is=69d00c8c&hm=ef9df5eb8ffca948614eb46bf19bcdf88c36b25380533b1c49401a3ecc208a57&=&format=webp&quality=lossless&width=571&height=800",
    "LINEARIS: https://media.discordapp.net/attachments/1211769490547802133/1488430917008621669/Linearis_9.png?ex=69d15e10&is=69d00c90&hm=76c2a4da37e10f087dd28d794046dc2b8c68981c91988c7dc826b89a18e44b68&=&format=webp&quality=lossless&width=571&height=800",
    "MINKES: https://media.discordapp.net/attachments/1211769490547802133/1488430917528588388/Minkes_1B.png?ex=69d15e10&is=69d00c90&hm=ced31718702df0737241173075d9cd3ea1f9c1d4d6a4336f79da9dd4a3480255&=&format=webp&quality=lossless&width=571&height=800",
    "MINKES: https://media.discordapp.net/attachments/1375498975880151171/1493165835697520730/Minkes_3.png?ex=69ddfa8c&is=69dca90c&hm=6ff11016a3edb9b3e67cd7da649078f2903f8f7efdfef17fb4a1fa480d9e1031&=&format=webp&quality=lossless&width=571&height=800",
    "MINKES: https://media.discordapp.net/attachments/1211769490547802133/1488430918833147995/Minkes_17.png?ex=69d15e10&is=69d00c90&hm=f7e700c24af9fad452a3272f2980deb8e29fd910f7d8ee198a61ddf7c554bf1c&=&format=webp&quality=lossless&width=571&height=800",
    "NABY: https://media.discordapp.net/attachments/1211769490547802133/1488430919432929340/Naby_14.png?ex=69d15e10&is=69d00c90&hm=2c7bc2a00e5ac08089e3d20807cd56561ff08733d543a0058d6940d4c548f7e5&=&format=webp&quality=lossless&width=571&height=800",
    "TETNO: https://media.discordapp.net/attachments/1211769490547802133/1488430938038730792/Tetno_24.png?ex=69d15e15&is=69d00c95&hm=650ed66f27dbe8b8fe9449e457ae01b1766124caa07784ee3063a267c3706fdf&=&format=webp&quality=lossless&width=571&height=800",
    "TETNO: https://media.discordapp.net/attachments/1211769490547802133/1488431315756781688/Tetno_11.png?ex=69d15e6f&is=69d00cef&hm=f51ac0b37bee22fa263f3618a246eaab1f36b94c0e419b9f52185ca8738dfc35&=&format=webp&quality=lossless&width=313&height=438",
    "UHSTRAALIS: https://media.discordapp.net/attachments/1211769490547802133/1488430938533920838/Uhstraalis_25.png?ex=69d15e15&is=69d00c95&hm=d74466b6d025e8ffaa3a541fa70712efe6feb063df108d12a800132a58d62ca4&=&format=webp&quality=lossless&width=571&height=800",
    "UHSTRAALIS: https://media.discordapp.net/attachments/1211769490547802133/1488430939041173674/Uhstraalis_32.png?ex=69d15e15&is=69d00c95&hm=c513a059b472aab46fb9fd91da32e5142cf8755e79ea70824a85c0212cad42d2&=&format=webp&quality=lossless&width=571&height=800",
    "VANUATU MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430939498479667/Vanuatu_7.png?ex=69d15e15&is=69d00c95&hm=2dbece58e253dbd61298e56fe2f7a7edd2e3f049b4b00e0e530e1c37bf08bbca&=&format=webp&quality=lossless&width=571&height=800",
    "VENANT MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430940303790081/Venant_6.png?ex=69d15e15&is=69d00c95&hm=6924b541708e34799af97dd3c481f08bf47bfa094ded0fbd6aa036ca3b28f960&=&format=webp&quality=lossless&width=571&height=800",
    "VOYAGER WITH THE SHIELD: https://media.discordapp.net/attachments/1211769490547802133/1488430940794388490/Voyager_23.png?ex=69d15e15&is=69d00c95&hm=ce8cc7b4ecc670d17cdda18600465c980622a0a9fa600f123ecc1e3429bba199&=&format=webp&quality=lossless&width=571&height=800",
    "OMEGA MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430919944638474/Omega_2.png?ex=69d15e11&is=69d00c91&hm=66acc8aa388ec569244bc76f3a560df0e81966bc4e229522fcfa91b9ad21c8f2&=&format=webp&quality=lossless&width=571&height=800",
    "QUEBEC MAPPER: https://media.discordapp.net/attachments/1211769490547802133/1488430920573911202/Quebec_30.png?ex=69d15e11&is=69d00c91&hm=a5efdda7219e47c39a5dac11cef8bbd7124fdc05959e94f6e0163ad27cd2a550&=&format=webp&quality=lossless&width=571&height=800",
    "SIIB MAPPING: https://media.discordapp.net/attachments/1211769490547802133/1488430921265844245/Siib_3B.png?ex=69d15e11&is=69d00c91&hm=5972f1d963e7170762c3d88ae14556c930534dc7ad1e57489d89f5595acb9e1d&=&format=webp&quality=lossless&width=571&height=800",
    "SKELETAL MAPPER: https://media.discordapp.net/attachments/1211769490547802133/1488430921907568692/Skeletal_5.png?ex=69d15e11&is=69d00c91&hm=2a53e34733963a75e4b32c879ba0cc959bbdca8430dddc42f1dcbc6db11b49f7&=&format=webp&quality=lossless&width=571&height=800",
    "SKELETAL MAPPER: https://media.discordapp.net/attachments/1211769490547802133/1488430922826256484/Skeletal_30.png?ex=69d15e11&is=69d00c91&hm=1cc826ec17505226931c5f454bc51723a2812a463b6ccb3dce6233b86a0f0614&=&format=webp&quality=lossless&width=571&height=800",
    "SWISS SCENARIOS: https://media.discordapp.net/attachments/1211769490547802133/1488430936449224804/Swiss_3B.png?ex=69d15e14&is=69d00c94&hm=440ab83654b69051861bc8d167496b8d6e5a5091c31ea1fd6d4a8efd6a5388bd&=&format=webp&quality=lossless&width=571&height=800",
    "SWISS SCENARIOS: https://media.discordapp.net/attachments/1211769490547802133/1488430936960794705/Swiss_26.png?ex=69d15e15&is=69d00c95&hm=36ca5f50d5565b6b3fd4389df74cd682910b50e9888c8817bd2e4813d3776fe0&=&format=webp&quality=lossless&width=571&height=800"
  ];
  choices = choices.sort(() => Math.random() - 0.5);
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];
  console.log(randomChoice);
	return randomChoice;
}

async function CommonCard(){
  let choices = ["ACADIA: https://media.discordapp.net/attachments/1133832241051615314/1490419861371883691/Acadia_1B.png?ex=69d3fd29&is=69d2aba9&hm=028656938a7ed53981481cdc9c61c90a2c6dd57d4541cd2208fcd71a2e985d78&=&format=webp&quality=lossless&width=746&height=1046",
                "ACADIA: https://media.discordapp.net/attachments/1133832241051615314/1490419861644382319/Acadia_5B.png?ex=69d3fd29&is=69d2aba9&hm=8dfe4b44b736595839e1bfed99f301184e7f9a63503c4284b4847207d766ad13&=&format=webp&quality=lossless&width=746&height=1046",
                "ACADIA: https://media.discordapp.net/attachments/1133832241051615314/1490419861883453470/Acadia_11.png?ex=69d3fd29&is=69d2aba9&hm=c342e3ed27e6b1d48be147579d7e3b5f90470d1a852672eaf39a114b31b9e51c&=&format=webp&quality=lossless&width=746&height=1046",
                "ACADIA: https://media.discordapp.net/attachments/1133832241051615314/1490419862101692507/Acadia_18.png?ex=69d3fd29&is=69d2aba9&hm=a03d12bb92a2ce8de36947015d023888a40e622ef90541caa2fdac876cfb0c16&=&format=webp&quality=lossless&width=746&height=1046",
                "AMERICAN: https://media.discordapp.net/attachments/1133832241051615314/1490419862663594047/American_15.png?ex=69d3fd29&is=69d2aba9&hm=e38dbaa108464741139a7a77e509866a51d7b05eb318c8798148b74eaf0703e5&=&format=webp&quality=lossless&width=746&height=1046",
                "AMERICAN: https://cdn.discordapp.com/attachments/1375498975880151171/1493165834921705562/American_17.png?ex=69ddfa8c&is=69dca90c&hm=08a49f34e87f435d00f82fb3ea33ef457496a0914cf56f4cabb5ef38a57d75a9&",
                "AMERICAN: https://media.discordapp.net/attachments/1133832241051615314/1490419863246606556/American_23.png?ex=69d3fd2a&is=69d2abaa&hm=272896c75a0719834efc2921593f832391420c86dd8e6c2ed9be59bae3bf0f84&=&format=webp&quality=lossless&width=746&height=1046",
                "AMERICAN: https://media.discordapp.net/attachments/1133832241051615314/1490419863536009226/American_29.png?ex=69d3fd2a&is=69d2abaa&hm=d30c8ebd28ed240f327ad03205cb2e36465a230a93d15f4882e0eeb0cdef21ad&=&format=webp&quality=lossless&width=746&height=1046",
                "ARNE: https://media.discordapp.net/attachments/1133832241051615314/1490419863821484092/Arne_28.png?ex=69d3fd2a&is=69d2abaa&hm=fc5fcbda93c8c168be8ae8b686f774bae6dc62a783c003aeb92a4ee875d2ed4b&=&format=webp&quality=lossless&width=746&height=1046",
                "COLONIAL: https://cdn.discordapp.com/attachments/1211769490547802133/1494466839059763403/image.png?ex=69e2b634&is=69e164b4&hm=ab15b3e73adf05dfe172920732712a5b10bf3638ea08c9338766f5336845cc88",
                "DOM: https://media.discordapp.net/attachments/1133832241051615314/1490421164978475038/Dom_2B.png?ex=69d3fe60&is=69d2ace0&hm=f090a75620aeb8c5a55fa7edbd37f2c3e2998cf8f5a71ca4fd821302d0c48a53&=&format=webp&quality=lossless&width=746&height=1046",
                "DOM: https://media.discordapp.net/attachments/1133832241051615314/1490421165435388136/Dom_19.png?ex=69d3fe60&is=69d2ace0&hm=4355c6df116838d785f880c76847dd27fd7c1766701108e9dceccee3c7406cc2&=&format=webp&quality=lossless&width=746&height=1046",
                "DOM: https://media.discordapp.net/attachments/1133832241051615314/1490421166157070376/Dom_20.png?ex=69d3fe60&is=69d2ace0&hm=5a7a858e3ffa4c6970ea8d8b0682ec284f3b23c6a630b77cd772cd3d781347d9&=&format=webp&quality=lossless&width=746&height=1046",
                "DOOM: https://media.discordapp.net/attachments/1133832241051615314/1490421166609793205/Doom_12.png?ex=69d3fe60&is=69d2ace0&hm=ae2e86178006afb64a614da36862b2470c33fda44a7c075e0bd8d691048846ac&=&format=webp&quality=lossless&width=746&height=1046",
                "DOOM: https://cdn.discordapp.com/attachments/1133832241051615314/1490421243751698553/Doom_17.png?ex=69d3fe73&is=69d2acf3&hm=2664dcd84bec84be9a190170cef898973198a53ebc9caa2e3459d28245ef7909&",
                "DOOM: https://cdn.discordapp.com/attachments/1133832241051615314/1490421244032454707/Doom_19.png?ex=69d3fe73&is=69d2acf3&hm=af18d8a4b966300be4a1d45ce821b97dfb7c9a1025d8b5e0279dcbeb57aa087a&",
                "DUAL BELGIUM: https://cdn.discordapp.com/attachments/1133832241051615314/1490421244275982366/Dual_Belgium_2B.png?ex=69d3fe73&is=69d2acf3&hm=074b7e29b1f5beb1c3ef500c54a326d587e55b42240a961bdabf864f79687414&",
                "DUAL BELGIUM: https://media.discordapp.net/attachments/1133832241051615314/1490421244515061983/Dual_Belgium_3.png?ex=69d3fe73&is=69d2acf3&hm=20877f651388e0f62b09d6d1c4e4b9319e98da1cd7c277b5fc50eca5ca8b6bfa&=&format=webp&quality=lossless&width=746&height=1046",
                "FABOOMKO: https://media.discordapp.net/attachments/1133832241051615314/1490421244732903577/Faboomko_14.png?ex=69d3fe73&is=69d2acf3&hm=0d6783488c28a7ca19bb2d93f4d21667fef0a9ff15140fd55f05ae7508cab8b6&=&format=webp&quality=lossless&width=746&height=1046",
                "FABOOMKO: https://media.discordapp.net/attachments/1211769490547802133/1490413710710407360/Faboomko_20.png?ex=69df2c2f&is=69dddaaf&hm=eb5b291539677ebc29d80256303e3a1bc8f7edeb73b3272ca6382b2b661d72a3&=&format=webp&quality=lossless&width=571&height=800",
                "FLORIDA: https://media.discordapp.net/attachments/1133832241051615314/1490421245223632916/Florida_5B.png?ex=69d3fe73&is=69d2acf3&hm=0dc0ae802bf7bc5b2107863ac101d48767b6d1a5a4fdfb457f5aa56f9aef10d0&=&format=webp&quality=lossless&width=746&height=1046",
                "FRKON: https://cdn.discordapp.com/attachments/1133832241051615314/1490421245492330606/Frkon_13.png?ex=69d3fe73&is=69d2acf3&hm=a82fc80e3b159bd2a2a938b51dae10e0b2d90746f131e5ebaf9b058d8d72818b&",
                "GREENBALL ANTI-MAPPING: https://cdn.discordapp.com/attachments/1375498975880151171/1494477279928127569/GreenBall_17.png?ex=69e2bfed&is=69e16e6d&hm=823c30ff781e95329e6e95b1f8b318a288a668303ff0b8c8202e688b3fa59de4&",
                "GREENBALL ANTI-MAPPING: https://cdn.discordapp.com/attachments/1375498975880151171/1494477281094140065/GreenBall_6.png?ex=69e2bfed&is=69e16e6d&hm=3b1da3ffb98fbf4f36b4356b1281fa46505cc98c8d25b0c5616e3f28793b798e&",
                "GULF STREAM: https://media.discordapp.net/attachments/1133832241051615314/1490421245764964533/Gulfstream_30.png?ex=69d3fe73&is=69d2acf3&hm=d933ac2acf1c248720dcde8ca97f5c56e7b69854eb33f105c755bf96c7f53f05&=&format=webp&quality=lossless&width=746&height=1046",
                "HOLY SEALANDIC: https://media.discordapp.net/attachments/1133832241051615314/1490421246062624919/Holy_Sealandic_6.png?ex=69d3fe73&is=69d2acf3&hm=cab0a77a28e4c011ba191d0afa28757f18639d772e2c35679834bcd9246a150f&=&format=webp&quality=lossless&width=746&height=1046",
                "HOLY SEALANDIC: https://media.discordapp.net/attachments/1133832241051615314/1490421361657512047/Holy_Sealandic_17.png?ex=69d3fe8f&is=69d2ad0f&hm=a40f29f620cc33901f6986fcdb0036314fd00616646129fd9bfe18eeae61feb5&=&format=webp&quality=lossless&width=746&height=1046",
                "HOLY SEALANDIC: https://cdn.discordapp.com/attachments/1133832241051615314/1490421361913626855/Holy_Sealandic_22.png?ex=69d3fe8f&is=69d2ad0f&hm=ab66d9fd11461c80ed66e25d5f7c636bf8d29641bf7fb01e1c1c36f5a0109825&",
                "INTERFLUX: https://media.discordapp.net/attachments/1133832241051615314/1490421362194518208/Interflux_3.png?ex=69d3fe8f&is=69d2ad0f&hm=31ed7476b01eeb3a0c347675c8384b2a11a5ed607cac29d8d88bc9f91b000f3c&=&format=webp&quality=lossless&width=746&height=1046",
                "INTERFLUX: https://media.discordapp.net/attachments/1133832241051615314/1490421362479726632/Interflux_6.png?ex=69d3fe8f&is=69d2ad0f&hm=9d14c5ef46fb56287feea0ea8115f40e7eec0b2a42625faba7cf6edb21c39e8e&=&format=webp&quality=lossless&width=746&height=1046",
                "INTERFLUX: https://media.discordapp.net/attachments/1133832241051615314/1490421362878320721/Interflux_12.png?ex=69d3fe8f&is=69d2ad0f&hm=6d1dc3b4078d11c4cbd49c77fc9bcf502ab5a8922a7cd07f1a4a396cc9c0a5f0&=&format=webp&quality=lossless&width=746&height=1046",
                "INTERFLUX: https://cdn.discordapp.com/attachments/1133832241051615314/1490421363188568094/Interflux_21.png?ex=69d3fe8f&is=69d2ad0f&hm=64c66ebfc2398174385995cd5ba52ff3ca45d87d30aebe50a9b63af8c47f1318&",
                "INTERFLUX: https://media.discordapp.net/attachments/1133832241051615314/1490421363582963742/Interflux_27.png?ex=69d3fe8f&is=69d2ad0f&hm=fcbc425b1ad40d3449f07b7135123c97718166f584aba0fe3e41548acf98607b&=&format=webp&quality=lossless&width=746&height=1046",
                "KYIV: https://media.discordapp.net/attachments/1133832241051615314/1490421364056658050/Kyiv_12.png?ex=69d3fe8f&is=69d2ad0f&hm=3af9909bee9eb84bdffbc503f84f5df29278688eaa2f1647c7bec729c3fc2eff&=&format=webp&quality=lossless&width=746&height=1046",
                "LASER KIWI: https://media.discordapp.net/attachments/1133832241051615314/1490421364388270300/Lazer_Kiwi_13.png?ex=69d3fe8f&is=69d2ad0f&hm=ffbaf4771d8c9c4fb8301d8ddf57f5d9828295fc0a9548928986e7c9e5c6f4d4&=&format=webp&quality=lossless&width=746&height=1046",
                "LINEARIS: https://media.discordapp.net/attachments/1133832241051615314/1490421364794855638/Linearis_13.png?ex=69d3fe90&is=69d2ad10&hm=5396679e21a1b77bda3b01e830cb5490267d74c874054dae17dd03aa4df0051f&=&format=webp&quality=lossless&width=746&height=1046",
                "MINKES: https://media.discordapp.net/attachments/1133832241051615314/1490421402631798844/Minkes_2B.png?ex=69d3fe99&is=69d2ad19&hm=3364caf3e8848528aeca90ca253dac2e2b54eac9170e4c3fec6298ed70c7bb88&=&format=webp&quality=lossless&width=746&height=1046",
                "MINKES: https://media.discordapp.net/attachments/1133832241051615314/1490421402925273228/Minkes_10.png?ex=69d3fe99&is=69d2ad19&hm=842c263f09739ec6927308f69b52f54827571b0b88dcc35916e3a3963bc17945&=&format=webp&quality=lossless&width=746&height=1046",
                "MINKES: https://media.discordapp.net/attachments/1133832241051615314/1490421403227390094/Minkes_13.png?ex=69d3fe99&is=69d2ad19&hm=bccf877a328317496fd9c95bb0d6d42749330286b87dc52c1a5281e409df2c67&=&format=webp&quality=lossless&width=746&height=1046",
                "NABY: https://media.discordapp.net/attachments/1133832241051615314/1490421403491766302/Naby_1B.png?ex=69d3fe99&is=69d2ad19&hm=d7a8068fe61dda548b2429afa040e54f3a7db619ef6326e93b3e4b5bf9c41198&=&format=webp&quality=lossless&width=746&height=1046",
                "NABY: https://media.discordapp.net/attachments/1133832241051615314/1490421403713802315/Naby_19.png?ex=69d3fe99&is=69d2ad19&hm=44a3ba527ec32b4467106385978b16cc3d4edfdd46216605878859467c8e9b77&=&format=webp&quality=lossless&width=746&height=1046",
                "NABY: https://media.discordapp.net/attachments/1133832241051615314/1490421404024312000/Naby_21.png?ex=69d3fe99&is=69d2ad19&hm=6145f0114a1b9db3f242e714c4c5fec560468d0a22116a2b1ff71a7fbc11b182&=&format=webp&quality=lossless&width=746&height=1046",
                "NABY: https://cdn.discordapp.com/attachments/1375498975880151171/1494475177000570900/Naby_2B.png?ex=69e2bdf8&is=69e16c78&hm=58c0e4ca22fbe435d54184aabdef1d3f0f75988be1218299d04b118f72d5d14c&",
                "OMEGA: https://media.discordapp.net/attachments/1133832241051615314/1490421404418707638/Omega_3.png?ex=69d3fe99&is=69d2ad19&hm=7a9276e5ffb76a14005de00f6cd9e89fe8bdc565fdf6c03000392856323a41b7&=&format=webp&quality=lossless&width=746&height=1046",
                "OMEGA: https://media.discordapp.net/attachments/1133832241051615314/1490421404691333172/Omega_13.png?ex=69d3fe99&is=69d2ad19&hm=1273c9dcffbd2166b292d89ed61951dc39ad3950cbc3a75d5ed1b298e382857b&=&format=webp&quality=lossless&width=746&height=1046",
                "ROYAL: https://media.discordapp.net/attachments/1133832241051615314/1490421404938666134/Royal_4.png?ex=69d3fe99&is=69d2ad19&hm=64e1bfbe1ca6ebf5d84c5d0380c1b32aa1c52da0601af2abe5056cab46c08bb6&=&format=webp&quality=lossless&width=746&height=1046",
                "ROYAL: https://media.discordapp.net/attachments/1133832241051615314/1490421405177876582/Royal_12.png?ex=69d3fe99&is=69d2ad19&hm=0a051044259b77059be77436a3c4388c396d56b6926dfc3ba22e6c8438c3c288&=&format=webp&quality=lossless&width=746&height=1046",
                "ROYAL: https://cdn.discordapp.com/attachments/1375498975880151171/1494475178170912948/Royal_16.png?ex=69e2bdf8&is=69e16c78&hm=324e1eeffca23fa4301956c5978d4cdf951b1e72941d57942a9773648c8d77e0&",
                "SIIB: https://media.discordapp.net/attachments/1133832241051615314/1490421450853847140/Siib_20.png?ex=69d3fea4&is=69d2ad24&hm=086ad48430e67da1af97d7d11bc801f718504daebdddddc48b96878878c7f279&=&format=webp&quality=lossless&width=746&height=1046",
                "SIMPLE: https://media.discordapp.net/attachments/1133832241051615314/1490421451235266771/Simple_5.png?ex=69d3fea4&is=69d2ad24&hm=f42cfe12f5d129748cadfb3e5e6d5f6d309dee13247e5a1ed8df228f4b716bce&=&format=webp&quality=lossless&width=746&height=1046",
                "SIMPLE: https://media.discordapp.net/attachments/1133832241051615314/1490421451717607555/Simple_13.png?ex=69d3fea4&is=69d2ad24&hm=53fa87b4f6e33b869b65b1046207af114fce51310c5b8edd8b358f8b5bb128f1&=&format=webp&quality=lossless&width=746&height=1046",
                "SWISS: https://media.discordapp.net/attachments/1133832241051615314/1490421452061802506/Swiss_14.png?ex=69d3fea4&is=69d2ad24&hm=c2a00bf9c41aa00104a04f546df40be3162c13e4bb707d7470f25886c6f10217&=&format=webp&quality=lossless&width=746&height=1046",
                "TETNO: https://cdn.discordapp.com/attachments/1133832241051615314/1490421452653203556/Tetno_5B.png?ex=69d3fea5&is=69d2ad25&hm=6eef305ca247f7f7f51dba84a17b15d2c1bab28eab2f9f99395991283657720a&",
                "TETNO: https://media.discordapp.net/attachments/1133832241051615314/1490421453194006548/Tetno_9.png?ex=69d3fea5&is=69d2ad25&hm=ba383d2d1cc73cd00a3cd8e0e76f972af90f9ad632b1715079ae3d8bd613f8e4&=&format=webp&quality=lossless&width=746&height=1046",
                "TETNO: https://media.discordapp.net/attachments/1133832241051615314/1490421453819220159/Tetno_18.png?ex=69d3fea5&is=69d2ad25&hm=c947ded55ae770b0c819c4ae70d3ca90e27f57607e33f14dcc29fe7f72097557&=&format=webp&quality=lossless&width=746&height=1046",
                "ARUX: https://media.discordapp.net/attachments/1133832241051615314/1490421100784521296/Arux_2B.png?ex=69d3fe51&is=69d2acd1&hm=23766f433bfaad23fa0aa01f6f2860267be1c01bde5a22425ae8fe2eb5fe825d&=&format=webp&quality=lossless&width=746&height=1046",
                "ARUX: https://media.discordapp.net/attachments/1133832241051615314/1490421101048627312/Arux_4B.png?ex=69d3fe51&is=69d2acd1&hm=781b558641df560d7f3cf33e27c0de17ab422814eeb5324e94c23fbc66654979&=&format=webp&quality=lossless&width=746&height=1046",
                "ARUX: https://media.discordapp.net/attachments/1133832241051615314/1490421101304742048/Arux_21.png?ex=69d3fe51&is=69d2acd1&hm=99fbdd0e478bd1707b998279d03acf23a67d8ff3887853de8e4527c6cc3253c7&=&format=webp&quality=lossless&width=746&height=1046",
                "ARUX GM26 [Common]",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421101547884784/Azalea_2B.png?ex=69d3fe51&is=69d2acd1&hm=9436c450c9d7f7d0ac8d949c596eeb76c22a95e690f8abe9d930fcc7726df819&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421101765853404/Azalea_3B.png?ex=69d3fe51&is=69d2acd1&hm=6b2538401c62e81d2b5bbdc4110e4d31f53e07a9606c56c19509acd3e74b04ea&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421101992607974/Azalea_5B.png?ex=69d3fe51&is=69d2acd1&hm=0009492a8eaad8ce70b7288749deca783ea9999236c22ef90b1d1a6944bd5df3&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421102235750470/Azalea_6.png?ex=69d3fe51&is=69d2acd1&hm=284e53203162e88f3698255de1d2e7cd17223654d02dcb68c50b58444f220f5c&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421102432747640/Azalea_12.png?ex=69d3fe51&is=69d2acd1&hm=6c251e8669d2e64771e777568f8648457642a20bfdc64ca317a54d445e188fe9&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421102701445140/Azalea_13.png?ex=69d3fe51&is=69d2acd1&hm=8174d1ae02c4f9aead3b701262baa6d6c4292b3bdf0c3a49167a37a952e3ac39&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421102932005036/Azalea_17.png?ex=69d3fe51&is=69d2acd1&hm=aa448187c6e73000264e9350fd99ec99a37d6d8041d8e77361d0323c94ec682e&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421161727758417/Azalea_19.png?ex=69d3fe5f&is=69d2acdf&hm=1de2a7194a8c62f5340f0edd034a1186d350c40d6c2320540e47a7e121a56905&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421162033807550/Azalea_GM2.png?ex=69d3fe5f&is=69d2acdf&hm=89533f422fac22cb31a210fa9c9a59b94bb091f1444f4052a7dfd4e2d8c93744&=&format=webp&quality=lossless&width=746&height=1046",
                "AZALEA: https://media.discordapp.net/attachments/1133832241051615314/1490421162516287689/Azalea_GM4.png?ex=69d3fe5f&is=69d2acdf&hm=ccd9524a4271f07cc2b86390ad84547df8f94c20fb0b98f84174091f54a98a53&=&format=webp&quality=lossless&width=746&height=1046",
                "CHERI: https://media.discordapp.net/attachments/1133832241051615314/1490421162977526023/Cheri_7.png?ex=69d3fe5f&is=69d2acdf&hm=f36514dd16d32558bbcbb477e171663694d6369fedc96195cf7de1ebde7e4b4c&=&format=webp&quality=lossless&width=746&height=1046",
                "COLONIAL: https://media.discordapp.net/attachments/1133832241051615314/1490421163606802665/Colonial_GM5.png?ex=69d3fe60&is=69d2ace0&hm=b1aa58f1885bc267783d2a9837ab19cb320c257b585b78da9f36c8647a7a65ad&=&format=webp&quality=lossless&width=746&height=1046",
                "VENANT: https://media.discordapp.net/attachments/1133832241051615314/1490421454259486816/Venant_1.png?ex=69d3fea5&is=69d2ad25&hm=fb5fe48accd99095a3e425bf3021ba5ed316499b04c0ddd21b96aadf7a8c6822&=&format=webp&quality=lossless&width=746&height=1046",
                "VENANT: https://media.discordapp.net/attachments/1133832241051615314/1490421454737510622/Venant_18.png?ex=69d3fea5&is=69d2ad25&hm=ea7d87aecb6730d9830b835ec5e2e2be8a0952a4c803ee438340029160232459&=&format=webp&quality=lossless&width=746&height=1046",
                "VENANT GM2 [Common]",
                "VOYAGER: https://cdn.discordapp.com/attachments/1133832241051615314/1490421455157203026/Voyager_3B.png?ex=69d3fea5&is=69d2ad25&hm=3b1f1d89e70094e03718be3d3227eace2de69d105e4496db51ccf59bd443a283&"
                ];
  choices = choices.sort(() => Math.random() - 0.5);
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];
  console.log(randomChoice);
	return randomChoice;
}


// bar is here - this is has all the people based commands (lousiana, briswall, siib, dom, arux, etc.) AND GMecon is the economy stuff
client.on("message", (message) => {
  let Message = new ListCommand(message.content);
  let result = Message.readCommand();
  for (let i = 0; i < result.length; i++) {
    message.channel.send(result[i]);
  }

});

//The memes and quotes and SillyArray stuff CONDENSED
client.on("message", (message) => {
    if (
      message.content === "!gm meme" ||
      message.content === "!gm silly" ||
      message.content === "!gm quote" ||
      message.content === "!gm greenadvice"
    ) {
      let Message = new ListCommand(message.content);
      let result = Message.readMemQuote();
      message.channel.send(result);
  
      if (message.content === "!gm greenadvice") {
        message.channel.send(
          "https://cdn.discordapp.com/attachments/1133151324259750059/1357894061377327225/attachment.gif?ex=67f1dce4&is=67f08b64&hm=4bfb9f42fd4b1ab0cec18a4905887386cd479a83ddb5c838efd5800b0f55329f&"
        );
        message.channel.send("<:Award_Greenball_s21:1391471889439789056>");
      }
    }

    if (message.content === "!gm loopsilly"){
      if (!message.author.id === "532331889655152642"){
        return message.channel.send("Only Faboomko can use this command to check what is in gm silly when coding.");
      }
      let Silly = new StringArray();
      let sillyarray = Silly.getSilly();
      for (let i = 0; i < sillyarray.length; i++){
        message.channel.send("the string: `"+sillyarray[i]+"`");
        message.channel.send(sillyarray[i]);
      }
      message.channel.send("LOOP IS FINISHED!!");
    }
  });

// help command list
const page1 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 1)")
  .setDescription("Here are the available commands (Page 1):")
  .addFields(
    { name: "!gm help", value: "Shows this help message and list of commands" },
    {
      name: "!gm playerhelp",
      value: "Shows list of commands for PLAYERS in GM29!",
    },
    {
      name: "!gm prodhelp",
      value: "Shows list of commands for producers/admin",
    },
    {
      name: "!gm econhelp",
      value: "Shows list of commands for Grand Mapper's economy system",
    },
    {
      name: "!gm shower",
      value: "Take a shower you Discord degenerate (do !gm showerlb to see the leaderboard)",
    },
    { name: "!gm oog", value: "Oog" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page3 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 3)")
  .setDescription("Here are the available commands (Page 3):")
  .addFields(
    { name: "!gm siib", value: "Siibb" },
    { name: "!gm faboomko", value: "FaBOOMko" },
    { name: "!gm kame", value: "KAMEPIN" },
    { name: "mapping", value: "I HATE MAPPING!!" },
    { name: "!gm horror", value: "Get spooked!" },
    { name: "!gm inspire", value: "Inspiring quotes from gm players" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page4 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 4)")
  .setDescription("Here are the available commands (Page 4):")
  .addFields(
    { name: "!gm komi", value: "Arux's true love" },
    { name: "!gm louisiana", value: "Louisiana mapper" },
    { name: "!gm frank", value: "The REAL Frank Sinatra" },
    { name: "!gm greenball", value: "GREENBALL" },
    { name: "!gm spacor", value: "GMprod and GM32 player" },
    { name: "!gm naby", value: "New Abyssinia Mapping 5310" },
    { name: "!gm hexor", value: "LONG LIVE THE PEOPLE'S REPUBLIC OF CHINA (also GM32, GM34 player)" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page5 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 5)")
  .setDescription("Here are the available commands (Page 5):")
  .addFields(
    { name: "!gm ar55", value: "Ar55, winner of GM34" },
    { name: "!gm phil", value: "PHILLL" },
    { name: "!gm archipel", value: "indonesia's #1 fan"},
    { name: "!gm odelia", value: "biggest gm floater"},
    { name: "!gm austro", value: "Infamous GM cheater in GM33 and GM34" },
    { name: "!gm uhh", value: "UhhStraalis" },
    { name: "!gm burg", value: "Burgenti!!" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page2 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 2)")
  .setDescription("Here are the available commands (Page 2):")
  .addFields(
    { name: "!gm meme", value: "Get a random Grand Mapper meme" },
    {
      name: "!gm silly",
      value: "Screenshots of silly moments in Grand Mapper",
    },
    {
      name: "!gm quote",
      value:
        "Get a random phase quote from a Grand Mapper season \n (Credit to Eoem for the idea)",
    },
    { name: "!gm greenadvice", value: "Get Greenball's AMAZING life advice" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

let currentPage = 0; // Start from the first page
const pages = [page1, page2, page3, page4, page5];

client.on("message", async (message) => {
  if (message.content === "!gm help") {
    // Create the buttons for page navigation
    const prevButton = new MessageButton()
      .setCustomId("prev")
      .setLabel("Previous")
      .setStyle("PRIMARY")
      .setDisabled(currentPage === 0); // Disable if on first page

    const nextButton = new MessageButton()
      .setCustomId("next")
      .setLabel("Next")
      .setStyle("PRIMARY")
      .setDisabled(currentPage === pages.length - 1); // Disable if on last page

    const actionRow = new MessageActionRow().addComponents(
      prevButton,
      nextButton
    );

    // Send the first page with buttons
    const sentMessage = await message.channel.send({
      embeds: [pages[currentPage]],
      components: [actionRow],
    });

    // Create an interaction collector to listen for button clicks
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = sentMessage.createMessageComponentCollector({
      filter,
      time: 60000, // 1 minute timeout
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "prev" && currentPage > 0) {
        currentPage--;
      } else if (
        interaction.customId === "next" &&
        currentPage < pages.length - 1
      ) {
        currentPage++;
      }

      // Update the embed and buttons
      const updatedEmbed = pages[currentPage];
      prevButton.setDisabled(currentPage === 0);
      nextButton.setDisabled(currentPage === pages.length - 1);

      await interaction.update({
        embeds: [updatedEmbed],
        components: [
          new MessageActionRow().addComponents(prevButton, nextButton),
        ],
      });
    });

    collector.on("end", () => {
      // Disable buttons after timeout
      prevButton.setDisabled(true);
      nextButton.setDisabled(true);
      sentMessage.edit({
        components: [
          new MessageActionRow().addComponents(prevButton, nextButton),
        ],
      });
    });
  }
});

//helpcommands and !gm give by prods, and wyatt's shard too
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
    
  if (message.guild.id === "1375496972705988628") { // GM server
  const execprodRole = "1375504548495622266";
  const hostRole = "1375496972882153474";
  const ALARM_CHANNEL_ID = "1387119150593478707";

  if (message.content.startsWith("!gm alarm")) {
    // Role check
    if (
      !message.member.roles.cache.has(hostRole) &&
      !message.member.roles.cache.has(execprodRole)
    ) {
      return message.reply("❌ You cannot run that command because you are not an Executive Producer or Host.");
    }
    // Ask for time
    await message.reply(
      "**⏰ How many minutes from now do you want the alarm to go off?**\n" +
      "Example: `120m` (2 hours)"
    );
    // Collector filter (only command user)
    const filter = m => m.author.id === message.author.id;

    let timeCollected;
    try {
      timeCollected = await message.channel.awaitMessages({
        filter,
        max: 1,
        time: 60000,
        errors: ["time"]
      });
    } catch {
      return message.reply("❌ Timed out. Please run the command again.");
    }

    const timeInput = timeCollected.first().content.toLowerCase();

    // Validate format like 120m
    const match = timeInput.match(/^(\d+)m$/);
    if (!match) {
      return message.reply("❌ Invalid format. Please use something like `120m`.");
    }

    const minutes = parseInt(match[1]);
    if (minutes <= 0) {
      return message.reply("❌ Time must be greater than 0 minutes.");
    }

    const delayMs = minutes * 60 * 1000;

    // Ask for alarm message
    await message.reply("📝 **What message should the alarm send?**");

    let msgCollected;
    try {
      msgCollected = await message.channel.awaitMessages({
        filter,
        max: 1,
        time: 60000,
        errors: ["time"]
      });
    } catch {
      return message.reply("❌ Timed out. Please run the command again.");
    }

    const alarmMessage = msgCollected.first().content;

    // Confirmation
    await message.reply(
      `✅ Alarm set!\n` +
      `⏱ **Time:** ${minutes} minutes\n` +
      `📢 **Message:** ${alarmMessage}`
    );

    // Schedule alarm
    setTimeout(async () => {
      const alarmChannel = message.guild.channels.cache.get(ALARM_CHANNEL_ID);
      if (!alarmChannel) return;

      alarmChannel.send(
        `⏰ **ALARM** ⏰\n` +
        `Set by **${message.author.username}**\n\n` +
        `${alarmMessage}\n` + `<@&1375496972882153473>`
      );
    }, delayMs);
  }
}

  if (message.guild.id === "1267283216734097539") { //shard  command for wyatt server but test server id for now
    if (message.content.includes("!shard")){
      let prodrole = "1333782183415906387"; //change id for this later, just for test server
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
    //await Wyattcomp.shardcommand(message);
  }

  if (!message.content.startsWith("!gm")) return;

  const args = message.content.slice("!gm".length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  if (["prodhelp", "playerhelp", "econhelp", "econ-help"].includes(commandName)) {
    const helpcommands = require("./HelpCommands.js");
    await helpcommands.execute(message, [commandName, ...args]);
  }

  let prodrole = "0";
  let grandMapper = false;
  if (message.guild.id === "1131317607539167234") {
    //GRAND MAPPER
    prodrole = "1146413264650125342";
    grandMapper = true;
  }
  
});
//!gm register
const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join("./competitionInfo.json");
function loadData() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
async function registerCommand(message) {
  const guildId = message.guild.id;
  const data = loadData();

  if (!data[guildId]) {
    return message.reply("❌ This server is not initialized in the system.");
  }

  await message.reply(
    "**Paste the ID of the player you are registering, then the name of the player.**\n" +
    "Example:\n`742315220713603186 Almond`" + "\n MAKE SURE TO NAME THE PLAYER THE SAME FORMAT AS THE EMOJI!"
  );

  const filter = m => m.author.id === message.author.id;

  let collected;
  try {
    collected = await message.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000,
      errors: ["time"]
    });
  } catch {
    return message.reply("❌ Timed out. Registration cancelled.");
  }

  const input = collected.first().content.trim();
  const parts = input.split(/ +/);

  if (parts.length < 2) {
    return message.reply("❌ Invalid format. Use: `ID Name`");
  }

  const playerId = parts[0];
  const name = parts.slice(1).join(" ");

  if (!/^\d+$/.test(playerId)) {
    return message.reply("❌ Player ID must be numeric.");
  }

  if (data[guildId][playerId]) {
    return message.reply("❌ That player is already registered.");
  }

  // ✅ ADD PLAYER WITHOUT TOUCHING CONSTANT FIELDS
  data[guildId][playerId] = name;

  saveData(data);

  return message.reply(
    `✅ **Player Registered!**\n` +
    `🆔 ID: ${playerId}\n` +
    `👤 Name: ${name}`
  );
}

//!gm clear
async function clearCommand(message) {
  const guildId = message.guild.id;
  const data = loadData();

  if (!data[guildId]) {
    return message.reply("❌ This server is not initialized.");
  }

  await message.reply(
    "⚠️ **WARNING** ⚠️\n" +
    "This will **permanently remove ALL registered players** for this server.\n" +
    "_(Usually done after a season ends)_\n\n" +
    "Type **CONFIRM** to continue, or anything else to cancel."
  );

  const filter = m => m.author.id === message.author.id;

  let collected;
  try {
    collected = await message.channel.awaitMessages({
      filter,
      max: 1,
      time: 30000,
      errors: ["time"]
    });
  } catch {
    return message.reply("❌ Timed out. Clear operation cancelled.");
  }

  if (collected.first().content !== "CONFIRM") {
    return message.reply("❌ Clear cancelled. No players were removed.");
  }

  const fixedKeys = new Set([
    "name",
    "guildID",
    "adminRoleID",
    "playerRoleID",
    "judgeChannelID"
  ]);

  let removed = 0;

  for (const key of Object.keys(data[guildId])) {
    if (!fixedKeys.has(key)) {
      delete data[guildId][key];
      removed++;
    }
  }

  saveData(data);

  return message.reply(
    `🧹 **Season Reset Complete**\n` +
    `Removed **${removed} player${removed === 1 ? "" : "s"}** from the registry.`
  );
}

// VERIFY section
client.on("message", (message) => {
  if (message.content.includes("!gm verify")) {
    let ALLOWED_ROLE_ID = "0";
    let memberRoleId;
    let immigrantRoleId;
    let verifydone = false;

    if (message.guild.id === "1304251077041979472") {
      //Felinia's server
      ALLOWED_ROLE_ID = "1304557666219327560";
    }
    if (message.guild.id === "1131317607539167234") {
      //GRAND MAPPER 3.0
      ALLOWED_ROLE_ID = "1146413264650125342";
      memberRoleId = "1131319835394064454"; // Member role in GRAND MAPPER
      immigrantRoleId = "1206728930581676083"; //Immigrant role in GRAND MAPPER
      verifydone = true;
    }
    if (message.guild.id === "1375496972705988628") {
      //GRAND MAPPER 4.0
      ALLOWED_ROLE_ID = "1375496972882153473";
      memberRoleId = "1375496972827365490"; // Member role in GRAND MAPPER
      immigrantRoleId = "1387922848407879750"; //Immigrant role in GRAND MAPPER
      verifydone = true;
    }
    if (message.guild.id === "1347075302790008832") {
      //GMBot test server
      ALLOWED_ROLE_ID = "1349214817139036241";
    }
    if (message.guild.id === "1233455138384121887") {
      //Veifli comp server
      ALLOWED_ROLE_ID = "1233913378343223358";
      immigrantRoleId = "1360208034558906499";
      memberRoleId = "1233914525753806888";
      verifydone = true;
    }

    if (!verifydone)
      return message.reply(
        "Verify command has not been initialized yet in this server."
      );

    if (
      !message.member.roles.cache.has(ALLOWED_ROLE_ID) &&
      !message.author.bot
    ) {
      // person using the command is NOT a prod/admin
      return message.reply(
        "You don't have permission to use the verify command."
      );
    } else {
      const args = message.content.trim().split(/ +/g); // splits by spaces
      // Check if user mentioned
      const verifytargetUser = message.mentions.members.first();

      if (!verifytargetUser)
        return message.reply(
          "You need to mention a user to verify them! Usage: `!gm verify @user`"
        );

      if (verifytargetUser.roles.cache.has(memberRoleId)) {
        return message.reply(
          "Bruh that person is already a verified member 🗿"
        );
      } else {
        verifytargetUser.roles.remove(immigrantRoleId);
        console.log(`Removed immigrant role from ${verifytargetUser.user.tag}`);
        verifytargetUser.roles.add(memberRoleId);
        console.log(`Added member role to ${verifytargetUser.user.tag}`);
        return message.reply("**The user has been verified.**");
      }
    }
  }
});

client.login(
  "x" //without bot id cuz discord will do 1984 if it is here
); 

