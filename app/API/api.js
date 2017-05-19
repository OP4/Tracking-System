/* THIS FILE DEFINES THE API OF THE APPLICATION /!\ NEEDS TO BE CORRECTED /!\ */

const express = require('express');
const router = express.Router(); // Calls a routing function defined in Express to make GET,POST,PUT,DELETE,... requests to the app's API
const User = require('../models/user'); // Collects the user's information from the Mongoose schema defined in the "user.js" file

//Function to get the list of all the users registered in the app
module.exports.getUsersList = function(callback, limit) {
    User.find(callback).limit(limit);
};

// Definition of the request to get the list of all the users registered in the app
router.get('/api/user/', (req,res) => {
    User.getUsersList((err, users_list) => {
        if(err) throw err;
        res.json(users_list);
    });
});

// Function to get the information of a specific user registered in the app thanks to his ID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

// Definition of the request to get the information of a specific user
router.get('/api/user/:_id', (req,res) => {
    User.getUserById(req.params._id, (err, user) => {
        if(err) throw err;
        res.json(user);
    });
});

// Function to create a new user in the app
module.exports.addUser = function(user, callback){
    User.create(user, callback);
};

/* 
Definition of the request to create a new user in the app 
Might need to be modified - Need to take care of security issues in a production environment
*/
router.post('/api/user/', (req,res) => {
    var user = req.body;
    User.addUser(user, (err, user) => {
        if(err) throw err;
        res.json(user);
    });
});

// Function to update a user's information identified by his ID
module.exports.updateUser = function(id,user,options,callback){
	var query = {_id: id};
	var update = {
		first_name: user.first_name,
		last_name: user.last_name,
		id_code: user.id_code,
		id_cobot: user.id_cobot,
		id_slack: user.id_slack,
		role: user.role,
		email: user.email,
		email_bis: user.email_bis,
		phone_number: user.phone_number,
		age: user.age,
		birth_date: user.birth_date,
		address: {
			street: user.street,
			zip_code: user.zip_code,
			location: user.location,
			country: user.country
		},
		presence: user.presence,
		hour_arrival: user.hour_arrival,
		begin_time_booking: user.begin_time_booking,
		end_time_booking: user.end_time_booking
	};
	User.findOneAndUpdate(query,update,options,callback);
};

// Definition of the request to update a user's information
router.put('/api/user/:_id', (req,res) => {
    var id = req.params._id;
	var user = req.body;
    User.updateUser(id, user, {}, (err, user) => {
        if(err) throw err;
        res.json(user);
    });
});

// Function to remove a user from the database
module.exports.removeUser = function(id, callback){
	var query = {_id: id};
	User.remove(query, callback);
};

// Definition of the request to remove a user
router.delete('/api/user/:_id', (req,res) => {
    var id = req.params._id;
    User.removeUser(id, (err, user) => {
        if(err) throw err;
        res.json(user);
    });
});

module.exports = router;
