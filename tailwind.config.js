/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
	],
	darkMode: ["selector", '[class*="dark-mode"]'],
	theme: {
		extend: {
			colors: {
				black: "#000000",
				ligthGray: "#E5E7EB",
				darkGray: "#374151",

				deep: "#0F4C75",

				white: "#FFFFFF",

				bright: "#FBBF24",
				red: "#EF4444",
			},
			fontFamily: {
				inter: [
					"Inter",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Oxygen",
					"Ubuntu",
					"Cantarell",
					"Open Sans",
					"Helvetica Neue",
					"sans-serif",
				],
			},
		},
	},
	plugins: [],
};
