module.exports = class Raspar {
	/**
	 * @param  string driver="zippyshare"
	 */
	static resolve = (driver = "zippyshare") => {
		try {
			driver = driver.trim().toLowerCase();
			const DriverObject = require(`./drivers/${driver}`);
			return new DriverObject();
		} catch (error) {
			console.error(`Driver not found: ${driver}`);
		}
	};

	/**
	 * @param  [] argv=[]
	 */
	static commander = (argv = []) => {
		const { Command } = require("commander");
		const config = require("./config");
		const serve = require("./api");
		const program = new Command();

		program
			.version(config.version)
			.name(config.name)
			.usage("<command> [options]")
			.option("-p, --port <port>", "the PORT to run on", 3000);

		program
			.command("api", { isDefault: true })
			.description(`start ${config.name} as a REST API`)
			.action(({ parent }) => {
				const PORT = process.env.PORT || parent.port;
				console.log("Raspar is running on port", PORT);
				serve(PORT);
			});

		program.parse(argv);
		const arg = argv.slice(2);
		if (!arg || arg.length < 1) program.help();
	};
};
