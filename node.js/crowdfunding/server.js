/******************************/
/* -----environment vars----- */
/******************************/
var local = true;	
var host = local ? "127.0.0.1" : "SERVER",
	port = 8080,
	dbhost = local ? "localhost" : "DB";
	dbport = local ? false : 1000,
	dbname = "DBNAME",
	cipher = "SALT",
	emailSender = "EMAIL SENDER";
var url = "http://"+host;
	url+= local ? ":" + port : "";
	url+= "/";
	
/******************************/
/*------app-LIBS--------------*/
/******************************/
var express = require('express'),
	passport = require('passport'),
	passportV = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	LocalStrategyV = require('./verified-strategy'),
	FacebookStrategy = require('passport-facebook').Strategy,
	_ = require('underscore'),
	Validator = require('validator').Validator,
	sanitize = require('validator').sanitize,
	crypto = require('crypto'),
	mongoose = require('mongoose'),
//	Fiber = require('fibers'),
//	Seq = require('seq'),
	moment = require('moment'),
	nodemailer = require("nodemailer");
	
/******************************/
/*------app-LIBS-CONFIG-------*/
/******************************/
var app = express(host);
var v = new Validator();
v.error = function(msg) {return false;}
var Schema = mongoose.Schema;
var db = local ? mongoose.createConnection(dbhost, dbname) : mongoose.createConnection(dbhost, dbname, dbport);
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "EMAIL USERNAME",
        pass: "EMAIL PASSWORD"
    }
});
var mailOptions = {"from": emailSender}; // sender address

/******************************/
/*---EXPRESS ROUTING CONF---- */
/******************************/
app.configure(function() {
	app.use(express.cookieParser());
	app.use(express.bodyParser());
//*********TODO session in mongo, redis?**********//
	app.use(express.session({ secret: cipher }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname));
});
	
/******************************/
/*-------USER SCHEMA----------*/
/******************************/
var UserSchema = new Schema({
	name:			String,
	email:			{ type: String, lowercase: true },
	password:		String,
	paypal:			String,
	verification:	String,
	status:			String,
	facebookId:		Number,
	contacts:		[String],
//	eventsCreated:	[{ type: Schema.ObjectId, ref: 'Event' }],
	contributedTo:	[{
						_id:			Schema.ObjectId,	
						amount:			Number
					}],
	timeCreated:	{ type: Date, default: Date.now },
	lastLogin:		{ type: Date, default: Date.now },
	timeUpdated:	{ type: Date, default: Date.now }
}),
	User = db.model('User', UserSchema);

function sanitizeUser(user, isPublic){
	var retUser = {};
	retUser.id = user._id.toString();
	retUser.name = user.name || "";
	retUser.email = user.email;
	retUser.paypal = user.paypal || "";
	retUser.lastLogin = user.lastLogin || Date.now;
//	console.log("contacts:"+user.contacts);
	if(!isPublic){
		var contacts = [];
		user.contacts.forEach(function(contact){
			contacts.push({"invitee": contact});
		});
		retUser.contacts = contacts;
//		retUser.eventsCreated = user.eventsCreated || [];
		retUser.contributedTo = user.contributedTo || [];
	}
	return retUser;
}
	
/******************************/
/*-------EVENT SCHEMA---------*/
/******************************/	
var EventSchema = new Schema({
	hostId:			Schema.ObjectId,
	title:			String,
	status:			{ type: String, default: "new" },
	startTime:		Date,
	location:		String,
	description:	String,
	invitees:		[String],
	items:			String,
//	endTime:		Date,
	contributors:	[{
						_id:			Schema.ObjectId,
						amount:			Number
					}],
	timeCreated:	{ type: Date, default: Date.now },
	timeUpdated:	{ type: Date, default: Date.now }
}),
	Event = db.model('Event', EventSchema);

