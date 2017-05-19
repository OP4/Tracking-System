/* THIS FILE DEFINES THE ROUTES ACCESSIBLE FROM THE PROFILE PAGE */


module.exports = function(router,passport) {

    // If the user wants to dissociate his local credentials from his other authentication methods
	router.get('/unlink/local', (req,res) => {
		var user = req.user;
		user.local.username = null; // username is reinitialized
		user.local.password = null; // password is reinitialized
		user.save((err) => {
			if (err) throw err;
			res.redirect('/profile');
		});
	});

	// If the user wants to dissociate his Facebook credentials from his other authentication methods
	router.get('/unlink/facebook', (req,res) => {
		var user = req.user;
		user.facebook.token = null; // token is reinitialized
		user.save((err) => {
			if (err) throw err;
			res.redirect('/profile');
		});
	});
	
	// If the user wants to dissociate his Google+ credentials from his other authentication methods
	router.get('/unlink/google', (req,res) => {
		var user = req.user;
		user.google.token = null; // token is reinitialized
		user.save((err) => {
			if (err) throw err;
			res.redirect('/profile');
		});
	});

	// If the user wants to dissociate his Slack credentials from his other authentication methods
	router.get('/unlink/slack', (req,res) => {
		var user = req.user;
		user.slack.token = null; // token is reinitialized
		user.save((err) => {
			if (err) throw err;
			res.redirect('/profile');
		});
	});

	// If the user wants to log out, his session can be ended manually and he is redirected to the home page.
	router.get('/logout', (req,res) => {
		req.logout();
		res.redirect('/home');
	});
	
	/*
	 If the user is already authenticated with Facebook, Google+ or Slack but wants to add a local authentication method,
	 another login page will be rendered and a "flash" message is set up in case of bad information encoding. If the user
	 authenticated with success, he is redirected to the profile page, otherwise he is redirected to the new login page.
	*/
	router.get('/connect/local', (req, res) => {res.render('connect_local.html', { message: req.flash('signupMessage')})});
	router.post('/connect/local', passport.authenticate('local-signup', {successRedirect: '/profile', failureRedirect: '/connect/local', failureFlash: true}));

}