const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');
const cooldown = new Set();

client.on('ready', function()
{
	console.log(`Logged in as ${client.user.tag}!`);
});

function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetSaviezVousQue(id)
{
	request("https://saviezvousque.net/page/" + getRandomInt(2, 1776), function (a, b, body)
	{
		var regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg)/g;
		var found = body.match(regex);

		var index = found.indexOf("https://s-media-cache-ak0.pinimg.com/736x/a9/ba/ed/a9baedecb8db1121c04ad09d52569c42.jpg"); // remove adblock url
		if (index > -1)
			found.splice(index, 1);

		let countfound = found.length;
		let randomimg = getRandomInt(1, countfound);
		if (!found[randomimg])
		{
			GetSaviezVousQue(id)
			return
		}

		client.channels.get(id).send({
			embed: 
			{
				color: Math.floor(Math.random() * 16777214) + 1,
				image: 
				{
					url: found[randomimg]
				},
				footer:
				{
					"icon_url": "https://i.imgur.com/6UVGjd2.png",
					"text": "Σnigma&C0"
				},
				timestamp: new Date()
			}
		})
	})
}

client.on("message", function(msg)
{
	let message = msg.content;
	let channelid = msg.channel.id

	if (msg.channel.type == "dm") // stop dm message
		return;

	if (channelid != "570301655002906629") // only meme channel
		return;

	if (message == "^^wtf")
	{
		if (cooldown.has(msg.author.id))
			return;

		GetSaviezVousQue(channelid);

		cooldown.add(msg.author.id);

		setTimeout(function()
		{
			cooldown.delete(msg.author.id)
		}, 8000)
	}
});

client.login("token");