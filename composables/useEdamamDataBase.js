import axios from "axios";
import { ref } from "vue";
import { useRuntimeConfig } from "#app";

export const useEdamamDataBase = () => {
	const config = useRuntimeConfig();
	const appId = config.public.edamamDatabaseFoodAppId;
	const appKey = config.public.edamamDatabaseFoodAppKey;
	const baseUrl = "https://api.edamam.com/api/food-database/v2";

	const foodData = ref(null);
	const nutritionData = ref(null);
	const error = ref(null);

	const searchFood = async (query) => {
		try {
			const response = await axios.get(`${baseUrl}/parser`, {
				params: {
					app_id: appId,
					app_key: appKey,
					ingr: query,
				},
			});

			foodData.value = response.data.hints || [];
		} catch (err) {
			error.value = err.message;
		}
	};

	const getNutritionData = async (ingredients) => {
		try {
			const response = await axios.post(
				`${baseUrl}/nutrients`,
				{
					ingredients: ingredients, // Asegúrate de que 'ingredients' es un array de objetos con foodId
				},
				{
					params: {
						app_id: appId, // Usa appId y appKey desde el config
						app_key: appKey,
					},
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			// Ahora devolvemos la respuesta para que pueda ser utilizada en el componente
			return response.data; // Devolvemos la respuesta completa
		} catch (err) {
			error.value = err.message;
			return null; // En caso de error, devolvemos null
		}
	};

	return {
		foodData,
		nutritionData,
		error,
		searchFood,
		getNutritionData,
	};
};
