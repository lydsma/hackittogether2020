//Map of Users to #Chats 
var userNumChats = new Map();
userNumChats.set('test1@gmail.com', 0);
userNumChats.set('test2@gmail.com', 0);
userNumChats.set('test3@gmail.com', 0);

//Definition of Chat Class
class Chat {
	constructor(id, useremail, date, topic, description, employee, employeeEmail) {
		this.id = id;
		this.useremail = useremail;
		this.date = date;
		this.topic = topic;
		this.description = description;
		this.employee = employee;
		this.employeeEmail = employeeEmail;
	}
}

var chat

//Map of ChatID to Chat desc
var chats = new Map();
chats.set('test1@gmail.com0', new Chat('test1@gmail.com0', 'test1@gmail.com', new Date().getTime(), 'Technical', 'Cant Login', 
	'Bob Smith', 'bob@test.com'));

//save new chat entry in table
//create new chat id (email + # chat)
//client send over client email, topic, desc, etc. 
var myDB_saveChat = function(email, topic, desc, callback) {
	console.log('Creating new chat'); 
	var newNumChat = userNumChats.get(email) + 1;
	userNumChats.set(email, newNumChat);
	var newid = email + newNumChat;

	chats.set(newid, new Chat(newid, email, new Date().getTime(), topic, desc, 'Bob Smith', ''));
	console.log('saved ' + JSON.stringify(chats.get(newid)));
	callback(chats.get(newid), null);
}

var myDB_getLastChat = function(email, callback) {
	console.log('Getting last chat');
	var oldNumChat = userNumChats.get(email) - 1;
	var oldChatId = email + oldNumChat;
	var currChatId = email + userNumChats.get(email);
	var currChat = chats.get(currChatId);
	var currDate = currChat.date;

	if (chats.has(oldChatId)) {
		var chatObj = chats.get(oldChatId);
		callback(chatObj, null);
	} else {
		callback('No last chat', null);
	}
}

var database = {
	saveNewChat: myDB_saveChat,
	getLastChat: myDB_getLastChat
}

module.exports = database;
