process.env.NODE_ENV = process.env.NODE_ENV || "development";

var mongoose = require("./config/mongoose");
var express  = require("./config/express");
var passport = require("./config/passport");

var db       = mongoose();
var app      = express();
var passport = passport();

app.listen(8080);
console.log("Listening from http://localhost:8080");

// for external usage
module.exports = app;