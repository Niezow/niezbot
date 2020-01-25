// Calling the package
var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

// Listener Event: Message Received (This will run every time a message is received)
bot.on('message', message => {
	
	// Variables
	var sender = message.author; // The person who sent the message
	var msg = message.content.toUpperCase(); // Takes the message and makes it all uppercase
	var prefix = '>';
	var currentChannelID = message.channel.id;
	
	// First, we need to make sure that it doesn't read itself.
	if(sender.id === '670240807894253570') {
		return;
	}
	
	// Ping / Pong command
	if (msg === prefix + 'PING') {
		message.channel.send('Pong!') // Sends a message to the channel
	};
	
	// Deleting Specific Messages ( Messages that are not an ID for me )
	// if (message.channel.id === '513077882038386709') { // Checks if the message is in the specific channel
		// if (isNaN(message.content)) {
			// message.delete();
			// message.author.send('Please, post only a number in this channel and not anything else, thank you!')
		// }
	// }
	
	if (msg.includes('LETTUCE')) {
		message.delete();
		message.author.send('The word **Lettuce** is banned, please don\'t use it');
	}
	
	if (!userData[sender.id]) userData[sender.id] = {
		messagesSent: 0
	}
	
	userData[sender.id].messagesSent++;
	
	fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
		if (err) console.error(err);
	});
	
});

// Listener Event: Bot Launches
bot.on('ready', () => {
	console.log('Bot Launched...') // Runs when the bot is launched
	
	bot.user.setStatus('dnd');
	bot.user.setActivity('Hello!');
});

// Listener Event: User joining the server
bot.on('guildMemberAdd', member => {
	console.log('User ' + member.user.username + ' has joined the server!');
	console.log(member);
	
	var role = member.guild.roles.find('name', 'Test'); // This searches for a role 'name'd 'Test' in the server.
	
	member.addRole(role);
	
	member.guild.channels.get('513077882038386709').send('**' + member.user.username + '** is an ughsboom!');
	
	
});

bot.on('guildMemberRemove', member => {
	console.log('User ' + member.user.username + ' has left the server!');
	console.log(member);
	
	member.guild.channels.get('513077882038386709').send('**' + member.user.username + '** is not an ughsboom anymore!');
});
	
//login
bot.login('NjcwMjQwODA3ODk0MjUzNTcw.Xirmrw.hPgvj6lSLEekzOwMK1O8BtZJIco')