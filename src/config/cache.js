module.exports = {
	store: require("cache-manager-fs-hash"),
	options: {
		path: "./temp",
		ttl: 60 * 60 * 24 * 14, // 2 weeks
		maxsize: 1024,
		subdirs: false,
		zip: true,
	},
};
