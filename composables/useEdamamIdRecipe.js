// ~/composables/useEdamamIdRecipe.ts
import { ref } from "vue";
import axios from "axios";

export const useEdamamIdRecipe = () => {
	const loading = ref(false);
	const error = ref(null);
	const config = useRuntimeConfig();

	const getRecipeById = async (recipeId) => {
		loading.value = true;
		error.value = null;

		const uri = `https://api.edamam.com/api/recipes/v2/by-uri?uri=${recipeId}`;

		try {
			const response = await axios.get(uri, {
				params: {
					app_id: config.public.edamamRecipesAppId,
					app_key: config.public.edamamRecipesAppKey,
				},
			});
			console.log("Recipe API Response:", response.data);
			return response.data; // Asegúrate de que esto regrese la estructura de datos correcta
		} catch (err) {
			error.value = "Error fetching recipe details.";
			console.error("Error details:", err);
			throw err;
		} finally {
			loading.value = false;
		}
	};

	return {
		loading,
		error,
		getRecipeById,
	};
};
