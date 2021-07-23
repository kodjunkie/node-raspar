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

		const { links } = await this.scrape(
			`${this.endpoint}/zippyshare/search?q=${query}#gsc.tab=0&gsc.q=${query}&gsc.page=${page}`,
			function () {
				var links = [];

				// Get response data
				$("div.gs-webResult").each(function () {
					var name = $(this).children(":nth-child(1)").find("a").text().trim(),
						url = $(this).children(":nth-child(1)").find("a").attr("href");
					if (name && url) links.push(url);
				});

				return { links: links };
			}
		);

		if (!links) return { data };

		const promises = links.map(async (link) => {
			const result = await this.scrape(link, function () {
				var name = $("tbody div#lrbox .left")
					.children(":nth-child(4)")
					.text()
					.trim();

				var path = $("tbody div#lrbox .right").find("a#dlbutton").attr("href");

				var size1 = $("tbody div#lrbox .left")
					.children(":nth-child(6)")
					.find("font:nth-child(2)")
					.text();

				var size2 = $("tbody div#lrbox .left").children(":nth-child(7)").text();

				var domain = $("head meta[property='og:url']")
					.attr("content")
					.split("/v/");

				var size = size1 || size2;
				var extension = decodeURIComponent(path).split(".").pop();
				var supportedExt = [
					"mp3",
					"aac",
					"flac",
					"wma",
					"wav",
					"ogg",
					"flv",
					"mp4",
					"webm",
				];

				return {
					name: name.substring(0, name.length - 2),
					url: supportedExt.includes(extension)
						? `https:${domain[0]}/downloadAudioHQ?key=${
								domain[1].split("/")[0]
						  }&amp;time=`
						: `https:${domain[0] + path}`,
					size: size.replace("3)", ""),
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
			const cacheKey = query ? query + page + this.endpoint : this.endpoint;
			const cachedResponse = await this.cache.get(cacheKey);
			if (cachedResponse) return cachedResponse;

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
			const cacheKey = genre ? genre + page + this.endpoint : this.endpoint;
			const cachedResponse = await this.cache.get(cacheKey);
			if (cachedResponse) return cachedResponse;

			let data;
			if (genre) data = await this.performSearch(genre, page);
			else {
				const response = await this.scrape(this.endpoint, function () {
					var results = [];

					// Get response data
					$("div.home-cool:nth(0) .m12")
						.find("a")
						.each(function () {
							var name = $(this).children(".chip").text().trim(),
								url = $(this).attr("href");

							if (name && url)
								results.push({
									name,
									url: `https://www.zippysharedjs.com/${url}`,
								});
						});

					return { data: results };
				});

				data = { data: response.data };
			}

			await this.browser.close();
			await this.cache.set(cacheKey, data);

			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
