import { ref } from "vue";
import axios from "axios";

export const useEdamam = () => {
	const recipes = ref([]);
	const loading = ref(false);
	const error = ref(null);

	const config = useRuntimeConfig(); // Obtener variables de entorno

	const getRecipes = async (searchCriteria) => {
		const { query } = searchCriteria;

		// Construir parámetros de búsqueda
		const params = {
			q: query,
			app_id: config.public.edamamRecipesAppId, // Usar claves desde el config
			app_key: config.public.edamamRecipesAppKey, // Usar claves desde el config
			type: "public", // Revisar la documentación de Edamam
			from: 0,
			to: 100,
		};

		loading.value = true;
		error.value = null; // Reiniciar error

		try {
			const response = await axios.get(
				"https://api.edamam.com/api/recipes/v2",
				{
					params,
				}
			);

			console.log("API Response:", response.data);

			// Asegúrate de que hits existe en la respuesta
			if (response.data.hits) {
				recipes.value = response.data.hits.map((hit) => hit.recipe);
			} else {
				error.value = "No recipes found";
			}
		} catch (err) {
			// Mejor manejo de errores
			error.value =
				err.response?.data?.message || "Error fetching recipes from Edamam";
			console.error("Error details:", err);
		} finally {
			loading.value = false;
		}
	};

	return { recipes, loading, error, getRecipes };
};
