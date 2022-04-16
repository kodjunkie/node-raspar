const NetNaija = require("../../src/drivers/netnaija");
const Crawler = require("../../src/lib/crawler");
jest.mock("../../src/lib/crawler");

describe("NetNaija", () => {
	beforeEach(() => {
		Crawler.mockClear();
	});

	it("is instantiate-able", () => {
		expect.assertions(2);

		new NetNaija();
		expect(Crawler.mock.calls.length).toBe(1);
		expect(Crawler).toHaveBeenCalledTimes(1);
	});
});
