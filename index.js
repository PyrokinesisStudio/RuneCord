/* REQUIRE NODE 6+ TO START THE BOT */
if (parseFloat(process.versions.node) < 6) {
	throw new Error('Incompatible node version. Please use Node 6 or higher.');
}

/* REQUIRED DEPENDENCIES */
const Discord = require("discord.js");
const reload  = require('require-reload')(require);
const client  = new Discord.Client();

/* REQUIRED FILES */
const config = reload('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
});

client.login(config.token);