const { name, version } = require("../package.json");

module.exports = {
	name: name,

	version: version,

	defaultDriver: "zippyshare",

	drivers: ["zippyshare", "1337x"],

	cache: {
		store: require("cache-manager-fs-hash"),
		options: {
			path: "./temp",
			ttl: 9 * 60,
			maxsize: 1024,
			subdirs: false,
			zip: true,
		},
	},
};
