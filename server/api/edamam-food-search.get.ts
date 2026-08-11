// Proxy fino al parser de la Food Database API de Edamam.
export default defineEventHandler(async (event) => {
	const { ingr } = getQuery(event);
	const config = useRuntimeConfig(event);

	return $fetch("https://api.edamam.com/api/food-database/v2/parser", {
		params: {
			ingr,
			app_id: config.edamamDatabaseFoodAppId,
			app_key: config.edamamDatabaseFoodAppKey,
		},
	});
});
