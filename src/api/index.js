const express = require("express");
const Raspar = require("../lib/raspar");
const { notFoundHandler, errorHandler } = require("./utils");
const controller = require("./controller");
const { drivers, defaultDriver } = require("../config");

module.exports = (port) => {
	const app = express();
	app.use(express.urlencoded({ extended: false }));

	// Setup cors
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET");
		next();
	});

	// Add driver instance to request
	app.use((req, res, next) => {
		const supportedDrivers = drivers;
		const driver = req.query.driver || defaultDriver;
		if (!supportedDrivers.includes(driver)) {
			const error = new Error(`Driver not found: ${driver}`);
			next(error);
		}

		req.raspar = Raspar.resolve({ driver });
		next();
	});

	app.get("/search", controller.search);
	app.use(notFoundHandler);

	// Global error handlers
	app.use(errorHandler);

	app.listen(port);
};
