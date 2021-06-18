const express = require("express");
const Raspar = require("../raspar");
const { notFoundHandler, errorHandler } = require("./utils");
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
			const error = new Error(`Driver not found: ${driver}`);
			next(error);
		}

		req.raspar = Raspar.resolve(driver);
		next();
	});

	app.get("/search", controller.search);
	app.use(notFoundHandler);

	// Global error handlers
	app.use(errorHandler);

	app.listen(port);
};
