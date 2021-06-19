/**
 * Endpoint /search
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.search = (req, res, next) => {
	const query = req.query;
	req.raspar
		.search(query.q, query.page)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch(next);
};