function sanitizeEvent(event){
	var retEvent = {};
	var rootdate = event.startTime;
	var thedate = String('00'+(rootdate.getMonth()+1)).slice(-2) + "/" + String('00'+rootdate.getDate()).slice(-2) + "/" + rootdate.getFullYear();
	var thehour = rootdate.getHours() % 12;
	var AMPM = ( thehour == rootdate.getHours() ) ? "AM" : "PM";
	thehour = thehour == 0 ? 12 : thehour;
	var thetime = thehour + ":" + String('00'+rootdate.getMinutes()).slice(-2) + " " + AMPM;
	retEvent.id = event._id.toString();
	retEvent.hostId = event.hostId.toString();
	retEvent.status = ( +new Date(event.startTime) < +new Date() ) ? "complete" : event.status;
	retEvent.title = event.title;
	retEvent.date = thedate;
	retEvent.friendlyDate = moment(new Date(event.startTime)).format("dddd, MMMM Do YYYY");
	retEvent.startTime = thetime;
	retEvent.location = event.location || "";
	retEvent.description = event.description || "";
	retEvent.invitees = event.invitees || [];
	retEvent.items = event.items || "";
//	retEvent.endTime = event.endTime || "";
	retEvent.contributors = event.contributors || [];
	retEvent.contributedTotal = 0;	
	event.contributors.forEach(function(contribution){
		retEvent.contributedTotal = retEvent.contributedTotal + contribution.amount;
	});
	return retEvent;
}

function sanitizeMyAccount(events){
	var returnObj = {};
	returnObj.events = [];
	returnObj.completeEvents = 0;
	returnObj.friendsInvited = 0;
	events.forEach(function(event){
		returnObj.events.push(sanitizeEvent(event));
		if( event.status !== "new" ){
			returnObj.friendsInvited = returnObj.friendsInvited + event.invitees.length;
			if( +new Date(event.startTime) < +new Date() ) ++returnObj.completeEvents;
		}
	});
	return returnObj;
}
		
/********************************/
/*----PASSPORT CONFIG/UTIL----- */
/********************************/

//serialize and deserialize functions
var ps = function(user, done) {
	done(null, user.id);
};
var pds = function(id, done) {
  User.findById(id, function (err, user) {
	var usrErr = userError(user, err);
	if(usrErr){ err = usrErr; }
	if (err) { return done(err); }	
	var retUser = sanitizeUser(user);
    done(err, retUser);
  });
};
passport.serializeUser(ps);
passportV.serializeUser(ps);
passport.deserializeUser(pds);
passportV.deserializeUser(pds);

function userError(user, err){
	err = err || [];
	if( typeof err == "string" ) err = [err];
	if(user.verification != "verified") err.push("User not verified!");
	if(user.status != "active") err.push("User disabled!");
	return _.isEmpty(err) ? false : err;
}

//normal login
passport.use(new LocalStrategy({
    usernameField: 'loginName',
    passwordField: 'loginPass'
  },
  function(email, password, done) {		
//    User.findOne({ email: email, verification: "verified" }).populate('contacts').exec( function(err, user) {
	email = email.toLowerCase();
    User.findOne({ email: email, verification: "verified" }, function(err, user) {
      if (err) { return done(err); }
      if (!user || user.status != "active") {
        return done(null, false, { message: 'Unknown or inactive user' });
      }
      if (user.password != password && user.password != Enc.encodePassword(password, cipher)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, sanitizeUser(user));
    });
  }
));

//facebook login
var FACEBOOK_APP_ID = "121057884668628";
var FACEBOOK_APP_SECRET = "6db0653a7ef3dfccc216334fa72e88bf";
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: url + "auth/facebook/callback/"
  },
  function(accessToken, refreshToken, profile, done) {
	console.log("accessToken"+accessToken+", refreshToken"+refreshToken+"\n profile:"+JSON.stringify(profile));
    User.findOne({ facebookId: profile.id }, function (err, user) {
		if(user){
			console.log("FB user found");
			return done(err, sanitizeUser(user));
		}else if(_.isEmpty(err)){
			var newFBUser = new User({
				email:			profile.username,
//				password:		Enc.encodePassword(password, cipher),
				verification: 	"verified",
				status:			"active",
				facebookId:		profile.id
			});
			newFBUser.save();
			console.log("newFBUser"+sanitizeUser(newFBUser));			
			return done(err, sanitizeUser(newFBUser));
		}else{
			console.log("failed");
			return done(err, null);
		}
    }); 
  }
));

