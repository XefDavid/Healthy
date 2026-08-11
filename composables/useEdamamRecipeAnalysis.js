export const useEdamamRecipeAnalysis = () => {
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
			const response = await $fetch("/api/edamam-analyze-recipe", {
				method: "POST",
				body: { title, ingr: ingredients },
			});

			if (!response?.totalNutrients || !response.calories) {
				error.value = "no_data";
				return null;
			}

			result.value = response;
			return response;
		} catch (err) {
			// Edamam devuelve {"error":"low_quality"} (HTTP 555) cuando no
			// reconoce el texto del ingrediente como un alimento válido, algo
			// que pasa a menudo con frases descriptivas de plato en vez de un
			// nombre de alimento simple (ej. "Roast lamb" en vez de "lamb").
			const edamamError = err?.data?.error ?? err?.response?._data?.error;
			error.value = edamamError === "low_quality" ? "low_quality" : "unknown";
			console.error("Recipe analysis error:", err);
			return null;
		} finally {
			loading.value = false;
		}
	};

	return { result, loading, error, analyzeRecipe };
};
