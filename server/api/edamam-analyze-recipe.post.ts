// Proxy fino al endpoint de Recipe/Nutrition Analysis de Edamam. Si Edamam
// devuelve un error (ej. {"error":"low_quality"} con HTTP 555 cuando no
// reconoce un ingrediente), se relanza con el mismo status y cuerpo para que
// el composable cliente (useEdamamRecipeAnalysis.js) siga distinguiéndolo
// exactamente igual que cuando llamaba a Edamam directamente.
export default defineEventHandler(async (event) => {
	const { title, ingr } = await readBody(event);
	const config = useRuntimeConfig(event);

	try {
		return await $fetch("https://api.edamam.com/api/nutrition-details", {
			method: "POST",
			params: {
				app_id: config.edamamNutritionAppId,
				app_key: config.edamamNutritionAppKey,
			},
			body: { title, ingr },
		});
	} catch (err: any) {
		throw createError({
			statusCode: err.statusCode || err.response?.status || 500,
			data: err.data,
		});
	}
});
