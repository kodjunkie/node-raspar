const express = require("express");
const Rasper = require("../raspar");
const error = require("./error-handler");
const controller = require("./controller");
const config = require("../config");

module.exports = (port) => {
	const app = express();
	app.use(express.urlencoded({ extended: false }));

	// Setup cors
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		next();
	});

	// Add driver instance to request
	app.use((req, res, next) => {
		const driver = req.query.driver || "zippyshare";
		const supportedDrivers = config.drivers;
		if (!supportedDrivers.includes(driver)) {
			const err = new Error(`Driver not found: ${driver}`);
			next(err);
		}

		req.driver = Rasper.resolve(driver.trim());
		next();
	});

	app.get("/search", controller.search);

	// Global error handlers
	app.use(error.notFoundRequest);
	app.use(error.errorHandler);

	app.listen(port);
};