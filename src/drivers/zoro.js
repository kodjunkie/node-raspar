const Crawler = require("../lib/crawler");

module.exports = class Zoro extends Crawler {
	// API endpoint
	get endpoint() {
		return "https://zoro.to";
	}

	/**
	 * Search anime
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

			const response = await this.scrape(
				`${this.endpoint}/search?keyword=${query}&type=1&page=${page}`,
				function () {
					var data = [];

					// Get web pages
					$(".tab-content:nth(0) .film_list-wrap")
						.find(".flw-item")
						.each(function (index) {
							var details = $(this).children(".film-detail");

							var name = details.find("a").text().trim();

							var url = details.find("a").attr("href");

							var description = details.find(".description").text().trim();

							var banner = $(this)
								.children(".film-poster")
								.find("img")
								.attr("data-src");

							if (url && name)
								data.push({
									name,
									banner,
									url: "https://zoro.to/watch" + url,
									description,
								});

							// 12 per page
							// perPage from config cannot be used here
							if (index >= 11) return false;
						});

					return { data };
				}
			);

			await this.browser.close();
			await this.cache.set(cacheKey, response);

			return response;
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

			const response = await this.scrape(
				this.endpoint + "/movie?page=" + page,
				function () {
					var data = [];

					// Get web pages
					$(".tab-content:nth(0) .film_list-wrap")
						.find(".flw-item")
						.each(function (index) {
							var details = $(this).children(".film-detail");

							var name = details.find("a").text().trim();

							var url = details.find("a").attr("href");

							var description = details.find(".description").text().trim();

							var banner = $(this)
								.children(".film-poster")
								.find("img")
								.attr("src");

							if (url && name)
								data.push({
									name,
									banner,
									url: "https://zoro.to/watch" + url,
									description,
								});

							// 12 per page
							// perPage from config cannot be used here
							if (index >= 11) return false;
						});

					return { data };
				}
			);

			await this.browser.close();
			await this.cache.set(cacheKey, response);

			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
