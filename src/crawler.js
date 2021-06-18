const nodePhantom = require("node-phantom-simple");
const phantomJs = require("phantomjs");

module.exports = class Crawler {
	constructor() {
		// Throw error for methods not found
		return new Proxy(this, {
			get: function (driver, property) {
				// If method exists
				if (property in driver) return driver[property];
				// Else
				return function () {
					throw new Error("No implementation found!");
				};
			},
		});
	}

	/**
	 * Web crawler
	 * @param  {} url
	 * @param  {} transform
	 * @param  {} timeout=1500 Here, we are waiting 1.5 seconds.
	 */
	browse(url, transform, timeout = 1500) {
		return new Promise((resolve, reject) => {
			return nodePhantom.create(
				{ path: phantomJs.path },
				function (err, browser) {
					if (err) reject(err);
					return browser.createPage(function (err, page) {
						if (err) reject(err);
						return page.open(url, function (err, status) {
							if (err) reject(err);
							page.includeJs(
								"http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
								function (err) {
									if (err) reject(err);
									setTimeout(function () {
										return page.evaluate(transform, function (err, response) {
											if (err) reject(err);
											resolve(response);
											browser.exit();
										});
									}, timeout);
								}
							);
						});
					});
				}
			);
		});
	}
};
