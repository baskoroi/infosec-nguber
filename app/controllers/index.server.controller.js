var mongoose = require("mongoose");
var Driver = mongoose.model("Driver");

exports.render = function(req, res) {

	// just in case
	function getDrivers() {
		var drivers = [];
		Driver.find({}).exec(function(err, results) {
			if (err) {
				var errorMsg = "Error loading drivers data.";
				req.flash("error", errorMsg);
				return console.log(errorMsg);
			} else {
				results.forEach(function(driver) {
					drivers.push(driver);
				});
				return drivers;
			}
		});
	}

	if (!req.user) { // if not logged in
		res.render("signin", {
			title: "Nguber - Sign In",
			messages: req.flash("error") || req.flash("info")
		});
	} else { // if logged in

		if (req.user.__t === "Passenger") {	// if user is a passenger
			res.render("index", {
				title: "Nguber",
				firstName: req.user.fullName.split(" ")[0].toUpperCase(),
				messages: req.flash("error") || req.flash("info")
			});
		} else if (req.user.__t === "Driver") {	// if user is a driver
			return res.redirect("/d/");
		} else { // if user is neither a passenger nor a driver
			req.flash("error", "We cannot sign you in. There is a problem with your account. You may consult to service@nguber.com");

			return res.redirect("/signin");
		}
	}
};

/**
 * Controller function ONLY for driver accounts
 * @param  {[type]} req 	request object
 * @param  {[type]} res 	response object
 */
exports.renderDriver = function(req, res) {
	res.render("index-driver", {
		title: "Nguber",
		firstName: req.user.fullName.split(" ")[0].toUpperCase(),
		messages: req.flash("error") || req.flash("info")
	});
};