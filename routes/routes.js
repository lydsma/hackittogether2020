//ROUTES.JS
var db = require('../database.js');

var postSaveNewChat = function(req, res) {
	var email = req.body.email;
	var topic = req.body.topic; 
	var desc = req.body.description;

	db.saveNewChat(email, topic, desc, function(data,err) {
		if (err) {
			res.send(err);
		} else {
			if (data == 'success') {
				console.log('Success');
			}
		}
	})
}

var getLastChat = function(req, res) {
	var email = req.body.email;

	db.getLastChat(email, function(json,err) {
		if (err) {
			res.send(err);
		} else {
			console.log(json);
			res.send(JSON.stringify(json));
		}
	});
}

var routes = {
	post_savenewchat: postSaveNewChat,
	get_lastchat: getLastChat
}

module.exports = routes;


	/**db.saveNewChat('test1@gmail.com', 'topic1', 'desc1', function(data,err) {
			if (data == 'success') {
				console.log('Success');
			}
	});

	db.saveNewChat('test1@gmail.com', 'topic2', 'desc2', function(data,err) {
			if (data == 'success') {
				console.log('Success');
			}
	});

	db.getLastChat('test1@gmail.com', function(data,err) {
		if (data) {
			console.log('routes' + JSON.stringify(data));
		}
	})*/