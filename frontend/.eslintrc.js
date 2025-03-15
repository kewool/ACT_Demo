module.exports = {
	root: true,
	env: {
		browser: true,
    es2021: true,
		node: true,
	},
	extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debug": process.env.NODE_ENV === "production" ? "error" : "off",
    "camelcase": "off",
	},
};