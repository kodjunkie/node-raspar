module.exports = {
	extends: ["plugin:prettier/recommended", "plugin:node/recommended"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
		"space-before-function-paren": [
			"error",
			{
				anonymous: "ignore",
				named: "ignore",
				asyncArrow: "always",
			},
		],
	},
	env: {
		commonjs: true,
		node: true,
	},
};
