const { version } = require("../../package.json");

module.exports = {
	name: "raspar",

	version: version,

	defaultDriver: "zippyshare",

	drivers: ["zippyshare", "1337x", "netnaija", "zoro"],

	cache: require("./cache"),

	swagger: require("./swagger"),

	perPage: 10,
};
