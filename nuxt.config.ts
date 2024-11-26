import Aura from "@primevue/themes/aura";

const { NODE_ENV } = process.env;

export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module"],
	ssr: false,
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
			meta: [{ name: "color-scheme", content: "light" }],
		},
	},
	runtimeConfig: {
		public: {
			edamamRecipesAppId: process.env.NUXT_EDAMAM_RECIPES_APP_ID,
			edamamRecipesAppKey: process.env.NUXT_EDAMAM_RECIPES_APP_KEY,

			edamamDatabaseFoodAppId: process.env.NUXT_EDAMAM_DATABASE_FOOD_APP_ID,
			edamamDatabaseFoodAppKey: process.env.NUXT_EDAMAM_DATABASE_FOOD_APP_KEY,

			edamamNutritionAppId: process.env.NUXT_EDAMAM_NUTRITION_APP_ID,
			edamamNutritionAppKey: process.env.NUXT_EDAMAM_NUTRITION_APP_KEY,

			pexelsApiKey: process.env.NUXT_PEXELS_API_KEY,
		},
	},
});
