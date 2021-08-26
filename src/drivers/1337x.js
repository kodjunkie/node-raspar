const Crawler = require("../lib/crawler");

module.exports = class One337x extends Crawler {
	// API endpoint
	get endpoint() {
		return "https://1337x.to";
	}

	/**
	 * Search torrent
	 * @param  string query
	 * @param  Number page=1
	 */
	async search(query, page = 1) {
		try {
			query = query.replace(" ", "+");

			// Get from cache first
			const cacheKey = query + page + this.endpoint;
			const cachedResponse = await this.cache.get(cacheKey);
			if (cachedResponse) return cachedResponse;

			const data = [];
			let { links } = await this.scrape(
				`${this.endpoint}/search/${query}/${page}/`,
				function () {
					var links = [];

					// Get response data
					$("table.table-list tbody tr").each(function () {
						var path = $(this)
								.children("td.name")
								.find("a:nth(1)")
								.attr("href")
								.trim(),
							seeds = $(this).children("td.seeds").text().trim(),
							leeches = $(this).children("td.leeches").text().trim(),
							size = $(this)
								.children("td.size")
								.contents()
								.get(0)
								.nodeValue.trim();
						if (path && size) links.push({ size, path, seeds, leeches });
					});

					return { links: links };
				}
			);

			if (!links) return { data };
			if (links.length > this.perPage) links = links.slice(0, this.perPage);

			const promises = links.map(async (link) => {
				const result = await this.scrape(
					this.endpoint + link.path,
					function () {
						var name = $("div.box-info-heading h1").text().trim();

						var description = $("div#mCSB_1_container p").text().trim();

						var url = $("ul.dropdown-menu li:nth(1)")
							.find("a")
							.attr("href")
							.trim();

						var magnetic_link = $(
							"div.torrent-detail-page div:nth-child(1) ul:nth(0)"
						)
							.children("li:nth(0)")
							.find("a:nth(0)")
							.attr("href")
							.trim();

						return {
							name: name,
							description: description,
							url: url,
							magnetic_link: magnetic_link,
						};
					}
				);

				if (result && result.name && result.url) {
					delete link.path;
					data.push({ ...result, ...link });
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
			const cacheKey = this.endpoint;
			const cachedResponse = await this.cache.get(cacheKey);
			if (cachedResponse) return cachedResponse;

			const data = [];
			let { links } = await this.scrape(`${this.endpoint}/home/`, function () {
				var links = [];

				// Get response data
				$("table.table-list:nth(0) tbody tr").each(function () {
					var path = $(this)
							.children("td.name")
							.find("a:nth(1)")
							.attr("href")
							.trim(),
						seeds = $(this).children("td.seeds").text().trim(),
						leeches = $(this).children("td.leeches").text().trim(),
						size = $(this)
							.children("td.size")
							.contents()
							.get(0)
							.nodeValue.trim();
					if (path && size) links.push({ size, path, seeds, leeches });
				});

				return { links: links };
			});

			if (!links) return { data };
			if (links.length > this.perPage) links = links.slice(0, this.perPage);

			const promises = links.map(async (link) => {
				const result = await this.scrape(
					this.endpoint + link.path,
					function () {
						var name = $("div.box-info-heading h1").text().trim();

						var description = $("div#mCSB_1_container p").text().trim();

						var url = $("ul.dropdown-menu li:nth(1)")
							.find("a")
							.attr("href")
							.trim();

						var magnetic_link = $(
							"div.torrent-detail-page div:nth-child(1) ul:nth(0)"
						)
							.children("li:nth(0)")
							.find("a:nth(0)")
							.attr("href")
							.trim();

						return {
							name: name,
							description: description,
							url: url,
							magnetic_link: magnetic_link,
						};
					}
				);

				if (result && result.name && result.url) {
					delete link.path;
					data.push({ ...result, ...link });
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
