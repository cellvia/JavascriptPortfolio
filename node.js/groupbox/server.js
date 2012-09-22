/******************************/
/* ----SERVER-LIBS/CONFIG---- */
/******************************/
var express = require('express');
var dnode = require('dnode');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

var host = "127.0.0.1";
var port = 80;
var server = express.createServer(host);

/******************************/
/*-----EXPRESS ROUTING------- */
/******************************/
server.use(express.static(__dirname));

/******************************/
/* ------DB-LIBS/CONFIG------ */
/******************************/
//var mongoq = require('mongoq');
//var db = mongoq("mongodb://cellvia:chairbong@flame.mongohq.com:27095/Chairboy");
//var defaultCollection = db.collection("sliderhistory");

/******************************/
/* -------UTIL-LIBS-----------*/
/******************************/
var T = require('traverse');
var _ = require('underscore');

/*******************************/
/* -----SESSION-CONFIG---------*/
/*******************************/
var	clients = {};

/*******************************/
/* --------DNODE SETUP---------*/
/*******************************/
function dnodeServer (client, con) {

	/********************************/
	/****SERVER INITIATED EVENTS*****/
	/********************************/
	var Send = {
		sliderupdate: function(uid, val, groupBoxAvg){
			emitter.emit('sliderupdate', uid, val, groupBoxAvg);
		},
		departed: function (uid){
			emitter.emit('departed', uid);
		},
		joined: function (uid){
			emitter.emit('joined', uid);
		}
	}
	var eventNames = _.keys(Send);
	
	/*************************************/
	/*******CLIENT INITIATED EVENTS*******/
	/*************************************/
    con.on('ready', function () {
        _.each(eventNames, function (eventName) {
            emitter.on(eventName, client[eventName]);
        });
		Send.joined(client.uid);
		clients[client.uid] = client;
    });
    con.on('end', function () {
        _.each(eventNames, function (eventName) {
			emitter.removeListener(eventName, client[eventName]);
		});
		Send.departed(client.uid);
		delete clients[client.uid];
	});

	/*************************************/
	/*******CLIENT INITIATED FUNCS********/
	/*************************************/
	this.sliderChange = function (newVal) {
		clients[client.uid].sliderval = newVal;
		var groupBoxAvg = groupBox(clients);
//		Database.addChatRecord(clients, groupBoxAvg);
		Send.sliderupdate(client.uid, newVal, groupBoxAvg);
	}
    this.users = function (clientCB) {
		var groupBoxAvg = groupBox(clients);
        clientCB(clients, groupBoxAvg);
    };	
}

/*************************************/
/*********** CALC FUNCS **************/
/*************************************/
function groupBox(){
	var totals = _.pluck(clients, 'sliderval');
	var sum = _.reduce(totals, function(memo, num){ return memo + num; }, 0);
	var avg = sum / totals.length;
	return avg;
}

/*************************************/
/************ DB FUNCS ***************/
/*************************************/
var Database = {
	addChatRecord: function (clients, groupBoxAvg){
		var data = T(clients).map(function (x) {
			if(typeof(x) === 'function'){
				this.delete();
			}
		});
		_.extend(data, {
			"avg": groupBoxAvg,
			"date": Date.now()
		});
//		this.insert(data);
	},	
	insert: function (data, collection){
//		var collection = collection || defaultCollection;
//		collection.insert(data, function(err, doc){
//			console.log(doc);
//		});
	}
}

/******************************/
/* ------INITIATE-SERVER----- */
/******************************/
dnode(dnodeServer).listen(server);
server.listen(port);
console.log('http://'+host+':'+port+'/');