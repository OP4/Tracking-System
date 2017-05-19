/* THIS FILE DEFINES THE ROUTES ACCESSIBLE FROM THE HOME PAGE BEFORE AUTHENTICATION */

var User = require('../models/user'); // Collects the user's information from the Mongoose schema defined in the "user.js" file

// Call of a function that use the "passport" module to verify that the user is successfully logged in
module.exports = function(router, passport){
	
	//The app automaticly redirects the basic url to /home
	router.get('/', (req, res) => {res.redirect('/home')});
	
	// The home page has a different display depending on if the user is autenticated or not.
	router.get('/home', (req, res) => {		
		if(req.isAuthenticated()) {
			res.render('home_page_after_auth.html');
		} else {
			req.isUnauthenticated();
			res.render('home_page.html');
		};
	});

	// While trying to log in, the login page is rendered and a "flash" message is set up in case of bad information encoding 
	router.get('/login', (req, res) => {res.render('login.html', { message: req.flash('loginMessage')})});
	// If the authentication succeeds, the user is redirected to his profile, otherwise he is redirected to the home page.
	router.post('/login', passport.authenticate('local-login', {successRedirect: '/profile', failureRedirect: '/', failureFlash: true}));

	// While trying to sign up, the signup page is rendered and a "flash" message is set up in case of bad information encoding
	router.get('/signup', (req, res) => {res.render('signup.html', { message: req.flash('signupMessage')})});
	// If the authentication succeeds, the user is redirected to the home page, otherwise he is redirected to the signup page.
	router.post('/signup', passport.authenticate('local-signup', {successRedirect: '/', failureRedirect: '/signup', failureFlash: true}));

	// Authenticates the user with Facebook and retrieves the email as additionnal scope
	router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	// If the authentication succeeds, the user is redirected to the profile page, otherwise he is redirected to the home page.
	router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' }));

	// Authenticates the user with Google+ and retrieves the profile and email as additionnal scopes
	router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
	// If the authentication succeeds, the user is redirected to the profile page, otherwise he is redirected to the home page.
	router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/' }));
	
	// Authenticates the user with Slack
	router.get('/auth/slack', passport.authenticate('slack'));
	// If the authentication succeeds, the user is redirected to the profile page, otherwise he is redirected to the home page.
	router.get('/auth/slack/callback', passport.authenticate('slack', { failureRedirect: '/' }), (req,res) => res.redirect('/profile'));

	// If the user is authenticated, he is redirected towards the profile page, otherwise he is redirected to the home page.
	router.get('/profile', (req, res) => {
        if(req.isAuthenticated()) {
            res.render('profile_page.html', { user: req.user });
        } else {
            req.isUnauthenticated();
            res.redirect('/');
        };
    });
};
