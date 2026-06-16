const StringArray = require("./StringArray.js");

class ListCommand {
    constructor(message){
        this.command = message;
    }
    
    readCommand(){ //returns a statement or whatever based on the given message (message.content) which is inputted
        if (this.command === "!gm") 
        	return ["oog give me a command"];
        if (this.command === "!gm naby") 
        	return ["New Abyssinian Mapping 5310. New Abyssinian Mapping 5310. New Abyssinian Mapping 5310."];
        if (this.command === "!gm pelu") 
        	return ["Fake Palauan who is actually a R*manian."];
        if (this.command === "!gm spacor")
            return ["I'VE PLAYED THESE INNER MONGOLIAN GAMES BEFORE!!"];
        if (this.command === "!gm perl")
            return ["https://cdn.discordapp.com/attachments/1403429362878906369/1513274849127039006/image.png?ex=6a272287&is=6a25d107&hm=5ac79528061d6441322da2da51d448ba1eb5e8e06a0593bfe21c9c02a51dd50d&"];
        if (this.command === "!gm cymbol")
            return ["https://media.discordapp.net/attachments/1450622608218394749/1513181502874193990/3872D4A7-DEF3-4028-A5D9-C8D131FA7F89.png?ex=6a26cb97&is=6a257a17&hm=4a7f7b485e2cda46581f780d1cf7328eef20d3dec64cfe5f3c0c3bba89fee740&=&format=webp&quality=lossless&width=375&height=210"];
        if (this.command === "!gm shower"){
            const showerArray = ["Wow you FINALLY took a shower! Good job!! 🚿", "Damn you took a shower for once! Nice. 🚿"];
        	const randomIndex = Math.floor(Math.random() * showerArray.length);
            const randomElement = showerArray[randomIndex];
            return [randomElement];
        }
  		if (this.command === "!gm greenball")
        	return ["WE LOVE GREENBALL!!", "<:Award_Greenball_s11:1189312402265755790>"];
        if (this.command === "!gm ar55")
            return ["Winner of GM34!", "<:Winner_Ar55:1510865500802908162>", "Also here is his doc on things he learned: https://docs.google.com/document/d/1pMO_BFB8xn-dpbnzr8THwSMs_GgESHJQ/edit?usp=sharing&ouid=115380103761635669874&rtpof=true&sd=true"];
        if (this.command === "!gm phil")
            return ["PHILLLLLLLL", "<:Award_Phil:1510866899351769118>"];
        if (this.command === "!gm austro")
            return ["https://youtu.be/p85xw9KHmSY"];
        if (this.command === "!gm hexor")
            return ["I SAY LONG LIVE THE PEOPLE'S REPUBLIC OF CHINA ARE YOU DEAF???!!! :flag_cn: \n窝硕中华人民共和国万岁泥尔多隆麻？？？！！！:flag_cn:"];
        if (this.command === "!gm archipel")
            return ["INDONESIA INDONESIA INDONESIA!! 🇮🇩"];
        if (this.command === "!gm odelia")
            return ["FLOATER ALERT!! He’s a floater- AHH HES FLYING AWAY! SOMEONE CATCH HIM"];
        if (this.command === "!gm kame")
        	return ["Slava Ukraini! 🇺🇦"];
        if (this.command === "!gm horror")
        	return ["https://cdn.discordapp.com/attachments/766759322674790401/1342505766078255123/image.png?ex=67c7b92d&is=67c667ad&hm=f9519b60ac061ee1ef5134908f662340c140e933bda0f0fd7e2b02644d91eec2&"];
        if (this.command === "shiver me timbers")
        	return ["I AM A PIRATE AAARGHHH!! 🏴‍☠️"];
        if (this.command === "there be treasure")
        	return ["THERE BE TREASURE AAARGHHH!! 🏴‍☠️"];
        if (this.command === "!gm siib")
        	return ["THE GOAT!! #BestGrandMapperHost", "<:Winner_Siib:1385724261658001438>"];
        if (this.command === "!gm burg")
        	return ["Oog - Burgenti, Probably", "<:Award_Burgenti_s6:1209582418462375947>"];
        if (this.command === "!gm komi")
        	return ["https://tenor.com/view/komi-san-komi-shouko-komi-shouko-comi-san-gif-23012202?quality=lossless"];
        if (this.command === "stycko")
            return ["Rip Stycko, gone too soon 😔"];
        if (this.command === "mapping" || this.command === "Mapping")
            return ["I HATE MAPPING"];
        if (this.command === "I HATE MAPPING")
            return ["Eww mapping 🤢"];
        if (this.command === "Happy Birthday!" || this.command === "Happy Birthday" || this.command === "happy birthday" || this.command === "happy bday")
            return ["HAPPY BIRTHDAY!!! 🥳🎂"];
        if (this.command === "!gm louisiana")
            return ["THE mapper from Louisiana", "<:Award_Louisiana_s27:1391471938429259967>", "#GM27WinRobbed #GM28WinRobbed"];
        if (this.command === "!gm frank")
            return ["https://youtu.be/MRLC1JVnlUs?si=1jz9qh5XMbHbpHq9"];
        if (this.command === "!gm oog")
            return ["Oog"];
        if (this.command === "!gm faboomko")
            return ["faBOOMko", "<:Award_Faboomko_s14:1158020430217613392>", "~~also the guy who gave me life~~"];
        if (this.command === "!gm uhh")
            return ["UHHstraalis!!", "<:Winner_Uhstraalis:1389941930502393877>", "The Winner of gm25!!"];
        if (this.command === "!gm shoebill")
            return ["https://cdn.discordapp.com/attachments/1234773780308430848/1244031543110795365/im_watching.mp4?ex=66c065e8&is=66bf1468&hm=2853045e555793ab0193f88569732f088876c9264e9f1f736b5e3a7da5b9ba3e&"];
        if (this.command === "!gm monika")
            return ["https://cdn.discordapp.com/attachments/1206729689125884006/1310655510130851901/monika.jpg?ex=6824d010&is=68237e90&hm=37d7ff843283d70829d6ab665b73b83e4d1d124153374d8763fa7d166af4a0f3&"];
        if (this.command.startsWith("!gm predict")){
            let prediction = "";
            const predictlist = ["No.", "Are you seriously asking that to a DISCORD BOT? Thats crazy.", "You'll find out eventually...", "What am I to you, a genie?", "Honestly I have no idea.", "Definitely not.", "Leave me alone. 😡", "YES!! 😁", "My sources say no..", "How about you conentrate and ask again buddy", "Ask me later 🙄", "Better not tell you now 😬", "Most likely yes.", "As I see it right now, yes.", "Oog maybe", "The “Kill the Boer” chant is a divisive issue in South Africa. Some view it as a historic anti-apartheid symbol, while others see it as inciting violence against white farmers.", "Definitely!! ;)"];
            const randomIndex = Math.floor(Math.random() * predictlist.length);
            prediction = predictlist[randomIndex];
            return [prediction];
        }
        if (this.command.startsWith("!gm inspire")){
            let inspire = "";
            const inspirelist = ["If you give up now, you won’t see the light. You’ll only be forever encroached in darkness. - Louisiana", "And I’ll always remember [Grand Mapper] for the rest of my life as I go through it, finding new things to do, new people to meet, new tasks to accomplish, and new worlds to conquer. - Siib", "Having what it takes isn't the most important, its whether taking what it takes to win it all. - Adata","UNDERSTAND THAT TO LIVE IS TO STRUGGLE. TO LIVE IS TO FIGHT. TO LIVE IS TO GROW. TO LIVE IS TO LIVE ***CREATE YOURSELF***.\nLIFE IS ABOUT TAKING THAT PEN AND WRITING YOUR DAMN STORY THE WAY YOU WANT IT. - Louisiana", "The past is history. The future, a mystery. The present, that neat little path between the prior two, is a time worth living, even if it’s dirtied by struggle. Enjoy your life while you live it. After all, today is a gift. That’s why it’s called the present. - Louisiana","If you truly want something, you can’t give up, and for you to experience success it’s helpful to have a reason why to keep going and persevere through everything. Think about what you truly want in life and work towards it. It’s best if you’re obsessed. Be obsessed to chase racks, get your dreams, make that career work, go to that school, or whatever it may be. I believe in y’all :) - Greenball", "One thing I’ve learned in the past 2 years is that you have to put your balls on the line and work hard if you truly want something… - Greenball"];
            const randomIndex = Math.floor(Math.random() * inspirelist.length);
            inspire = inspirelist[randomIndex];
            return [inspire];
        }
        
        return [];
    }
    
    
    readMemQuote(){ //Deals with StringArray class dump: Memes, Phase quotes, green advice, and silly
        let MemQuote = new StringArray();
        if (this.command === "!gm meme"){
            let choices = MemQuote.getMeme();
    		choices = this.shuffleArray(choices);
            const randomIndex = Math.floor(Math.random() * choices.length);
            const randomChoice = choices[randomIndex];
			return randomChoice;
        }
        if (this.command === "!gm silly"){
            let sillychoices = MemQuote.getSilly();
            sillychoices = this.shuffleArray(sillychoices);
            const randomIndex = Math.floor(Math.random() * sillychoices.length);
            const randomChoice = sillychoices[randomIndex];
            return randomChoice;
        }
        if (this.command === "!gm quote"){
            let quotes = MemQuote.getQuote();
    		quotes = this.shuffleArray(quotes);
    		const randomIndex = Math.floor(Math.random() * quotes.length);
    		const randomChoice = quotes[randomIndex];
            return randomChoice;
        }
        if (this.command === "!gm greenadvice"){
            let greenquote = MemQuote.getGreenQuote();
    		greenquote = this.shuffleArray(greenquote);
    		const randomIndex = Math.floor(Math.random() * greenquote.length);
    		const randomChoice = greenquote[randomIndex];
            return randomChoice;
        }
        
        return " ";
    }
    
   shuffleArray(arraystring) {
  	return arraystring.sort(() => Math.random() - 0.5);
	}
    
} //end of class
 

module.exports = ListCommand;