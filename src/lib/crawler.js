const Cache = require("./cache");
const puppeteer = require("puppeteer-extra");
const { cache: cacheConfig, perPage } = require("../config");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AnonymizeUA = require("puppeteer-extra-plugin-anonymize-ua");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

puppeteer.use(AnonymizeUA({ stripHeadless: true, makeWindows: true }));
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

module.exports = class Crawler {
	constructor(options) {
		// Configure cache
		let cacheOptions;
		if (options) cacheOptions = options.cache;
		this.cache = new Cache(cacheConfig, cacheOptions);

		// Browser launch check
		this.isLaunched = false;

		// Results per page
		this.perPage = options && options.perPage ? options.perPage : perPage;

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

	/*
	 * Initialize the browser
	 * Ensure only a browser is running
	 */
	async launchBrowser() {
		if (!this.isLaunched) {
			this.browser = await puppeteer.launch({
				args: [
					"--disable-gpu",
					"--no-sandbox",
					"--disable-dev-shm-usage",
					"--disable-setuid-sandbox",
					"--disable-infobars",
					"--window-position=0,0",
					"--ignore-certifcate-errors",
					"--ignore-certifcate-errors-spki-list",
					`--window-size=${1024 + Math.floor(Math.random() * 100)},${
						768 + Math.floor(Math.random() * 100)
					}`,
					"--disable-features=IsolateOrigins,site-per-process",
					"--blink-settings=imagesEnabled=true",
				],
				headless: true,
				ignoreHTTPSErrors: true,
				slowMo: 0,
			});

			this.isLaunched = true;
		}
	}

	/**
	 * Web crawler
	 * @param url
	 * @param transform
	 */
	scrape(url, transform) {
		return new Promise(async (resolve, reject) => {
			try {
				await this.launchBrowser();
				const page = await this.browser.newPage();
				await page.setCacheEnabled(false);
				await page.goto(url, { waitUntil: "load", timeout: 0 });
				await page._client.send("Network.clearBrowserCookies");
				await page.addScriptTag({ path: require.resolve("jquery") });
				const response = await page.evaluate(transform);
				return resolve(response);
			} catch (error) {
				return reject(error);
			}
		});
	}
};
