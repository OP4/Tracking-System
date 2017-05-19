/* THIS FILE DEFINES THE USER SCHEMA STORED IN THE DATABASE */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Bcrypt is a library for the password hashes

// Definition of the user's information schema
var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
		first_name: String,
		last_name: String,
		email: String
	},
	facebook: {
		id: String,
		name: String,
		token: String,
		email: String,
	},
	google: {
		id: String,
		name: String,
		token: String,
		email: String,
	},
	slack: {
		id: String,
		name: String,
		token: String,
	},
/*    
	first_name: {type: String},
	last_name: {type: String},
	id_code: {type: String},
	id_cobot: {type: String},
	id_slack: {type: String},
	role: {type: String},
	email: {type: String},
	email_bis: {type: String},
	phone_number: {type: String},
	age: {type: Number},
	birth_date: {type: Date},
	address: {
		street: {type: String},
		zip_code: {type: String},
		location: {type: String},
		country: {type: String}
	},
	presence: {type: Boolean},
	hour_arrival: {type: Date},
	begin_time_booking: {type: Date},
	end_time_booking: {type: Date}
*/
});

/* 
Function which hashes the password when stored in the database. The "salt" is a randomly generated string of text added to the crypted
password so that it can never be hacked thanks to hash tables.
*/
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

// Function which enables the comparison between the password encoded by the user and the password crypted in the database.
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