//verification autologin
passportV.use(new LocalStrategyV({
    usernameField: 'vCode',
    passwordField: 'vCode'
  },
  function(vCode, password, done) {		
    User.findOne({ verification: vCode }, function(err, user) {
		if(!err && user){
			user.set('verification', 'verified');
			user.set('status', 'active');
			user.save();
			return done(null, sanitizeUser(user));
		}else{
			return done(null, false, { message: 'Verification error' });
		}
	});
  }
));

/*************************************/
/*-----EXPRESS ROUTING POSTS (AJAX) */
/***********************************/

/*  //using seq
app.post('/createUser', function(req, res){ Seq()
	.seq(function(){
		var errors = [];
		var email = sanitize(req.param('email')).trim();
		var password = sanitize(req.param('password')).trim();
		var confirm = sanitize(req.param('confirm')).trim();
		if(!v.check(email).isEmail()) errors.push("Email invalid!");
		if(!v.check(password).isAlphanumeric() || !v.check(password).len(6,40)) errors.push("Password must be alphanumeric and minimum of 6 characters!");
		if(password !== confirm) errors.push("Password mismatch!");
		this(!_.isEmpty(errors) ? errors : false);
	}).catch(function (err) {
		errors = err.stack ? err.stack : err;
		console.log(errors);
		res.send(prepAJAXreturn(false, false, errors));
		return		
	}).seq(function(){
		User.findOne({email: email}, this);
	}).seq(function(user){
		if(user && user.status != "pre") throw("Existing user!");
		this();
	}).catch(function (err) {
		errors = err.stack ? err.stack : err;
		console.log(errors);
		res.send(prepAJAXreturn(false, false, errors));
		return
	}).seq("newuser", function(){
		var vCode = genVerificationCode();
		var newuser = new User({
			email:			email,
			password:		Enc.encodePassword(password, cipher),
			verification: 	vCode,
			status:			"active"
		});
		newuser.save(this);
	}).catch(function (err) {
		errors = err.stack ? err.stack : err;
		console.log(errors);
		res.send(prepAJAXreturn(false, false, ["Error saving new user!"]));
		return
	}).seq(function(newuser){
		mailOptions.to = email; // list of receivers
		mailOptions.subject = "Please verify your Fundilio account!"; // Subject line
		mailOptions.html = "<b>Please go to this address to verify your account "+url+"verify/?vCode="+vCode+"</b>"; // html body
		smtpTransport.sendMail(mailOptions, this);
	}).catch(function (err) {
		errors = err.stack ? err.stack : err;
		console.log(errors);
		res.send(prepAJAXreturn(false, false, ["Error sending verification email!"]));
		this.vars[newuser].remove();
		return
	}).seq(function(response){
		console.log("Response:" + response);
		res.send(prepAJAXreturn(false, ["Please check your email to verify!"], false));
	});
;

*/
	
