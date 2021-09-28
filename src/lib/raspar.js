process.setMaxListeners(Infinity);
const { defaultDriver } = require("../config");

module.exports = class Raspar {
	/**
	 * @param  {} options={}
	 */
	static resolve(options) {
		const driver = !options || !options.driver ? defaultDriver : options.driver;
		try {
			const name = driver.trim().toLowerCase();
			const DriverObject = require(`../drivers/${name}`);
			return new DriverObject(options);
		} catch (error) {
			console.error(`Driver not found: ${driver}`);
		}
	}

	/**
	 * @param  [] argv=[]
	 */
	static commander(argv = []) {
		const { Command } = require("commander");
		const { version, name } = require("../config");
		const server = require("../server");
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
				server(PORT);
			});

		program.parse(argv);
		if (argv.slice(2).length < 1) program.help();
	}
};
