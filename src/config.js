const { version } = require("../package.json");

module.exports = {
	name: "raspar",

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

	swagger: {
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Raspar API",
				version: version,
				description: `This documentations contains all raspar endpoints.`,
				license: {
					name: "MIT License",
					url: "https://github.com/kodjunkie/raspar/blob/master/LICENSE",
				},
				contact: {
					name: "Lawrence Onah (Kodjunkie)",
					url: "https://github.com/kodjunkie",
					email: "paplow01@gmail.com",
				},
			},
			servers: [{ url: "http://localhost:3000" }],
		},
		apis: ["./src/api/routes.js"],
	},
};
