const Discord = require('discord.js')
const client = new Discord.Client()
var generalChannel = client.channels.get("551305563829698581") // Replace with known channel ID

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
	// List servers the bot is connected to
	joinMessage()
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
	// Set bot status to: "Playing with JavaScript"
    client.user.setActivity("the cameras.", {type: "WATCHING"})

    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith(";")) {
        processCommand(receivedMessage)
    }
	    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send(receivedMessage.author.toString() + " fuck off. I don't work weekends.")
		receivedMessage.react("👎")
    }
    if (receivedMessage.content === 'ping') {   //MAKE 5 TIMES IN A ROW A CUSS
        receivedMessage.reply('Pong!');
      }
})

function joinMessage() {
   // generalChannel.send("IM LIVE BITCH!")
}








function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "add") {
        addCommand(arguments, receivedMessage)
    } else if (primaryCommand == "shaun") {
        shaunCommand(arguments, receivedMessage)
    } else if (primaryCommand == "mike")  {
        mikeCommand(arguments, receivedMessage)
    } else if (primaryCommand == "f") {
        repekCommand(arguments, receivedMessage)
    } else if (primaryCommand == "say") {
        sayCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command bitch. Try `;help`")
    }
}

function sayCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.delete(1);
    } else {
        var newMessage = receivedMessage.toString().replace(";say", "")
        var newMessage = newMessage.toString().replace(",", " ")
        receivedMessage.channel.send("" + newMessage)
        receivedMessage.delete(1);
    }
}

function repekCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("f in chat for " + arguments)
    } else {
        receivedMessage.channel.send("PAY RESPEK TO WHO PLEB?")
    }
}

function mikeCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("Fuck you, and your print memory you titty milk loving weeb")
}

function shaunCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("Bring your baton scum!")
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("Screw you and " + arguments)
    } else {
        var newMessage = receivedMessage.toString().replace(";help", "")
        var newMessage = newMessage.toString().replace(",", " ")
        receivedMessage.channel.send(";help\n;multiply [values]\n;add  [values]\n;f [name]\n;porn\n;say [words]")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `;multiply 2 4 10` or `;multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

function addCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to add. Try `;add 2 4 10` or `;add 5.2 7`")
        return
    }
    let product = 0 
    arguments.forEach((value) => {
        product = product + parseFloat(value)
    })
    receivedMessage.channel.send("The sum of " + arguments + " added together is: " + [product].toString())
}

bot_secret_token = "NTUxODM2OTg5MzIyNjkwNTYw.D121qg.Teu6MW9twAzHagnPfeu8xPDZ5cg"
client.login(bot_secret_token)
require('http').createServer().listen(3000)
