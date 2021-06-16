const Crawler = require("../crawler");

module.exports = class ZippyShare extends Crawler {
  get domain() {
    return "https://www.zippysharedjs.com";
  }

  /**
   * @param  {} query
   * @param  {} page=1
   */
  async search(query, page = 1) {
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

    if (!links) return { data: {} };

    const data = [];
    const promises = links.map(async (link) => {
      const result = await this.browse(link, function () {
        var name = $("tbody div#lrbox .left").children(":nth-child(4)").text();
        var path = $("tbody div#lrbox .right").find("a#dlbutton").attr("href");

        var size = $("tbody div#lrbox .left")
          .children(":nth-child(6)")
          .find("font:nth-child(2)")
          .text();

        var domain = $("head meta[property='og:url']")
          .attr("content")
          .split("/v/")[0];

        return {
          name: name.substring(0, name.length - 2),
          url: "https:" + domain + path,
          size: size,
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
};
