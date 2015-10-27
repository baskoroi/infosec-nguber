var config   = require("./config");
var mongoose = require("mongoose");

module.exports = function() {
	var db = mongoose.connect(config.db);

	require("../app/models/user.server.model");
	require("../app/models/driver.server.model");
	require("../app/models/passenger.server.model");

	return db;
}