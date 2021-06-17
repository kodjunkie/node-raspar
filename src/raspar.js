module.exports = class Raspar {
	/**
	 * @param  string driver="zippyshare"
	 */
	static resolve = (driver = "zippyshare") => {
		const Driver = require(`./drivers/${driver.trim()}`);
		return new Driver();
	};

	/**
	 * @param  [] argv=[]
	 */
	static commander = (argv = []) => {
		const { Command } = require("commander");
		const config = require("./config");
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
				console.log("Raspar API is running...", parent.port);
			});

		program.parse(argv);
		const arg = argv.slice(2);
		if (!arg || arg.length < 1) program.help();
	};
};
