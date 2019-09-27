var request = require ("request");

var urlWebHook = "https://hooks.slack.com/services/abcdef"; //the URL you get on your "incoming web hooks" page.

function sendToSlack (s, theUsername, theIconUrl, theIconEmoji, theChannel) {
	var payload = {
		text: s
		};
	if (theUsername !== undefined) {
		payload.username = theUsername;
		}
	if (theIconUrl !== undefined) {
		payload.icon_url = theIconUrl;
		}
	if (theIconEmoji !== undefined) {
		payload.icon_emoji = theIconEmoji;
		}
	if (theChannel !== undefined) {
		payload.channel = theChannel;
		}
	var theRequest = {
		url: urlWebHook,
		method: "POST",
		json: payload
		};
	request (theRequest, function (error, response, body) {
		if (!error && (response.statusCode == 200)) {
			console.log ("sendToSlack: " + s);
			}
		else {
			console.log ("sendToSlack: error, code == " + response.statusCode + ", " + response.body + ".\n");
			}
        });
	}

sendToSlack ("Hello World");