var mongoose = require("mongoose");
var User = mongoose.model("User");
var Schema = mongoose.Schema;

var DriverSchema = User.discriminator("Driver", 
	new Schema({
		licenseNumber: String
	})
);

mongoose.model("Driver", DriverSchema);