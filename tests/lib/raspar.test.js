const Raspar = require("../../src/lib/raspar");
const Crawler = require("../../src/lib/crawler");
const server = require("../../src/server");
jest.mock("../../src/server");

describe("Raspar class tests", () => {
	it("properly resolves the driver", () => {
		expect.assertions(2);

		let Driver = Raspar.resolve();
		expect(Driver).toBeInstanceOf(Crawler);

		Driver = Raspar.resolve({ driver: "1337x" });
		expect(Driver).toBeInstanceOf(Crawler);
	});

	it("throws error for invalid drivers", () => {
		expect.assertions(2);

		Raspar.resolve({ driver: "invalid" });
		expect(console.error).toBeCalledWith("Driver not found: invalid");

		Raspar.resolve({ driver: "google" });
		expect(console.error).toBeCalledWith("Driver not found: google");
	});

	it("doesn't run api on invalid command", () => {
		expect.assertions(1);
		Raspar.commander(["", "", "test"]);
		expect(server).not.toBeCalled();
	});

	it("runs api on default port", () => {
		expect.assertions(3);
		Raspar.commander(["", "", "api"]);

		expect(server).toBeCalled();
		expect(server).toBeCalledWith(3000);
		expect(console.log).toBeCalledWith("Raspar is running on port", 3000);
	});

	it("runs api on custom port", () => {
		expect.assertions(3);

		const PORT = 4000;
		Raspar.commander(["", "", "api", "-p", PORT]);

		expect(server).toBeCalled();
		expect(server).toBeCalledWith(PORT);
		expect(console.log).toBeCalledWith("Raspar is running on port", PORT);
	});
});
