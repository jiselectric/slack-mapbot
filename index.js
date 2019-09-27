const SlackBot = require('slackbots');
const channel = 'slack-bot-to-send-google-map-url'; 
const axios = require('axios');

const urlWebHook = 'https://hooks.slack.com/services/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';

const bot = new SlackBot({
    token: 'xoxb-777959940630-764281502611-ecod8dzkzWKKULnZYGGjz1DY',
    name : 'mapbot'
});

// Start Handler 
bot.on("start", function () {
    bot.postMessageToChannel(channel, "Mapbot is Here!");
    console.log('Hello from the Mapbot :D');
});

bot.on("message", function (data) {
    if (data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
});

// Possible Cases of Activations 
function handleMessage(message) {
    if (message.search('!mapbot') !== -1 || message.search('!Mapbot') !== -1) {
        if (message.length === 7) {
            return sendGreeting();
        } else {
            return convertSearchQuery(message);
        }
    }
}

// if only '!Mapbot' or '!mapbot' is entered 
function sendGreeting() {
    var greeting = getGreeting();
    bot.postMessageToChannel(channel, greeting);
}

function getGreeting() {
    var greetings = [
        "In order to provide you the URL, we need the address!",
        "Where can I bring you to?",
        "Mapbot is ready!",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

// if '!Mapbot' + address OR '!mapbot' + address is entered at the same time
function convertSearchQuery(message) {
    let query = extractSearchQuery(message);
    let result = 'Here\'s Your Link to the Google Map !\n' + 'URL : ' + 'https://www.google.com/maps/search/' + query;

    bot.postMessageToChannel(channel, result);
}

function extractSearchQuery(message) {
    let address = message.substr(7).toString().replace(/^\s+|\s+$/g, '').toString().replace(',', '%2C').split(' ').join('+');

    return address;
}


