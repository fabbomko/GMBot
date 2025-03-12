const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Submission = require("./Submission.js");
const Competition = require("./Competition.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, // Only needed for reactions
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.MESSAGE_CONTENT // If bot reads messages
  ],
});

client.once("ready", () => {
  console.log("GMBot is Online!");
});
//client.on("message", message => {
//if (message.content === "ping"){
//message.channel.send("pong")
//}
//})
client.on("message", (message) => {
  if (message.content === "mapping") {
    message.channel.send("I HATE MAPPING");
  }
});

client.on("message", (message) => {
  if (message.content === "Happy Birthday" || message.content === "happy birthday" || message.content === "happy bday") {
    message.channel.send("HAPPY BIRTHDAY!!! 🥳🎂");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm") {
    message.channel.send("oog give me a command");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm dom") {
    message.channel.send("IsBored");
    message.channel.send("<:player_DomIsBored:1347673875952959600>")
  }
});

client.on("message", (message) => {
  if (message.content === "!gm greenball") {
    message.channel.send("WE LOVE GREENBALL!!");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm kame") {
    message.channel.send("Slava Ukraini! 🇺🇦");
  }
});


client.on("message", (message) => {
  if (message.content === "!gm horror") {   message.channel.send("https://cdn.discordapp.com/attachments/766759322674790401/1342505766078255123/image.png?ex=67c7b92d&is=67c667ad&hm=f9519b60ac061ee1ef5134908f662340c140e933bda0f0fd7e2b02644d91eec2&");
  }
});

client.on("message", (message) => {
  if (message.content === "shiver me timbers") {
    message.channel.send("I AM A PIRATE AAARGHHH!!");
  }
});

client.on("message", (message) => {
  if (message.content === "stycko") {
    message.channel.send("Rip Stycko, gone too soon 😔");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm siib") {
    message.channel.send("THE GOAT!!");
    message.channel.send("<:Winner_Siib:1292555266310668400>");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm komi") {
    message.channel.send("https://tenor.com/view/komi-san-komi-shouko-komi-shouko-comi-san-gif-23012202?quality=lossless");
  }
});

