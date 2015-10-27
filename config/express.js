var config      = require("./config");
var express     = require("express");
var morgan      = require("morgan");
var compression = require("compression");
var bodyParser  = require("body-parser");
var session     = require("express-session");
var flash       = require("connect-flash");
var passport    = require("passport");

module.exports = function() {
	// initialize app var with express module
	var app = express();

	// modules to use (depending on NODE_ENV)
	if (process.env.NODE_ENV === "development") {
		app.use(morgan("dev"));
	} else if (process.env.NODE_ENV === "production") {
		app.use(compression());
	}

	// body-parser middlewares
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// sessions
	app.use(session({
		// values below are set to false: for parallel multiple-requests handling
		saveUninitialized: false,
		resave: false,
		secret: config.sessionSecret
	}));

	// templating engine + views
	app.set("views", "./app/views");
	app.set("view engine", "ejs");

	// middleware for flash storage (to store error/info messages)
	app.use(flash());

	// passport middlewares
	app.use(passport.initialize());
	app.use(passport.session());
	
	// initializing routes for the application
	var indexRoute = require("../app/routes/index.server.routes");
	var usersRoute = require("../app/routes/users.server.routes");

	indexRoute(app);
	usersRoute(app);

	// set directory for static files (.css, .js, .etc)
	app.use(express.static("./public"));

	return app;
}