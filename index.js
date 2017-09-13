const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const requestMethod = require('request');


const ACCESS_TOKEN = 'fake token';
const FB_URL = 'https://graph.facebook.com/v2.5/'



app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.post('/facebook/webhook', (request, response) => {
		 response.status(200).end();
});

app.get('/facebook/webhook', (request, response) => {
	response.status(200).send(request.query['hub.challenge']);
});
