export const useEdamamRecipeAnalysis = () => {
	const config = useRuntimeConfig();

	/** @type {import("vue").Ref<any | null>} */
	const result = ref(null);
	const loading = ref(false);
	/** @type {import("vue").Ref<string | null>} */
	const error = ref(null);

	// Analiza una receta completa (título + lista de ingredientes en
	// lenguaje natural, ej. "500 g rice") usando el endpoint de Recipe
	// Analysis de Edamam, que reutiliza las credenciales de la
	// Nutrition Analysis API ya configuradas.
	const analyzeRecipe = async (title, ingredients) => {
		loading.value = true;
		error.value = null;
		result.value = null;

		try {
			const response = await $fetch(
				"https://api.edamam.com/api/nutrition-details",
				{
					method: "POST",
					params: {
						app_id: config.public.edamamNutritionAppId,
						app_key: config.public.edamamNutritionAppKey,
					},
					body: { title, ingr: ingredients },
				}
			);

			if (!response?.totalNutrients || !response.calories) {
				error.value = "No nutritional data found for this recipe.";
				return null;
			}

			result.value = response;
			return response;
		} catch (err) {
			error.value = "Error analyzing recipe.";
			console.error("Recipe analysis error:", err);
			return null;
		} finally {
			loading.value = false;
		}
	};

	return { result, loading, error, analyzeRecipe };
};
