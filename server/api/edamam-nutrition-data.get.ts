// Proxy fino a la Nutrition Analysis API de Edamam para un solo ingrediente
// (usado por pages/nutrition-result.vue).
export default defineEventHandler(async (event) => {
	const { ingr } = getQuery(event);
	const config = useRuntimeConfig(event);

	return $fetch("https://api.edamam.com/api/nutrition-data", {
		params: {
			ingr,
			app_id: config.edamamNutritionAppId,
			app_key: config.edamamNutritionAppKey,
		},
	});
});
