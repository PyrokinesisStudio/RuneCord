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

/* LOCAL VARIABLES */
var logger;

logger = new (reload('./utils/Logger.js'))(config.logTimestamp);

function login() {
	logger.logBold('Logging in...', 'green');
	client.login(config.token).catch(error => {
		logger.error(error, 'LOGIN ERROR');
	});
}

/* INIT EVERYTHING */
login();