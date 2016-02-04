var indexCtrl = require("../controllers/index.server.controller");

module.exports = function(app) {
	app.get("/", indexCtrl.render);

	app.get("/d/", indexCtrl.renderDriver);
}