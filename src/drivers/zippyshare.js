const Crawler = require("../lib/crawler");

module.exports = class ZippyShare extends Crawler {
	// API endpoint
	get endpoint() {
		return "https://www.zippysharedjs.com";
	}

	/**
	 * Search helper function
	 * @param  string query
	 * @param  Number page=1
	 */
	async performSearch(query, page = 1) {
		const data = [];

		let { pages } = await this.scrape(
			`${this.endpoint}/zippyshare/search?q=${query}#gsc.tab=0&gsc.q=${query}&gsc.page=${page}`,
			function () {
				var pages = [];

				// Get response data
				$("div.gs-webResult").each(function () {
					var name = $(this).children(":nth-child(1)").find("a").text().trim(),
						url = $(this).children(":nth-child(1)").find("a").attr("href");
					if (name && url) pages.push(url);
				});

				return { pages: pages };
			}
		);

		if (!pages) return { data };
		if (pages.length > this.perPage) pages = pages.slice(0, this.perPage);

		const promises = pages.map(async (p) => {
			const result = await this.scrape(p, function () {
				var name = $("tbody div#lrbox .left")
					.children(":nth-child(4)")
					.text()
					.trim();

				var path = $("tbody div#lrbox .right").find("a#dlbutton").attr("href");

				var size1 = $("tbody div#lrbox .left")
					.children(":nth-child(6)")
					.find("font:nth-child(2)")
					.text()
					.trim();

				var size2 = $("tbody div#lrbox .left")
					.children(":nth-child(7)")
					.text()
					.trim();

				var domain = $("head meta[property='og:url']")
					.attr("content")
					.split("/v/");

				var size = size1 || size2;

				return {
					name: name.substring(0, name.length - 2),
					url: "https:" + domain[0] + path,
					size: size.replace("3)", ""),
					key: domain[1].split("/")[0],
					path: path,
				};
			});

			if (result && result.name && result.path) {
				delete result.path;
				data.push(result);
			}
		});

		await Promise.all(promises);
		return { data };
	}

	/**
	 * Music search
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

			// Get and cache the response
			const data = await this.performSearch(query, page);
			await this.browser.close();
			await this.cache.set(cacheKey, data);

			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * Get list
	 * @param  string genre
	 * @param  Number page=1
	 */
	async list(page = 1, genre = "") {
		try {
			if (genre) genre = genre.replace(" ", "+");

			// Get from cache first
			const cacheKey = genre + page + this.endpoint;
			const cachedData = await this.cache.get(cacheKey);
			if (cachedData) return cachedData;

			let data;
			if (genre) data = await this.performSearch(genre, page);
			else {
				const response = await this.scrape(this.endpoint, function () {
					var results = [];

					// Get response data
					$("div.home-cool:nth(0)")
						.find("a")
						.each(function () {
							var name = $(this).children(".chip").text().trim(),
								url = $(this).attr("href");

							if (name && url)
								results.push({
									name,
									url: `https://www.zippysharedjs.com/${url.replace(" ", "+")}`,
								});
						});

					return results;
				});

				data = { data: response };
			}

			await this.browser.close();
			await this.cache.set(cacheKey, data);

			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
