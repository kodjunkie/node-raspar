const driver = require("node-phantom-simple");
const phantomJs = require("phantomjs");

module.exports = class Crawler {
  /**
   * @param  {} url
   * @param  {} transform
   * @param  {} callback
   */
  browse(url, transform, callback) {
    let that = this;

    return driver.create({ path: phantomJs.path }, function (err, browser) {
      if (err) that.error(err);
      return browser.createPage(function (err, page) {
        if (err) that.error(err);
        return page.open(url, function (err, status) {
          if (err) that.error(err);
          console.log("Opening site", status);

          page.includeJs(
            "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
            function (err) {
              if (err) that.error(err);
              // Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
              setTimeout(function () {
                return page.evaluate(transform, function (err, response) {
                  if (err) that.error(err);
                  callback(response);
                  browser.exit();
                });
              }, 5000);
            }
          );
        });
      });
    });
  }

  /**
   * @param  {} error
   */
  error(error) {
    console.error(error);
  }
};
