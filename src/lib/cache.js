const cacheManager = require("cache-manager");
const { cache } = require("../config");

module.exports = class Cache {
	// Configure cache
	constructor(options) {
		const cacheConfig = options && options.cache ? options.cache : {};
		this.shouldCache = typeof cacheConfig == "boolean" ? cacheConfig : true;
		this.cache = cacheManager.caching({ ...cache, ...cacheConfig });
	}

	get(key) {
		if (!this.shouldCache) return Promise.resolve(false);
		return this.cache.get(key);
	}

	set(key, value, options) {
		if (!this.shouldCache) return Promise.resolve(false);
		return this.cache.set(key, value, options);
	}

	del(key) {
		if (!this.shouldCache) return Promise.resolve(false);
		return this.cache.del(key);
	}
};