//get random meme
const choices = ['https://cdn.discordapp.com/attachments/1131317608818421790/1272244430165774537/caption.gif?ex=67c7e035&is=67c68eb5&hm=92f4be2f8da797661801f55772c5084481d21a0da1c81581854f7921cdea1106&', 'https://cdn.discordapp.com/attachments/1131317608818421790/1316060532477923448/IMG_2075.png?ex=67c7c1a2&is=67c67022&hm=eda2fffd29bd34a6f455ff4ef0f5931fb1bfd839e75a19d77daad322e15356ce&', 'https://cdn.discordapp.com/attachments/1131317608818421790/1248662086662488134/image.png?ex=67c7c6f0&is=67c67570&hm=e3fce0db9392e39b2203645611d2de952a3bd4257dae02a458046f58896dc400&', 'https://cdn.discordapp.com/attachments/1131317608818421790/1224099427875033268/image.png?ex=67c8112e&is=67c6bfae&hm=0ca95d3dbd22f1ef38e04c0dedbeaef7af8b6f5152c43ad98403ce0d5d5f26ef&', 'https://cdn.discordapp.com/attachments/1131317608818421790/1207437144398766120/cachedImage.png?ex=67c81838&is=67c6c6b8&hm=1514ceda37647c7a84016ca003e6a120ecd52bbf9bcbec740505b3cb59411941&',
'https://cdn.discordapp.com/attachments/1131317608818421790/1138662380063166484/IMG_1258.jpg?ex=67c861ba&is=67c7103a&hm=0b92670411b62ca75a41546f6630eac6d87ded60b39c9cf959ef9d504e0d6c2f&',
'https://cdn.discordapp.com/attachments/1125102951317372948/1346718644712771677/Anto_zero_seats.png?ex=67c934f9&is=67c7e379&hm=c378d397b3f99e663c3fa834753eb1baa491f4757f1b7a67693ec5c8676d033d&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346721524752846849/0E322372-8353-46AE-B597-55BEBD28813C.jpg?ex=67c937a8&is=67c7e628&hm=01164a9f85869a2c05f7d4bc81312dffe16e7e556ae37160ea2c35c5c396038e&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346721524333154394/image-194.png?ex=67c937a8&is=67c7e628&hm=0ab7051d2679c258eb03ad7d5e11ed7601ce5649461d31b72b215444692481ce&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346721523960123443/image-232.png?ex=67c937a8&is=67c7e628&hm=341cbf7f684a7dd24a336bdfb1395801f3b2597102fabec6cfdcbc91f7015d7a&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346721521564913684/caption-3.png?ex=67c937a7&is=67c7e627&hm=21d9210984fa12d8899ee05f355771d7be9f88cb0eddbccf64696f4201f68fe6&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346720037251321886/IMG_9647.jpg?ex=67c93645&is=67c7e4c5&hm=c88efdeb4dd9fe08c1a3adfdce36eb8c9a569d2d0a396bbf68cc1851457a64d5&',
'https://cdn.discordapp.com/attachments/1131317608818421790/1346717250828374046/Untitled868.png?ex=67c933ad&is=67c7e22d&hm=f3f239401d756cfa9ddd6b075d1c70f71a8f8ea283581acb110690c6b5ca5ac0&',
'https://cdn.discordapp.com/attachments/1131317608818421790/1346717368071491715/savior.jpg?ex=67c933c9&is=67c7e249&hm=e88fce7166d6017ec838bfcf8022f719bc8181e3817bbea54d28c2619a302119&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717899376558162/PilotElim.mp4? ex=67c93448&is=67c7e2c8&hm=1cf5b763fa87d14298c3345ffc980ad072e3b9eb68b554cfce1c28c24ccd1752&', //not sure if it will do mp4 video
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717898756063384/Untitled1996_20240410233421.png?ex=67c93447&is=67c7e2c7&hm=6307358055e9b4f67bb6fcdebfd5aec4f9a58537031977a302dc23da78e74820&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717899758501931/IMG_3238.jpg?ex=67c93448&is=67c7e2c8&hm=c9bfa7e17f4c75e61ebadb62d4805ad1cdc404dd0cc002fddbc96b165a43eec3&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346720036924162138/Untitled73_20240826211840.png?ex=67c93645&is=67c7e4c5&hm=36102e4cc8037f9a22869811cdd1b67ee6c94f6b637e2ef824327ae0e22ed47d&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346842775823454281/IMG_0648.png?ex=67c9a894&is=67c85714&hm=af28cf28aee8b95b3059e46f1e41eb30977a0ebebb38f2a4aefd0717dd432427&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717897233535078/image-17-1.png?ex=67c93447&is=67c7e2c7&hm=f9259dfd4b6fa09298defda78b2d2796b4fef223c22166e22d91998c22c2912a&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717897589919847/image0-2.jpg?ex=67c93447&is=67c7e2c7&hm=6ccd4f510b4f4e56db3323545991d95474c10e0b85fe09d11a75a63b8b9937bf&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717897933721712/grand_mapper_3b.png?ex=67c93447&is=67c7e2c7&hm=5a03711a9e6068132c3dbb30ce0bed28f0569efa32a58d8c5a2b759c2bd3d7d3&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717637325094934/image-46.png?ex=67c93409&is=67c7e289&hm=624e450e27e48187126aeb4074b296475c209d82fd156513e83bfdd847fdfe2d&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346717636922179635/Screenshot_2024-08-19_162439.png?ex=67c93409&is=67c7e289&hm=ec61bf11b2d71921eef33c3dab20d8ffa40207f1fbe247d4886dac34a8a0147e&',
'http://cdn.discordapp.com/attachments/1185696338663440456/1346717636393828352/image0.png?ex=67c93409&is=67c7e289&hm=8a85b671a18a9a10c15b07f0778d68e986cd6b887838f6b5486ce58df5794da1&', 'https://cdn.discordapp.com/attachments/1133151324259750059/1348471236291858473/remix-3fb2834b-d23c-4de9-b73f-6f94e540fa33.png?ex=67cf9534&is=67ce43b4&hm=4d32989e3a2bd44ca87359a03da1eb5ee8e26c05cd6b96e245d6da76592e04da&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346851033082495060/image-2_1bde79.png?ex=67c9b045&is=67c85ec5&hm=9af31ddd581b26fbc364b9de1c22bea5152992ea0b278e289c72b6479138a2f5&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346851035859128434/aham_planet.gif?ex=67c9b046&is=67c85ec6&hm=903cad7f3b18afc79f2ca38df37127021947be75f479d1a385a9dbc08eaf8853&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346849573045538896/googoo_gaagaa.png?ex=67c9aee9&is=67c85d69&hm=688d6f407c80cad9cb7f2a066a430732dc4085e25e35e0757465a506ff18597b&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346852952324702208/ahamburger.png?ex=67c9b20f&is=67c8608f&hm=cad0feb3e237143249691d82ed985f1c44c8bb14222aaaf830715d648bb39cc9&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346854944564580442/IMG_6245.png?ex=67c9b3ea&is=67c8626a&hm=3ebff7f5167f2957e3708b9a4cd86ec754ac035c3c9b0c74c459d172dee6cd0b&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346854944065585212/IMG_4924.png?ex=67c9b3ea&is=67c8626a&hm=c9cdeb8cc10e4d2d3f499ed9b044601e15af0c24dfdfd090faff3c6ccd98a084&', 'https://cdn.discordapp.com/attachments/1339703619347550288/1347923520478511155/image-25.png?ex=67cf915a&is=67ce3fda&hm=3891312a3ac62c3c4c30fb34049100a85cf1a0eb65cf6ddb74ba84c15d1cf18b&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346854943524393051/Untitled82_20240804211049.png?ex=67c9b3e9&is=67c86269&hm=ded9eec6f0a2d670ef6ae53de01a3b1a76ebba923effdfde0fc527734a100f5f&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346853327803125782/mink_check_false.png?ex=67c9b268&is=67c860e8&hm=ea478b6f89b9cf83fe8f8b0f38c9c8efa22f5c70dcf79b62b3830396e2cd0034&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346853327388020796/mink_check_true.png?ex=67c9b268&is=67c860e8&hm=0a9760543e8dcd6d83b53e366dc222a2e91ac81c69073f9a7e3bb024a90d86bf&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346853328642113626/how_to_invoke_kamepin_ua_100_pro_50cent_guranteed_no_virus_punjabi_free_hdmi_hd_4k_360p_2025_pububug.png?ex=67c9b268&is=67c860e8&hm=95fc5f21d3d84789662a84bc7d71e5428706ea6b332f76547e18a8f7031cd396&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346853329065480253/how_to_receive_renvenge_cb_100_garanteed_no_virus_punjabi_totally_halal_2024_fortnite_pububg.png?ex=67c9b268&is=67c860e8&hm=6b9412a73364c69480d0d210a2aa30fad47a0a6bb3faeaf724a56185611dc932&', '<:Award_Meme_s6:1189312747620540427> \n the KING of memes, Meme 👑'];
client.on("message", (message) => {
  if (message.content === "!gm meme") {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];
    message.channel.send(randomChoice);
  }
});

