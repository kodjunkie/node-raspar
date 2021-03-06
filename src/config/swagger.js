const { version, description } = require("../../package.json");

module.exports = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Raspar API",
			version,
			description,
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
	apis: [__dirname + "/../server/routes.js"],
};
