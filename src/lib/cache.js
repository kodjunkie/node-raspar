const cacheManager = require("cache-manager");

module.exports = class Cache {
	// Configure cache
	constructor(config, options = {}) {
		this.shouldCache = typeof options == "boolean" ? options : true;
		this.cache = cacheManager.caching({ ...config, ...options });
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