app.post('/createUser', function(req, res){ 	
	var errors = [];
	var email = sanitize(req.param('email')).trim();
	var password = sanitize(req.param('password')).trim();
	var confirm = sanitize(req.param('confirm')).trim();
	if(!v.check(email).isEmail()) errors.push("Email invalid!");
	if(!v.check(password).isAlphanumeric() || !v.check(password).len(6,40)) errors.push("Password must be alphanumeric and minimum of 6 characters!");
	if(password !== confirm) errors.push("Password mismatch!");
	if(!_.isEmpty(errors)){
		console.log(errors);
		res.send(prepAJAXreturn(false, false, errors));
		return
	};

	User.findOne({email: email}, function(err, user){
		if(err) console.log(err);
		if(user && user.status != "pre") errors.push("Existing user!");
		if(!_.isEmpty(errors)){
			console.log(errors);
			res.send(prepAJAXreturn(false, false, errors));
		} else {
			var vCode = genVerificationCode();
			var newuser = new User({
				email:			email,
				password:		Enc.encodePassword(password, cipher),
				verification: 	vCode,
				status:			"active"
			});
			newuser.save(function(err2){
				if(err2){
					console.log(err2);
					res.end();
				}else{
					mailOptions.to = email; // list of receivers
					mailOptions.subject = "Please verify your Fundilio account!"; // Subject line
					mailOptions.html = "<b>Please go to this address to verify your account "+url+"verify/?vCode="+vCode+"</b>"; // html body
					smtpTransport.sendMail(mailOptions, function(error, response){
						if(error){
							console.log(error);
							res.end();
						}else{
							console.log("Message sent: " + response.message);
						}
						smtpTransport.close(); // shut down the connection pool, no more messages
					});
					res.send(prepAJAXreturn(false, ["Please check your email to verify!"], false));
				}
			});			
		}
	});
});
app.post('/createEvent', function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	var errors = [];
	var title = sanitize(req.param('eventTitle')).trim();
	var date = sanitize(req.param('eventDate')).trim();
	var time = sanitize(req.param('eventStartTime')).trim();
	var dateString = date + " " + time;
	var startTime = new Date(dateString);
	var description = sanitize(req.param('eventDescription')).trim();        
	var invitees = (typeof req.param('eventInvitees') == "string" ? req.param('eventInvitees').split(",") : req.param('eventInvitees')) || [];
	invitees = invitees.filter(function(invitee){
		return v.check(invitee).isEmail();
	}).map(function(invitee){
		return sanitize(invitee).trim();	
	});	
	var items = sanitize(req.param('eventItems')).trim();        
//	var endTime = req.param('eventEndTime') ? new Date(date + " " + sanitize(req.param('eventEndTime')).trim()) : false;
	var location = sanitize(req.param('eventLocation')).trim();
	if(_.isEmpty(title)) errors.push("No title!");
	if(!v.check(dateString).isDate() || _.isEmpty(date) || _.isEmpty(time)) errors.push("Incorrect date/time!");
	Event.findOne({title: title, hostId: req.user.id}, function(err, event){
		if(err) console.log(err);
		if(event){
			if(startTime.toDateString() == event.startTime.toDateString()){
				if(event.status == "new"){
					event.remove();
				}else{
					errors.push("Duplicate event!");			
				}
			}
		}
		if(!_.isEmpty(errors)){
			console.log(errors);
			res.send(prepAJAXreturn(false, false, errors));
		} else {
			var newevent = new Event({
				hostId:			req.user.id,
				title:			title,
				startTime: 		startTime,
//				endTime: 		endTime || "",
				location: 		location,
				description: description,
				invitees: invitees,
				items:  items
			});
			newevent.save(function(err2){
				if(!err2) res.send(prepAJAXreturn(sanitizeEvent(newevent), false, false));
			});			
		}
	});
});
app.post('/updateEvent', function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	var errors = [];
	var id = req.param('eventId');
//	console.log("typeof:"+typeof id);
	var title = sanitize(req.param('eventTitle')).trim();
	var date = sanitize(req.param('eventDate')).trim();
	var time = sanitize(req.param('eventStartTime')).trim();
	var dateString = date + " " + time;
	var startTime = new Date(dateString);
	var description = sanitize(req.param('eventDescription')).trim();        
	var invitees = (typeof req.param('eventInvitees') == "string" ? req.param('eventInvitees').split(/[,;\s]/) : req.param('eventInvitees')) || [];
	invitees = invitees.filter(function(invitee){
		return v.check(invitee).isEmail();
	}).map(function(invitee){
		return sanitize(invitee).trim();	
	});	
	var items = sanitize(req.param('eventItems')).trim();        
//	var endTime = req.param('eventEndTime') ? new Date(date + " " + sanitize(req.param('eventEndTime')).trim()) : false;
	var location = sanitize(req.param('eventLocation')).trim();
	if(_.isEmpty(id)) errors.push("No event id!");
	if(_.isEmpty(title)) errors.push("No title!");
	if(!v.check(dateString).isDate() || _.isEmpty(date) || _.isEmpty(time)) errors.push("Incorrect date/time!");
	Event.findById(id, function(err, event){
		if(err) console.log(err);
		if(event.hostId.toString() != req.user.id) errors.push("Wrong user!");
		Event.findOne({title: title, hostId: req.user.id}, function(err2, duplicate){
			if(err2) console.log(err2);
			if(duplicate && id != duplicate._id.toString()){
				if(startTime.toDateString() == duplicate.startTime.toDateString()){
					if(duplicate.status == "new"){
						duplicate.remove();
					}else{
						errors.push("Duplicate event!");			
					}
				}
			}
			if(!_.isEmpty(errors)){
				console.log(errors);
				res.send(prepAJAXreturn(false, false, errors));
			} else {
				event.title = title;
				event.startTime = startTime;
	//			event.endTime = endTime || false;
				event.location = location;
				event.description = description;
				event.invitees = invitees;
				event.items = items;
				if(req.param('panel') == "send"){
					event.status = "active";
					event.timeUpdated = Date.now();
				}
				event.save(function(err3){
					if(!err3){
						if(!req.param('panel') || req.param('panel') == "1"){
							res.send(prepAJAXreturn(sanitizeEvent(event), false, false));								
						}else{
							User.findById(req.user.id, function(err, self){
								if( req.param('panel') === "2" ){
									invitees.forEach(function(invitee){
										User.findOne({email: invitee}, function(err, user){
											if(!user){
												var newuser = new User({
													email:			invitee,
													status:			"pre"
												});
												newuser.save();
											}
										});
										self.contacts.push(invitee);	
									});
									self.contacts = _.uniq(self.contacts);
									self.save();
									req.user = sanitizeUser(self);
									req.user.loadedEvent = sanitizeEvent(event);								
									res.send(prepAJAXreturn(req.user, false, false));								
								}else if( req.param('panel') === "send" ){
									Event.find({hostId: req.user.id}).sort('-timeUpdated').exec( function(err, events) {
										if(!err){
											var sendme = prepAJAXreturn(sanitizeMyAccount(events), false, false);
										}else{
											var sendme = prepAJAXreturn(false, false, "Error retrieving events!");				
										}
										res.send(sendme);
									});									
									mailOptions.to = invitees.join(", "); // list of receivers
									mailOptions.subject = "You have been invited to "+event.title+"!"; // Subject line
									mailOptions.html = "<b>Please go to this address to see details for this event "+url+"?eCode="+event._id.toString()+"</b>"; // html body
									smtpTransport.sendMail(mailOptions, function(error, response){
										console.log(!error ? "Message sent: " + response.message : error);										
										smtpTransport.close(); // shut down the connection pool, no more messages
									});
								}
							});	
						}
					}
				});
			}
		});
	});
});
app.post('/deleteEvent', function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	var errors = [];
	var id = req.param('eventId');
	Event.findById(id, function(err, event){
		if(!err && event.hostId.toString() == req.user.id) {
			event.remove();
			res.send(prepAJAXreturn(['Event deleted!'], false, false));
		}else{
			res.send(prepAJAXreturn(false, false, ['Wrong user or event!']));
		}
	});
});
app.post('/login', passport.authenticate('local'), function(req, res){
	res.send(prepAJAXreturn(req.user, false, false));
});
app.post('/logout',  function(req, res){
	req.logOut();
	res.send(prepAJAXreturn({"logout": "success"}, false, false));
});
app.post('/check',  function(req, res){
	console.log(req.param('eCode'));
	if(!_.isEmpty(req.param('eCode'))){
		Event.findById(req.param('eCode'), function(err, event){
			if(err) console.log(err);
			if(!event){			
				var sendme = prepAJAXreturn(false, false, ["Wrong event code!"]);		
			}else{
				var sendme = prepAJAXreturn(sanitizeEvent(event), false, false);		
			}
			res.send(sendme);
		});
	}else if(req.user){
		var sendme = prepAJAXreturn(req.user, false, false);
		res.send(sendme);
	}else{
		res.end();
	}
});
/*
app.post('/loadEvent',  function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	console.log("check1"+req.param('eventId'));
	Event.findOne({_id: req.param('eventId'), hostId: req.user.id}, function(err, event) {
		console.log("check2"+event._id.toString());
		if(!err){
			req.user.loadedEvent = sanitizeEvent(event);
		}
		res.end();
	});
});
app.post('/unloadEvent',  function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	delete req.user.loadedEvent;
	res.end();
});*/
app.post('/myAccount',  function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	Event.find({hostId: req.user.id}).sort('-timeUpdated').exec( function(err, events) {
		if(!err){
			var sendme = prepAJAXreturn(sanitizeMyAccount(events), false, false);
		}else{
			var sendme = prepAJAXreturn(false, false, "Error retrieving events!");				
		}
		res.send(sendme);
	});
});

