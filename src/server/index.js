const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const { swagger } = require("../config");
const swaggerUi = require("swagger-ui-express");
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

	// Route not found
	app.use((req, res) => {
		res.status(404).json({
			error: {
				message: "Resource not found.",
				code: 404,
			},
		});
	});

	// Global error handlers
	app.use((error, req, res, next) => {
		if (error) {
			const message = error.message || "Oops, an error has occurred.";
			res.status(500).json({ error: { message: message } });
		}
		next();
	});

	app.listen(port);
};
