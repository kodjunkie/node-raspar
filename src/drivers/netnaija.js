const Crawler = require("../lib/crawler");

module.exports = class NetNaija extends Crawler {
	// API endpoint
	get endpoint() {
		return "https://www.thenetnaija.co";
	}

	/**
	 * Search
	 * @param  string query
	 * @param  Number page=1
	 */
	async search(query, page = 1) {
		try {
			query = query.replace(" ", "+");

			// Get from cache first
			const cacheKey = query + page + this.endpoint;
			const cachedData = await this.cache.get(cacheKey);
			if (cachedData) return cachedData;

			const data = [];
			let { pages } = await this.scrape(
				`${this.endpoint}/search?t=${query}&folder=videos&page=${page}`,
				function () {
					var pages = [];

					// Get web pages
					$("div.search-results")
						.find("article")
						.each(function () {
							var url = $(this).children(".info").find("a").attr("href");
							if (url) pages.push(url);
						});

					return { pages: pages };
				}
			);

			if (!pages) return { data };
			if (pages.length > this.perPage) pages = pages.slice(0, this.perPage);

			const promises = pages.map(async (p) => {
				const result = await this.scrape(p, function () {
					var name = $(".video-entry h1.page-h1").text().trim();

					var banner = $(".post-body figure").find("img").attr("src");

					var description = $(".post-body").find("p").text().trim();

					var url = $(".download-block").find(".db-one:nth(0) a").attr("href");

					return {
						name: name,
						banner: banner,
						url: "https://www.thenetnaija.co" + url,
						description: description,
					};
				});

				if (result && result.name) {
					data.push(result);
				}
			});

			await Promise.all(promises);
			await this.browser.close();
			await this.cache.set(cacheKey, { data });

			return { data };
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * Get list
	 * @param  Number page=1
	 */
	async list(page = 1) {
		try {
			// Get from cache first
			const cacheKey = page + this.endpoint;
			const cachedData = await this.cache.get(cacheKey);
			if (cachedData) return cachedData;

			const data = [];
			let { pages } = await this.scrape(
				this.endpoint + "/videos/movies/page/" + page,
				function () {
					var pages = [];

					// Get web pages
					$("div.video-files")
						.find("article")
						.each(function () {
							var url = $(this).children(".info").find("a").attr("href");
							if (url) pages.push(url);
						});

					return { pages: pages };
				}
			);

			if (!pages) return { data };
			if (pages.length > this.perPage) pages = pages.slice(0, this.perPage);

			const promises = pages.map(async (p) => {
				const result = await this.scrape(p, function () {
					var name = $(".video-entry h1.page-h1").text().trim();

					var banner = $(".post-body figure").find("img").attr("src");

					var description = $(".post-body").find("p").text().trim();

					var url = $(".download-block").find(".db-one:nth(0) a").attr("href");

					return {
						name: name,
						banner: banner,
						url: "https://www.thenetnaija.co" + url,
						description: description,
					};
				});

				if (result && result.name) {
					data.push(result);
				}
			});

			await Promise.all(promises);
			await this.browser.close();
			await this.cache.set(cacheKey, { data });

			return { data };
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
