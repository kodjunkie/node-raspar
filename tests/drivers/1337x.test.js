const One337x = require("../../src/drivers/1337x");
const Crawler = require("../../src/lib/crawler");
jest.mock("../../src/lib/crawler");

describe("1337x", () => {
	beforeEach(() => {
		Crawler.mockClear();
	});

	it("is instantiate-able", () => {
		expect.assertions(2);

		new One337x();
		expect(Crawler.mock.calls.length).toBe(1);
		expect(Crawler).toHaveBeenCalledTimes(1);
	});
});
