exports.render = function(req, res) {

	if (!req.user) { // if not logged in
		res.render("signin", {
			title: "Nguber - Sign In",
			messages: req.flash("error") || req.flash("info")
		});
	} else { // if logged in
		res.render("index", {
			title: "Nguber",
			firstName: req.user.fullName.split(" ")[0].toUpperCase(),
			messages: req.flash("error") || req.flash("info")
		});
	}
};