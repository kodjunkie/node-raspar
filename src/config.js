module.exports = {
	name: "raspar",

	version: "1.0.0",

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
