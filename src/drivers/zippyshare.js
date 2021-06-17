const Crawler = require("../crawler");

module.exports = class ZippyShare extends Crawler {
	get domain() {
		return "https://www.zippysharedjs.com";
	}

	/**
	 * @param  string query
	 * @param  Number page=1
	 */
	async search(query, page = 1) {
		try {
			query = query.replace(" ", "+");

			const { links } = await this.browse(
				`${this.domain}/zippyshare/search?q=${query}#gsc.tab=0&gsc.q=${query}&gsc.page=${page}`,
				function () {
					var links = [];

					// Get response data
					$("div.gs-webResult").each(function () {
						var name = $(this).children(":nth-child(1)").find("a").text(),
							url = $(this).children(":nth-child(1)").find("a").attr("href");
						if (name && url) links.push(url);
					});

					return { links: links };
				}
			);

			const data = [];
			if (!links) return { data };

			const promises = links.map(async (link) => {
				const result = await this.browse(link, function () {
					var name = $("tbody div#lrbox .left")
						.children(":nth-child(4)")
						.text();

					var path = $("tbody div#lrbox .right")
						.find("a#dlbutton")
						.attr("href");

					var size1 = $("tbody div#lrbox .left")
						.children(":nth-child(6)")
						.find("font:nth-child(2)")
						.text();

					var size2 = $("tbody div#lrbox .left")
						.children(":nth-child(7)")
						.text();

					var domain = $("head meta[property='og:url']")
						.attr("content")
						.split("/v/")[0];

					var size = size1 || size2;

					return {
						name: name.substring(0, name.length - 2),
						url: "https:" + domain + path,
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
		} catch (error) {
			return { data: [] };
		}
	}
};