/*************************************/
/*-----EXPRESS ROUTING GETS (BROWSE)*/
/***********************************/
app.get('/logout', function(req, res){
	if(!req.user){res.send(prepAJAXreturn(false, false, "No session!"));return}
	req.logOut();
	res.send(prepAJAXreturn({"logout": "success"}, false, false));
});
app.get('/verify', function(req, res, next){
	if(req.user) req.logOut();
	next();
});
app.get('/verify', 
	passportV.authenticate('local-verified', { failureRedirect: "/", successRedirect: "/" } ) );

app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res){ res.redirect('/'); });

app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){ res.redirect('/'); });

/******************************/
/*--------ENCRYPTION--------- */
/******************************/
var Enc = {
	cipher: cipher,	
	encodePassword: function ( pass, salt ){
		return Enc.encrypt(Enc.intersplice(pass, Enc.reverseString(salt)));
	},
	encrypt: function (string){
		var cipher = crypto.createCipher('aes-256-cbc',Enc.cipher)
		var crypted = cipher.update(string,'utf8','hex')
		crypted += cipher.final('hex')
		return crypted;
	},
	decrypt: function (string){
		var decipher = crypto.createDecipher('aes-256-cbc',Enc.cipher)
		var dec = decipher.update(string,'hex','utf8')
		dec += decipher.final('utf8')
		return dec;
	},
	intersplice: function(pass, salt){
		var passcnt = pass.length,
			saltcnt = salt.length,
			cnt = passcnt + saltcnt + 1,
			interspliced = "";
		for(var i=cnt;i>=0;i--){
			if( i % 2 === 0 && passcnt >= 0){
				interspliced = interspliced + pass.substring(passcnt,passcnt+1);
				passcnt--;
			}else if( i % 2 === 1 && saltcnt >= 0 ){
				interspliced = interspliced + salt.substring(saltcnt,saltcnt+1);
				saltcnt--;
			}
		}
		return interspliced;
	},
	reverseString: function(string){
		return string.split("").reverse().join("");
	}	
};
/******************************/
/*--------UTILS--------- */
/******************************/
	
function prepAJAXreturn(data,msg,err){
	return JSON.stringify({
		"data": data || "",
		"messages": msg || "",
		"errors": err || "",
	});
}	
function genVerificationCode(){
	return Math.ceil(Math.random()*1000000000000000000);
}
function calcContributions(theUser, eventIds){
	var contributions = {};
	contributions.count = 0;
	contributions.amount = 0;
	if(eventIds){
		if(typeof eventIds == "string")eventIds = [eventIds];
		theUser.eventsCreated = _.filter(theUser.eventsCreated, function(event){
			return _.indexOf(eventIds, event.id);
		});   
	}
	_.each(theUser.eventsCreated, function(event){
		contributions.count = contributions.count + obj.contributors.length;
		_.each(event.contributors, function(contributor){
			contributions.amount = contributions.amount + contributor.amount;
		});
	});	
	return contributions;
}

/******************************/
/* ------INITIATE-app----- */
/******************************/

app.listen(port);
console.log(url);