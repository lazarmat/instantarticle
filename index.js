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

app.post('/facebook/receive', (request, response) => {
		if (request.body.object === 'page') {
		 request.body.entry.forEach((entry) => {
			 entry.changes.forEach((data) => {
				 if (data.field === 'leadgen') {
					 requestMethod({
							url: FB_URL + "/" + data.value.leadgen_id,
							qs: {access_token:ACCESS_TOKEN},
							method: 'GET',
						}, function(error, res, body) {
							if (error) {
								console.log('Error sending messages: ', error)
							} else if (body.error) {
								console.log('Error: ', body.error)
							} else {
								console.log('body', body);
								console.log('body', res.body);
								body.field_data.forEach((emailList) => {
										if (emailList.name === 'email') {
											emailList.values.forEach((email) => {
												console.log(email);
											});
										}
								});
							}
						})
				 }
			 });
		 });
		 response.status(200).end();
	 }
});

app.get('/facebook/receive', (request, response) => {
	response.status(200).send(request.query['hub.challenge']);
});
