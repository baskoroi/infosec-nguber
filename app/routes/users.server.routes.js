var usersCtrl = require("../controllers/users.server.controller");
var passport = require("passport");

module.exports = function(app) {

	app.route("/signin").
		get(usersCtrl.renderSignin).
		post(passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/signin",
			failureFlash: true
		}));

	app.route("/signout").
		get(usersCtrl.signout);

	app.route("/signup").
		get(usersCtrl.renderSignup).
		post(usersCtrl.signup);

	app.route("/users").
		get(usersCtrl.list).
		post(usersCtrl.create);

	app.route("/users/:userId").
		get(usersCtrl.read).
		put(usersCtrl.update).
		delete(usersCtrl.delete);

	app.param("userId", usersCtrl.userByID);
}