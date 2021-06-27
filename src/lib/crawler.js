const puppeteer = require("puppeteer");
const Cache = require("./cache");
const { cache: cacheConfig } = require("../config");

module.exports = class Crawler {
	constructor(options) {
		// Configure cache
		let cacheOptions;
		if (options) cacheOptions = options.cache;
		this.cache = new Cache(cacheConfig, cacheOptions);

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
			const browser = await puppeteer.launch({
				args: ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
			});

			try {
				const page = await browser.newPage();
				await page.goto(url, { waitUntil: "load", timeout: 0 });
				await page.addScriptTag({ path: require.resolve("jquery") });
				let response = await page.evaluate(transform);
				browser.close();
				return resolve(response);
			} catch (e) {
				browser.close();
				return reject(e);
			}
		});
	}
};
