const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const { swagger } = require("../config");
const swaggerUi = require("swagger-ui-express-updated");
const { notFoundHandler, errorHandler } = require("./utils");
const routes = require("./routes");
const { resolver } = require("./middleware");

module.exports = (port) => {
	const app = express();
	app.use(express.urlencoded({ extended: false }));

	// Setup cors
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
		next();
	});

	// API doc
	const swaggerSpecs = swaggerJsdoc(swagger);
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

	app.use(resolver, routes);

	app.use(notFoundHandler);

	// Global error handlers
	app.use(errorHandler);

	app.listen(port);
};
