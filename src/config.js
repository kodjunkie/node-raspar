module.exports = {
	name: "raspar",

	version: "1.0.0",

	defaultDriver: "zippyshare",

	drivers: ["zippyshare"],

	cache: {
		path: "./temp",
		ttl: 24 * 60 * 60,
		maxsize: 1000 * 3,
		subdirs: false,
		zip: true,
	},
};
