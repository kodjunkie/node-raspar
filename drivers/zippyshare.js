const Crawler = require(".");

module.exports = class ZippyShare extends Crawler {
  constructor() {
    super();
    this.domain = "https://www.zippysharedjs.com";
  }

  search(query, page = 1) {
    this.browse(
      `${this.domain}/zippyshare/search?q=${query}#gsc.tab=0&gsc.q=${query}&gsc.page=${page}`,
      function () {
        var data = [];

        // Get paging data
        /* $("div.gsc-cursor-page").each(function () {
          pagination.push($(this).text());
        }); */

        // Get response data
        $("div.gs-webResult").each(function () {
          var json = {};

          json.name = $(this).children(":nth-child(1)").find("a").text();
          json.url = $(this).children(":nth-child(1)").find("a").attr("href");

          if (json.name && json.url) data.push(json);
        });

        return {
          data: data,
          //   pagination: pagination,
        };
      },
      (response) => console.log(response)
    );

    // console.log($("table.folderlogo").html());
  }
};
