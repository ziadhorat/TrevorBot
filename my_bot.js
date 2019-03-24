const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    // List servers the bot is connected to
    var numServ = 0
    console.log("Servers: ")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
        numServ = numServ + 1

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
    
    client.user.setActivity("you. | Serv: " + numServ + " | ;info", {type: "WATCHING"})
    // PLAYING, STREAMING, LISTENING, WATCHING
    // client.user.setActivity("TV", {type: "WATCHING"})
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith(";")) {
        processCommand(receivedMessage)
    }

    if (receivedMessage.content.startsWith("=")) {
		receivedMessage.react("ðŸ‘Ž") //Reacts with the thumb down emoji
    }

	    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {// Send acknowledgement message
        receivedMessage.channel.send("FUCK OFF " + receivedMessage.author.toString())
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading semi-colon
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    primaryCommand = primaryCommand.toLowerCase() //Makes the command case insensitive
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand) //Displays the argument recevied in the console log
    console.log("Arguments: " + arguments) // Displays the arguments in the console log

    if (primaryCommand == "help") {  //Checks what command is passed (after the semi-colon) and calls the appropriate function
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "image") {
        imageCommand(arguments, receivedMessage)
    } else if (primaryCommand == "video") {
        videoCommand(arguments, receivedMessage)
    } else if (primaryCommand == "source") {
        sourceCommand(arguments, receivedMessage)
    } else if (primaryCommand == "f") {
        respekCommand(arguments, receivedMessage)
    } else if (primaryCommand == "say") {
        sayCommand(arguments, receivedMessage)
    } else if (primaryCommand == "kick") {
        kickCommand(arguments, receivedMessage)
    } else if (primaryCommand == "purge") {
        purgeCommand(arguments, receivedMessage)
    } else if (primaryCommand == "rand") {
        randCommand(arguments, receivedMessage)
    } else if (primaryCommand == "info") {
        infoCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("What fucking command is that?\nTry `;help` or `;info`")
    }
}

function infoCommand(arguments, receivedMessage) {
    var myInfo = new Discord.RichEmbed()
        .setTitle("TREVOR-BOT")
        .addField("I am Trevor", "I am based on an intern at WeThinkCode\nTrevor Maseleme : https://twitter.com/tkmaseleme\n\nThis bot aims to be as useful as he was :)\nIf you need further help, try ;help")
        .setFooter("Author: Ziaul-haque Mahomed")
        .setColor("DC143C")
        .setURL("https://github.com/ziadhorat/TrevorBot")
        .setThumbnail('https://pbs.twimg.com/profile_images/827530354340855808/Ea6GPgpX_400x400.jpg')
        .setTimestamp()
    receivedMessage.channel.sendEmbed(myInfo)
}

function sourceCommand(arguments, receivedMessage) {
    var myInfo = new Discord.RichEmbed()
        .addField("SOURCE CODE", "https://github.com/ziadhorat/TrevorBot")
        .setFooter("Author: Ziaul-haque Mahomed")
        .setColor("DC143C")
        .setURL("https://github.com/ziadhorat/TrevorBot")
        .setTimestamp()
    receivedMessage.channel.sendEmbed(myInfo)
    receivedMessage.delete(1); //Deletes the message with the command
}

function videoCommand(arguments, receivedMessage) {
    if (receivedMessage.channel.nsfw){
       var show = links[Math.floor(Math.random() * links.length)]
        receivedMessage.channel.send("`Video requested by: `" + receivedMessage.author.toString() + ", ohh yeah!")
        receivedMessage.channel.send("" + show)
        receivedMessage.delete(1); //Deletes the message with the command
    } else{
        receivedMessage.channel.send("You're asking for NSFW video on a NON-NSFW channel, " + receivedMessage.author.toString() + " is a weeb.")
        receivedMessage.delete(1); //Deletes the message with the command
    }
}

function imageCommand(arguments, receivedMessage) {
    if (receivedMessage.channel.nsfw){
       var show = images[Math.floor(Math.random() * images.length)]
       const exampleEmbed = new Discord.RichEmbed()
        .setColor("DC143C")
        .setImage(show)
        .setTimestamp()
       receivedMessage.channel.send(exampleEmbed);
       receivedMessage.delete(1); //Deletes the message with the command
    } else{
        receivedMessage.channel.send("You're asking for NSFW image on a NON-NSFW channel, " + receivedMessage.author.toString() + " is an asshole.")
        receivedMessage.delete(1); //Deletes the message with the command
    }
}

function kickCommand(arguments, receivedMessage) {
    var member= receivedMessage.mentions.members.first();
    receivedMessage.delete(1); //Deletes the message with the command
    member.kick().then((member) => {
        receivedMessage.channel.send("Fuck outta here " + member.displayName + ":wave:");
    }).catch(() => {
         receivedMessage.channel.send("I DONT HAVE THE POWA");
    });
}

function sayCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send("Try `;say message`")
        receivedMessage.delete(1); //Deletes the message with the command
    } else {
        const sayMessage = arguments.join(" "); //Splits the arguments with spaces
        receivedMessage.channel.send("" + sayMessage) //Says what arguments were passed
        receivedMessage.delete(1); //Deletes the message with the command
    }
}

function respekCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("f in chat for " + arguments) //says "f in the chat for ARGUMENT"
        receivedMessage.react("ðŸ‡«") //Adds the F emoji as a reaction
    } else {
        receivedMessage.channel.send("PAY RESPEK TO WHO PLEB?") //Will say this if no arguments are passed
    }
}

function helpCommand(arguments, receivedMessage) {
    var myInfo = new Discord.RichEmbed()
    .setTitle("HELP")
    .addField("Normie:","F: F in chat for ___\nRand: Selects a random user from the discord\nSay: Echoes whatever comes after say",false)
    .addField("Information:", "Info: Information on TrevorBot\nSource: Source code of TrevorBot",false)
    .addField("NSFW:","Image: Posts a nsfw image\nVideo: Posts a nsfw video",false)
    .addField("Admin:","Kick: Kicks user\nPurge: Deletes 100 messages",false)
    .setFooter("Author: Ziaul-haque Mahomed")
    .setColor("DC143C")
    .setThumbnail(receivedMessage.author.avatarURL)
    .setTimestamp()
    receivedMessage.channel.sendEmbed(myInfo)
}

function randCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("" + receivedMessage.guild.members.random())
}

function purgeCommand(arguments, receivedMessage) {
    receivedMessage.channel.bulkDelete(100)
}

var links = ['link1','link2']

var images = ['link1','link2']

//HOSTING RELATED INFORMATION

bot_secret_token = DISCORD_TOKEN
client.login(bot_secret_token)
const PORT = process.env.PORT || 3000;      //These 2 lines are here so the bot can be hosted on heroku
require('http').createServer().listen(3000) //These 2 lines are here so the bot can be hosted on heroku
