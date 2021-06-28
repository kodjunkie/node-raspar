const Raspar = require("../lib/raspar");
const { query } = require("express-validator");
const { drivers, defaultDriver } = require("../config");

/**
 * Resolves the driver
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.resolver = (req, res, next) => {
	const driver = req.query.driver || defaultDriver;
	if (!drivers.includes(driver)) {
		const error = new Error(`Driver not found: ${driver}`);
		next(error);
	}

	req.raspar = Raspar.resolve({ driver });
	next();
};

exports.searchValidator = [query("query").notEmpty().trim()];
