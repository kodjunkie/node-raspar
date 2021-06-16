const driver = require("node-phantom-simple");
const phantomJs = require("phantomjs");

module.exports = class Crawler {
  /**
   * @param  {} url
   * @param  {} transform
   */
  browse(url, transform, timeout = 1500) {
    return new Promise((resolve, reject) => {
      return driver.create({ path: phantomJs.path }, function (err, browser) {
        if (err) reject(err);
        return browser.createPage(function (err, page) {
          if (err) reject(err);
          return page.open(url, function (err, status) {
            if (err) reject(err);
            page.includeJs(
              "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
              function (err) {
                if (err) reject(err);
                // Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                setTimeout(function () {
                  return page.evaluate(transform, function (err, response) {
                    if (err) reject(err);
                    resolve(response);
                    browser.exit();
                  });
                }, timeout);
              }
            );
          });
        });
      });
    }).catch((error) => this.errorHandler(error));
  }

  /**
   * @param  {} error
   */
  errorHandler(error) {
    // console.error(error);
  }
};
