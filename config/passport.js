/* THIS FILE DEFINES THE STRATEGIES TO AUTHENTICATE THE USER AND RETRIEVE HIS INFORMATION, EITHER IN LOCAL OR WITH FACEBOOK, GOOGLE OR SLACK */

// Module Exports
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var SlackStrategy = require('passport-slack').Strategy;

var User = require('../app/models/user'); // Collects the user's information from the Mongoose schema defined in the "user.js" file
var configAuth = require('./auth'); // Collects the information stored in the "auth.js" file

module.exports = function(passport) {

	/* 
	Serialization is the process of translating data structures or object state into a format that can be stored and reconstructed
	later in the same or another computer environment.
	*/
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	// Reverse process of the serialization
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	// Definition of the local strategy to sign up a user
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true // Allows to add additional form fields to the function below
	},
	function(req, username, password, done, firstName, lastName, emailAdd){
		process.nextTick(function(){
			User.findOne({'local.username': username}, function(err, user){
				if(err) {return done(err);};
				if(user) {return done(null, false, req.flash('signupMessage', 'That username is already taken'));};
				if(!req.user) {
					var newUser = new User();
					newUser.local.username = username;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.first_name = firstName;
					newUser.local.last_name = lastName;
					newUser.local.email = emailAdd;

					newUser.save(function(err){
						if(err) throw err;
						return done(null, newUser);
					});
				} else {
                    			var user = req.user;
					user.local.username = username;
					user.local.password = user.generateHash(password);
					user.local.first_name = firstName;
					user.local.last_name = lastName;
					user.local.email = emailAdd;

					user.save(function(err){
						if(err) throw err;
						return done(null, user);
					})
                		};
			});
		});
	}));
	
	// Definition of the local strategy to log in a user
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true // Allows to add additional form fields to the function below
	}, function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({ 'local.username': username}, function(err, user){
				if(err) return done(err);
				if(!user) return done(null, false, req.flash('loginMessage', 'No User found'));
				if(!user.validPassword(password)){return done(null, false, req.flash('loginMessage', 'invalid password'))};	}
				return done(null, user);
			});
		});
	}));
	
	// Definition of the Facebook strategy
	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
        	profileFields: configAuth.facebookAuth.profileFields,
		callbackURL: configAuth.facebookAuth.callbackURL,
        	passReqToCallback: true // Allows to add additional form fields to the function below
	}, function(req, accessToken, refreshToken, profile, done) {
		process.nextTick(function(){
	    		if(!req.user){
                		User.findOne({'facebook.id': profile.id}, function(err, user){
	    				if(err) return done(err);
	    			    if(user) {
				    	if (!user.facebook.token) {
						user.facebook.token = accessToken;
						user.facebook.name = profile.displayName;
	    				    	user.facebook.email = profile.emails[0].value;
						user.save((err) => {if(err) throw err;});
					};
	    				return done(null, user);
	    			    } else {
                            	    	console.log(profile);
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.displayName;
	    				newUser.facebook.email = profile.emails[0].value;
	    				newUser.save(function(err){
	    					if(err) throw err;
	    					return done(null, newUser);
	    				});
	    			    };
	    			});
	    	    } else {
                    	var user = req.user;
	    		user.facebook.id = profile.id;
	    		user.facebook.token = accessToken;
	    		user.facebook.name = profile.displayName;
	    		user.facebook.email = profile.emails[0].value;
	    		user.save(function(err){
	    			if(err) throw err;
	    			return done(null, user);
	    		});
		    };
		});
	}));
	
	// Definition of the Google+ strategy
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
	    	clientSecret: configAuth.googleAuth.clientSecret,
	    	callbackURL: configAuth.googleAuth.callbackURL,
        	passReqToCallback: true // Allows to add additional form fields to the function below
	}, function(req, accessToken, refreshToken, profile, done) {
		process.nextTick(function(){
	    		if(!req.user){	    		
                    		User.findOne({'google.id': profile.id}, function(err, user){
	    				if(err) return done(err);
	    			    	if(user){
						if (!user.google.token) {
							user.google.token = accessToken;
							user.google.name = profile.displayName;
	    				    		user.google.email = profile.emails[0].value;
							user.save((err) => {if(err) throw err;});
						};
	    				    	return done(null, user);
	    			    	} else {
                            			console.log(profile);
	    				    	var newUser = new User();
	    				    	newUser.google.id = profile.id;
	    				    	newUser.google.token = accessToken;
	    				    	newUser.google.name = profile.displayName;
	    				    	newUser.google.email = profile.emails[0].value;
	    				    	newUser.save(function(err){
	    						if(err) throw err;
	    					    	return done(null, newUser);
	    				    	})
	    			    	}
	    		    	});
                	} else {
	    			var user = req.user;
	    			user.google.id = profile.id;
				user.google.token = accessToken;
				user.google.name = profile.displayName;
				user.google.email = profile.emails[0].value;
				user.save(function(err){
					if(err) throw err;
					return done(null, user);
				});                    
                	};
		});
	}));
	
	// Definition of the Slack strategy
	passport.use(new SlackStrategy({
		clientID: configAuth.slackAuth.clientID,
		clientSecret: configAuth.slackAuth.clientSecret,
		callbackURL: configAuth.slackAuth.callbackURL,
		scope: configAuth.slackAuth.scope,
		passReqToCallback: true // Allows to add additional form fields to the function below
	}, function(req, accessToken, refreshToken, profile, done) {
		process.nextTick(function(){
	    		if(!req.user){
                    		User.findOne({'slack.id': profile.id}, function(err, user){
	    				if(err) return done(err);
	    				if(user) {
						if (!user.slack.token) {
							user.slack.token = accessToken;
							user.save((err) => {if(err) throw err;});
						};
	    				    	return done(null, user);
	    			   	} else {
                            			console.log(profile);
	    				    	var newUser = new User();
	    				    	newUser.slack.id = profile.id;
						newUser.slack.token = accessToken;
		    				newUser.save(function(err){
	    						if(err) throw err;
	    					    	return done(null, newUser);
	    				    	});
	    			    	};
	    		    	});
	    	    	} else {
                    		var user = req.user;
	    			user.slack.id = profile.id;
				user.slack.token = accessToken;
	    			user.save(function(err){
	    				if(err) throw err
	    				return done(null, user);
	    			});
                	};
	        });		
	}));
};
