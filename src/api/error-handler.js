/**
 * Global error handler
 * @param  {} error
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
exports.errorHandler = (error, req, res, next) => {
	if (error) {
		const message = error.message || "Oops, an error has occurred.";
		res.status(500).json({ error: { message: message } });
	}
	next();
};

/**
 * Handler not found requests
 * @param  {} req
 * @param  {} res
 */
exports.notFoundRequest = (req, res) => {
	res.status(404).json({
		error: {
			message: "Resource not found!",
			code: 404,
		},
	});
};
