const puppeteer = require("puppeteer");
const Cache = require("./cache");

module.exports = class Crawler {
	constructor(options) {
		this.cache = new Cache(options);

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
	 * @param  function transform
	 */
	browse(url, transform) {
		return new Promise(async (resolve, reject) => {
			try {
				const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
				const page = await browser.newPage();
				await page.goto(url, { waitUntil: "load", timeout: 0 });
				await page.addScriptTag({ path: require.resolve("jquery") });
				let response = await page.evaluate(transform);
				browser.close();
				return resolve(response);
			} catch (e) {
				return reject(e);
			}
		});
	}
};