//this is for the screenshots, NOT actual memes
const sillychoices = ['https://cdn.discordapp.com/attachments/1125102951317372948/1346718581756399636/image.png?ex=67c934ea&is=67c7e36a&hm=06eecad833acc07b0644936814c48bb8a1f0c744c22fc398b9a2014cf8deee14&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346845851884191804/image-58.png?ex=67c9ab72&is=67c859f2&hm=f2be3e1f83f6638d4d616862a019f07b1ae408995626e0fc962dc3ee0264116d&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346845853851193419/image-90.png?ex=67c9ab72&is=67c859f2&hm=9368becc4b5b898553be7753af8204dab7068917c44e00a9f26c5ceb4b4a64a0&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346845274957549670/IMG_5160.png.jpg?ex=67c9aae8&is=67c85968&hm=efb1c83515b596620da411c62a74bc8d6884d6ce148a55cbba6020f7556151cd&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346840950974054492/IMG_5540.png.jpg?ex=67c9a6e1&is=67c85561&hm=2fabd83aeed9c55f6d6125c099b4c596fc599b82efae11b7866617f6e6a0691e&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346840949480882196/6yCjaQP.png?ex=67c9a6e1&is=67c85561&hm=53aeae5711b4d59a50f469b19de8ed4bf18b31f19e195a61964a6e377d24d11f&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346840951967973417/image-6.png?ex=67c9a6e2&is=67c85562&hm=68173264316a9803637967b4bea7eb3cddc7b0b97b11d68d367371afe355e6d9&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346839984279126016/image-130.png?ex=67c9a5fb&is=67c8547b&hm=ae4fbda786ed5fb0211a36dfcc86401f2db75e6b51c46b4bc06f14f154625570&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346841633034993674/IMG_1742.png.jpg?ex=67c9a784&is=67c85604&hm=8b4a3279fc6c9350274b58f260c4a02f0714d75f075b6c32d07e68892b0b5dee&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346841633886568509/image-15.png?ex=67c9a784&is=67c85604&hm=8c5f587b18d3765d45846c8f2d47e0297bc9ffb687afa88c432c1018d9dfcaf3&',
'https://cdn.discordapp.com/attachments/1185696338663440456/1346848471516446780/image-191.png?ex=67c9ade2&is=67c85c62&hm=1a475a58646d9183416e9c830ca6b6cd11ed7be844c7c172efbd7cc6917e85d2&',
'https://media.discordapp.net/attachments/1131317608818421790/1211121662339055677/Screenshot_2024-02-25-02-24-49-806_com.discord-edit.jpg?ex=67c9a231&is=67c850b1&hm=e50e48305ff107f4b71cfc2f912b26f6673d14ddc3f39d99dd153942e156b700&=&format=webp&width=622&height=839','https://cdn.discordapp.com/attachments/1133151324259750059/1346850627367469116/image.png?ex=67c9afe4&is=67c85e64&hm=c42a9618eb2c8a4f7bad4617b21f0c07ca5bb7ac77fa72cd6801f5f4e7edf964&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346852087048306862/IMG_2477.jpg?ex=67c9b140&is=67c85fc0&hm=793dec61852fb0cb5a2b8dfff3935ebbc51be1edfa017411e9a6bdbb6da51866&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346852085013938176/image-2_4a13d5.png?ex=67c9b140&is=67c85fc0&hm=bed3ef1a2549fa9c4cd648720598bc0fea9c40415cb4f097a00610bccc1bbfb5&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346852083210522654/image-2_0268fb.png?ex=67c9b13f&is=67c85fbf&hm=d84e71056d17be9cd5953dd28c1ef4993770673d8c091da17e6a570bd4bec781&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346852615413170258/IMG_6339.jpg?ex=67c9b1be&is=67c8603e&hm=1a876ee69d095a059fd3a908ed263bc114b8391d46705b351a5f366c618f22c0&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346853233322364958/marce_what.PNG?ex=67c9b252&is=67c860d2&hm=cc3b84db859ba4c8e022e045d60bfe8f8238f924a6224b0c136f34744ad30435&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346853978012389458/IMG_20231212_065958.jpg?ex=67c9b303&is=67c86183&hm=c6ff47d25b936155e0a352f8d7194f96c97ed69f6c59a2048db8ae15514a999b&', 'https://cdn.discordapp.com/attachments/1185696338663440456/1346854802705092698/image.png?ex=67c9b3c8&is=67c86248&hm=d010f11c8fe3cedeefc012cf88aa058f95b5344e9bfcd74fdfa4cbdedd43f5eb&'];
client.on("message", (message) => {
  if (message.content === "!gm silly") {
    const randomIndex = Math.floor(Math.random() * sillychoices.length);
    const randomChoice = sillychoices[randomIndex];
    message.channel.send(randomChoice);
  }
});

