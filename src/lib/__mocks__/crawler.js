module.exports = jest.fn().mockImplementation(() => {
	return {
		cache: jest.fn(),
		browse: jest.fn(),
	};
});
