import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["/build", "**/*.min.js", "/node_modules "],
	},
]);
