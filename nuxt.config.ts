import Aura from "@primevue/themes/aura";

const { NODE_ENV } = process.env;

export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@nuxtjs/i18n"],
	ssr: false,
	i18n: {
		strategy: "no_prefix",
		defaultLocale: "en",
		locales: [
			{ code: "en", name: "English", file: "en.json" },
			{ code: "es", name: "Español", file: "es.json" },
		],
		langDir: "locales/",
	},
	devtools: { enabled: NODE_ENV === "development" },
	compatibilityDate: "2024-09-12",
	primevue: {
		options: {
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: "none",
					cssLayer: false,
				},
			},
		},
	},
	build: {
		transpile: ["chart.js"],
	},

	app: {
		head: {
			meta: [{ name: "color-scheme", content: "dark" }],
		},
	},
	// Sin `.public`: solo accesible desde server/api/*, nunca se envía al
	// navegador (a diferencia de runtimeConfig.public, que sí viaja dentro
	// del bundle JS y sería visible para cualquier visitante).
	runtimeConfig: {
		edamamRecipesAppId: process.env.NUXT_EDAMAM_RECIPES_APP_ID,
		edamamRecipesAppKey: process.env.NUXT_EDAMAM_RECIPES_APP_KEY,

		edamamDatabaseFoodAppId: process.env.NUXT_EDAMAM_DATABASE_FOOD_APP_ID,
		edamamDatabaseFoodAppKey: process.env.NUXT_EDAMAM_DATABASE_FOOD_APP_KEY,

		edamamNutritionAppId: process.env.NUXT_EDAMAM_NUTRITION_APP_ID,
		edamamNutritionAppKey: process.env.NUXT_EDAMAM_NUTRITION_APP_KEY,
	},
});
