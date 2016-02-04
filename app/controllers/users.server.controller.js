/**
 * Module dependencies
 */
var User = require("mongoose").model("User");
var Driver = require("mongoose").model("Driver");
var Passenger = require("mongoose").model("Passenger");
var passport = require("passport");

/**
 * Return a unified error message from a Mongoose model object.
 * @param  {Object} err 	the error object
 * @return {String}     	the error message
 */
var getErrorMessage = function(err) {
	var message = "";

	if (err.code) {
		switch(err.code) {
			case 11000:
			case 11001:
				message = "Username already exists";
				break;
			default:
				message = "Something went wrong";
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}

	return message;
};

/**
 * GET: for route "/signin" - renders the sign-in page
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next
 */
exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render("signin", {
			title: "Nguber - Sign In",
			messages: req.flash("error") || req.flash("info")
		});
	} else {
		return res.redirect("/");
	}
};

// There will be no function for "/signin" route's POST method.
// We only use passport's authenticate() function.

/**
 * GET: for route "/signup" - renders the sign-up page
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next
 */
exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render("signup", {
			title: "Nguber - Sign Up",
			messages: req.flash("error")
		});
	} else {
		return res.redirect("/");
	}
};

var handleError = function(req, res, err) {
	var message = getErrorMessage(err);

	req.flash("error", message);
	return res.redirect("/signup");
};

exports.signup = function(req, res, next) {
    if (!req.user) {

        var body = req.body;
        var message = null;
    	var errorInput = false;

        // STEP 0: Make sure every input has a value
    	if (body.fullName === "") {
    		req.flash("error", "Full name is required");
    		errorInput = true;
    	} 
    	if (body.username === "") {
    		req.flash("error", "Username is required");
    		errorInput = true;
    	}
    	if (body.email === "") {
    		req.flash("error", "Email is required");
    		errorInput = true;
    	}
    	if ((body.password === "") || (body.passwordRepeat === "")) {
    		req.flash("error", "First and/or second passwords are required");
    		errorInput = true;
    	}
    	if (typeof body.userType === "undefined") {
    		req.flash("error", "User type must be defined (driver or passenger)");
    		errorInput = true;
    	}
    	if (body.userType === "Passenger" && body.cardNumber === "") {
    		req.flash("error", "Please enter your credit card number");
    		errorInput = true;
    	}
    	if (body.userType === "Driver" && body.licenseNumber === "") {
    		req.flash("error", "Please enter your driving license number");
    		errorInput = true;
    	}
    	if (body.homeAddress === "") {
    		req.flash("error", "Please enter your home address");
    		errorInput = true;	
    	}
    	if (body.phone === "") {
    		req.flash("error", "Please enter your phone number");
    		errorInput = true;	
    	}

        // STEP 1: Check for password & passwordRepeat
        if (body.password !== body.passwordRepeat) {
            req.flash("error", "The passwords must be the same");
            errorInput = true;
        }

        if (errorInput) {
	        return res.redirect("/signup");
        }

        // STEP 2: Identify whether user is a passenger / driver
        var user = null;
		var userType = body.userType;

        switch(userType) {
            case "Driver":
                user = new Driver(req.body);
                break;
            case "Passenger":
                user = new Passenger(req.body);
                break;
        }

        // STEP 3: Determine provider for authentication
		user.provider = "local";

        // STEP 4: Save the user
		console.log("About to save the user...");
		user.save(function(err) {
			console.log("Validating whether there's error....");
			if (err) {
				handleError(req, res, err);
			} else {
				req.flash("info", "You have successfully registered your account.");
				return res.redirect("/");
			}
		});
	} else {
		return res.redirect("/");
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect("/");
};

/**
 * CRUD methods for the "User" model
 */

exports.create = function(req, res, next) {
	var user = User(req.body);

	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	})
};

exports.listDrivers = function(req, res, next) {
	Driver.find({}, function(err, drivers) {
		if (err) {
			return next(err);
		} else {
			res.json(drivers);
		}
	});
}

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	});
};