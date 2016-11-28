var superagent = require('superagent');
var reload = require('require-reload');
var config = require('../../config.json');
var logger = new (reload('../../utils/Logger.js'))(config.logTimestamp);

module.exports = {
	desc: 'Tells you what the current Voice of Seren is.',
	aliases: ['voice'],
	task(bot, msg) {
		superagent.get(`https://cdn.syndication.twimg.com/widgets/timelines/${config.twitterId}?&lang=en&supress_response_codes=true&rnd=${Math.random()}`)
			.end((error, response) => {
				if (error) {
					logger.warn('Error checking VoS: ' + (error.status || error.response));
					bot.createMessage(msg.channel.id, 'There was an error while grabbing the Voice of Seren. Please try again another time.').then(sentMsg => {
						setTimeout(() => { msg.delete(); sentMsg.delete(); }, 10000); // Deletes messages after 10 seconds.
					});
				} else {
					let vosStart = response.text.indexOf('The Voice of Seren is now active in the ');
					let vosText = response.text.slice(vosStart, response.text.length);

					vosText = vosText.replace(/Amlodd|Cadarn|Crwys|Hefin|Iorwerth|Ithell|Meilyr|Tragaearn/gi, (x) => {
						return `**${x}**`;
					});

					vosText = vosText.slice(0, vosText.indexOf('districts') + 10);

					bot.createMessage(msg.channel.id, `${vosText}.`);
				}
			});
	}
}