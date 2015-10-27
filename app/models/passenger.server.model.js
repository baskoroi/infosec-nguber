var mongoose = require("mongoose");
var User = mongoose.model("User");
var Schema = mongoose.Schema;

var PassengerSchema = User.discriminator("Passenger", 
	new Schema({
        cardNumber: String
    })
);

mongoose.model("Passenger", PassengerSchema);