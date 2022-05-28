const ZippyShare = require("../../src/drivers/zippyshare");
const Crawler = require("../../src/lib/crawler");
jest.mock("../../src/lib/crawler");

describe("ZippyShare", () => {
	beforeEach(() => {
		Crawler.mockClear();
	});

	it("is instantiate-able", () => {
		expect.assertions(2);

		new ZippyShare();
		expect(Crawler.mock.calls.length).toBe(1);
		expect(Crawler).toHaveBeenCalledTimes(1);
	});
});