client.on("message", (message) => {
  if (message.content === "!gm louisiana") {
    message.channel.send("THE mapper from Louisiana <:player_Louisiana:1340473835899850835> #GM27WinRobbed");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm frank") {
    message.channel.send("https://youtu.be/MRLC1JVnlUs?si=1jz9qh5XMbHbpHq9");
  }
});

/*client.on("message", (message) => {
  if (message.content === "!gm judge") {
    message.react("0️⃣");
    message.react("1️⃣");
    message.react("2️⃣");
    message.react("3️⃣");
    message.react("4️⃣");
    message.react("5️⃣");
    message.react("6️⃣");
    message.react("7️⃣");
    message.react("8️⃣");
    message.react("9️⃣");
    message.react("🔟");
  }
});*/

client.on("message", (message) => {
  if (message.content === "!gm briswall") {
    message.channel.send("https://cdn.discordapp.com/attachments/1131317608818421790/1272244430165774537/caption.gif?ex=67c7e035&is=67c68eb5&hm=92f4be2f8da797661801f55772c5084481d21a0da1c81581854f7921cdea1106&");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm oog") {
    message.channel.send("Oog");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm") {
    message.channel.send("Oog give me a command");
  }
});

client.on("message", (message) => {
  if (message.content === "!gm faboomko") {
    message.channel.send("faBOOMko");
    message.channel.send("<:Award_Faboomko_s14:1158020430217613392>")
    message.channel.send("~~also the guy who gave me life~~")
  }
});

