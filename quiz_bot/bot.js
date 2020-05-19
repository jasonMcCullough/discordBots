var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var players = [];

var player_names = [];

bot.on('message', function (user, userID, channelID, message, evt) {
    
    if(!message.includes('add players:')) {
        message = message.toLowerCase()
    }

    if(message.includes('hey quiz bot')) {
        bot.sendMessage({
            to: channelID,
            message: 'Hey '+user+'!' 
        });
    }

    if(message.includes('hi quiz bot')) {
        bot.sendMessage({
            to: channelID,
            message: 'Hi '+user+'!' 
        });
    }

    if(message.includes('hello quiz bot')) {
        bot.sendMessage({
            to: channelID,
            message: 'Hello '+user+'!' 
        });
    }

    if(message.includes('rules')) {
        bot.sendMessage({
            to: channelID,
            message: 'Hey '+user+'! Each contestant provides ten questions from a topic of their choice, up to five of those questions can be multiple choice.'
        });
    }

    // WIP - End result is to add score to the players after they are added.
    if(message.includes('add players:')) {
        var names = message.replace('add players:','').replace(' ','').split(',')

        for(var i = 0; i < names.length; i++) {
            player_names.push(names[i])
            players.push({
                key: names[i],
                value: 0
            });
        }

        bot.sendMessage({
            to: channelID,
            message: 'Consider it done '+user+'. Player list is now as followed: ' + player_names
        });
        

        logger.info(players);
    }

});