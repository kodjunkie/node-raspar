const Zoro = require("../../src/drivers/netnaija");
const Crawler = require("../../src/lib/crawler");
jest.mock("../../src/lib/crawler");

describe("Zoro", () => {
	beforeEach(() => {
		Crawler.mockClear();
	});

	it("is instantiate-able", () => {
		expect.assertions(2);

		new Zoro();
		expect(Crawler.mock.calls.length).toBe(1);
		expect(Crawler).toHaveBeenCalledTimes(1);
	});
});