client.on("message", (message) => {
  if (message.content === "!gm rlcc") {
    message.channel.send("Rlcchamp, a true og in the community and Grand Mapper Host");
    message.channel.send("<:Booster_Rlcchamp:1233108697438228551>")
  }
});

//const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
// JUDGING and GET AVERAGE SCORE
const prefix = "!gm ";

const reactions = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
//let submissions = [];
//let submissionIndex = 0;

// the JUDGE commands
client.on("message", (message) => {
  if (message.content === "!gm judge" || message.content === "!gm average" || message.content === "!gm reset" ) {
    client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const member = message.guild.members.cache.get(message.author.id);
  if (!member) return; // Ensure the member exists

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  const ALLOWED_ROLE_ID = "0"; // Allowed role ID      
  if (message.guild.id === "1304251077041979472") { //if the user is in Felinia's comp
    ALLOWED_ROLE_ID = "1304550152450736191";
    //return message.reply("You don't have permission to use this command."); //they don't have the admin role
    }
  
  if (message.guild.id === "1131317607539167234") { //if the user is in GM
    ALLOWED_ROLE_ID = "1146413264650125342";
  }
  
  // CREATING COMPETITION OBJECT
 const Comp = new Competition(message.guild.id, ALLOWED_ROLE_ID);
  
  switch (command) {
    case "judge":
      const messages = await message.channel.messages.fetch({ limit: 2 });
      const previousMessage = messages.last();

      if (!previousMessage) {
        return message.channel.send("No previous message found to judge.");
      }

      for (const reaction of reactions) {
        await previousMessage.react(reaction);
      }

      Comp.judge(previousMessage);
      break;

    case "average":
      if (Comp.submissions.length === 0) { //will access property of Competition object to see if there are any subs so far
        return message.channel.send("No submissions entered.");
      }

      await Comp.average(message);
      break;

    case "reset":
      Comp.reset();
      message.channel.send("Submissions have been reset.");
      break;
  }
});

	client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  if (!reaction.message.submissionIndex) return;

  const index = reactions.indexOf(reaction.emoji.name);
  if (index === -1) return;

  submissions[reaction.message.submissionIndex].increase(index);
});

	client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;
  if (!reaction.message.submissionIndex) return;

  const index = reactions.indexOf(reaction.emoji.name);
  if (index === -1) return;

  submissions[reaction.message.submissionIndex].decrease(index);
});

  }
});

