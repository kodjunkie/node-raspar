const { defaultDriver } = require("./config");

module.exports = class Raspar {
	/**
	 * @param  {} option={}
	 */
	static resolve = (option) => {
		try {
			const driver = option.driver
				? option.driver.trim().toLowerCase()
				: defaultDriver;
			const cacheConfig = option.cache ? option.cache : {};
			const DriverObject = require(`./drivers/${driver}`);
			return new DriverObject(cacheConfig);
		} catch (error) {
			console.error(`Driver not found: ${driver}`);
		}
	};

	/**
	 * @param  [] argv=[]
	 */
	static commander = (argv = []) => {
		const { Command } = require("commander");
		const { version, name } = require("./config");
		const serve = require("./api");
		const program = new Command();

		program
			.version(version)
			.name(name)
			.usage("<command> [options]")
			.option("-p, --port <port>", "the PORT to run on", 3000);

		program
			.command("api", { isDefault: true })
			.description(`start ${name} API server`)
			.action(({ parent }) => {
				const PORT = process.env.PORT || parent.port;
				console.log("Raspar is running on port", PORT);
				serve(PORT);
			});

		program.parse(argv);
		if (argv.slice(2).length < 1) program.help();
	};
};
