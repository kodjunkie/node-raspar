const Raspar = require("../../src/lib/raspar");
const Crawler = require("../../src/lib/crawler");

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

	it("runs api on default port", () => {
		expect.assertions(3);
		jest.mock("../../src/api");

		Raspar.commander(["", "", "api"]);
		const serve = require("../../src/api");

		expect(serve).toBeCalled();
		expect(serve).toBeCalledWith(3000);
		expect(console.log).toBeCalledWith("Raspar is running on port", 3000);
	});

	it("runs api on custom port", () => {
		expect.assertions(3);
		jest.mock("../../src/api");

		const PORT = 4000;
		Raspar.commander(["", "", "api", "-p", PORT]);
		const serve = require("../../src/api");

		expect(serve).toBeCalled();
		expect(serve).toBeCalledWith(PORT);
		expect(console.log).toBeCalledWith("Raspar is running on port", PORT);
	});
});