// help command list
const page1 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 1)")
  .setDescription("Here are the available commands (Page 1):")
  .addFields(
    { name: "!gm help", value: "Shows this help message and list of commands" },
    { name: "!gm judge", value: "Judge a submission \n (ONLY usable by the @Producers role)" },
    { name: "!gm average", value: "Get the AVERAGE of the submissions' scores \n (ONLY usable by the @Producers role)"},
    { name: "!gm reset", value: "Reset the judging scoresheet for the challenge \n (ONLY usable by the @Producers role)"},
    { name: "!gm oog", value: "Oog" },
    { name: "!gm dom", value: "DomisBored" },
    { name: "!gm siib", value: "Siibb" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page2 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 2)")
  .setDescription("Here are the available commands (Page 2):")
  .addFields(
    { name: "!gm faboomko", value: "FaBOOMko" },
    { name: "!gm kame", value: "KAMEPIN" },
    { name: "mapping", value: "I HATE MAPPING!!" },
    { name: "!gm horror", value: "Get spooked!" },
    { name: "!gm komi", value: "Arux's true love" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page3 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 3)")
  .setDescription("Here are the available commands (Page 3):")
  .addFields(
    { name: "!gm louisiana", value: "Louisiana mapper" },
    { name: "!gm frank", value: "The REAL Frank Sinatra" },
    { name: "!gm greenball", value: "GREENBALL" },
    { name: "!gm briswall", value: "BRISWALL" },
    { name: "!gm rlcc", value: "Rlcchamp!" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

const page4 = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("GM Bot Commands (Page 4)")
  .setDescription("Here are the available commands (Page 4):")
  .addFields(
    { name: "!gm meme", value: "Get a random Grand Mapper meme"},
    { name: "!gm silly", value: "Screenshots of silly moments in Grand Mapper, NOT actual memes" }
  )
  .setFooter({ text: "Use !gm <command> to execute a command." });

let currentPage = 0; // Start from the first page
const pages = [page1, page2, page3, page4];

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

    const actionRow = new MessageActionRow().addComponents(prevButton, nextButton);

    // Send the first page with buttons
    const sentMessage = await message.channel.send({
      embeds: [pages[currentPage]],
      components: [actionRow]
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
      } else if (interaction.customId === "next" && currentPage < pages.length - 1) {
        currentPage++;
      }

      // Update the embed and buttons
      const updatedEmbed = pages[currentPage];
      prevButton.setDisabled(currentPage === 0);
      nextButton.setDisabled(currentPage === pages.length - 1);

      await interaction.update({
        embeds: [updatedEmbed],
        components: [new MessageActionRow().addComponents(prevButton, nextButton)],
      });
    });

    collector.on("end", () => {
      // Disable buttons after timeout
      prevButton.setDisabled(true);
      nextButton.setDisabled(true);
      sentMessage.edit({
        components: [new MessageActionRow().addComponents(prevButton, nextButton)],
      });
    });
  }
});

// note: this is the old discord token that Discord somehow AUTOMATICALLY detected it and shut off so I can't put the new one
client.login('MTM0NTk3MjgyMjgxNTgwMTQxNg.GPFX0x.RaIE6ODRKyWjEjkbNB7iq8uomiAQO6mOkUCPc0');



//Siib, to make a deal, Give me one more chance to host a B-Sides season to prove myself, and if it flops again, yall can make fun of me for the potential botched season, but.\n* That season will be well planned.\n* No rigging, No speeding up, and make a schedule for it.\n* Hand the countryball making duties to someone else fit for that role.\n* No mistakes ever made, like issues during 2B premiere which wont happen again.\n* That season wont have Briswall on it at all, its a concept I had come up with 2 days ago. \nGetcha it? (12-16 players planned, I believe for that season). \nDo you want rookies to wait two more months? Since GM25 is planned as an all-returnee season, I want to give the newbies a chance to taste some Grand Mapper experience honestly.");
