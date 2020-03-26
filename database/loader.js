'use strict';
var vogels = require('vogels'); 	 
vogels.AWS.config.loadFromPath('/config.json');
var async = require('async');
var Joi = require('joi');
var SHA256 = require("crypto-js/sha256");

var AWS = require('aws-sdk');
var db = new AWS.DynamoDB();

//CHAT TABLE

var testChat1 = { 
		userId: 'test1.com',
		topic: 'Technical',
		desc: 'cant logout',
		employeeContacted: 'Bob Smith',
		employeePhone: '1234567890',
		employeeEmail: 'smith@markit.org'
};

var chatmsgData = [testChat1];

//Define Model
var HackItChats = vogels.define('Chats', {
	hashKey: 'email',	//user
	rangeKey: 'createdAt',		//sort key 
	timestamps: true,
	schema : {
		userId: Joi.string().email(),
		topic: Joi.string(),
		desc: Joi.string(),	 
		employeeContacted: Joi.string(),
		employeePhone: Joi.string(),
		employeeEmail: Joi.string()
	},
	tableName: 'HackItChats',
});

var uploadChats = function() {
	console.log("Uploading");
	async.forEach(chatmsgData, function(msg, cb2){
		console.log("Adding msg");
		HackItChats.create(msg, function(err,acc){
			console.log("Created chat in DynamoDB", acc.get('desc'));
			cb2();
		});
	}, console.log('Done!'));
};

var createTables = function (uploadFunc) {
	console.log('Creating tables');
	vogels.createTables(function(err) {	
		  if (err) {
		    console.log('Error creating tables: ', err);
		  } else {
		    console.log("Waiting 30s for the table to become active...");
		    setTimeout(uploadFunc, 30000);
		  }	
	});
}

function deleteTable (table, uploadFunc, err, data) {	//if u call delete table, u will create table and load data 
	if (err) {
		console.log('Error: ' +err);
	} else  {
		console.log("Deleting "+ table +" table");
		var params = {
		        "TableName": table
		}; 
		db.deleteTable(params, function() { 
			console.log("Waiting 15s for the table to be deleted...");
			setTimeout(function() {
				console.log(table + " table deleted!");
				createTables(uploadFunc);	//includes loadtable data
			}, 15000);
		});
	}
}