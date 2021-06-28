const { validationResult } = require("express-validator");

/**
 * Endpoint /search
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.search = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(422)
			.json({ error: { message: "Invalid query parameter" } });
	}

	const { query, page } = req.query;
	req.raspar
		.search(query, page)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch(next);
};

/**
 * Endpoint /list
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.list = (req, res, next) => {
	const query = req.query;
	const page = query.page || 1;

	req.raspar
		.list(page, query.genre)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch(next);
};
