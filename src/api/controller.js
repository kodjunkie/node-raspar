/**
 * Endpoint /search
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.search = (req, res, next) => {
	const query = req.query;
	req.driver
		.search(query.q, query.page)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => next(error));
};