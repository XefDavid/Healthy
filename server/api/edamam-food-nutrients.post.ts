// Proxy fino al endpoint de nutrientes de la Food Database API de Edamam.
export default defineEventHandler(async (event) => {
	const { ingredients } = await readBody(event);
	const config = useRuntimeConfig(event);

	return $fetch("https://api.edamam.com/api/food-database/v2/nutrients", {
		method: "POST",
		params: {
			app_id: config.edamamDatabaseFoodAppId,
			app_key: config.edamamDatabaseFoodAppKey,
		},
		body: { ingredients },
	});
});
