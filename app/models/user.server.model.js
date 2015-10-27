/**
 * Basic User Schema
 *
 * Has discriminators (inherited schema): "Driver" and "Passenger"
 */

/**
 * Module dependencies
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

/**
 * Schema for "User" (base class)
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
var UserSchema = new Schema({
	
	/**
	 * User's full name
	 */
	fullName: {
		type: String,
		required: true
	},
	
	/**
	 * Username
	 */
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},

	/**
	 * User's email
	 */
	email: {
		type: String,
		required: true,
		match: [new RegExp(".+\@.+\..+"), "Please fill a valid e-mail address"]
	},

	/**
	 * User's password
	 */
	password: {
		type: String,
		required: true,
		validate: [
			function(password) {
				return password && password.length >= 6;
			}, "Password should be 6 characters or longer"
		]
	},

	/**
	 * User's password salt
	 */
	salt: String, 
	
	/**
	 * User's home address
	 */
	homeAddress: String,

	/**
	 * User's phone number
	 */
	phone: String, 

	/**
	 * Provider for Passport Auth
	 */
	provider: {
		type: String,
		required: "Provider is required"
	},
	providerId: String,
	providerData: {},

	/**
	 * Timestamp(s)
	 */
	created: {
		type: Date,
		default: new Date()
	}
});

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({ username: new RegExp(username, "i") }, callback);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || "");

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString("base64");
};

UserSchema.pre("save", function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64");
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.post("save", function(next) {
	if (this.isNew) {
		console.log("A new user was created.");
	} else {
		console.log("A user has updated their details.");
	}
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

/**
 * Creates the "User" model
 */
mongoose.model("User", UserSchema);