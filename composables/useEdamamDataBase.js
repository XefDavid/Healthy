import { ref } from "vue";

export const useEdamamDataBase = () => {
	/** @type {import("vue").Ref<any[] | null>} */
	const foodData = ref(null);
	const nutritionData = ref(null);
	/** @type {import("vue").Ref<string | null>} */
	const error = ref(null);

	const searchFood = async (query) => {
		try {
			const data = await $fetch("/api/edamam-food-search", {
				params: { ingr: query },
			});

			foodData.value = data.hints || [];
		} catch (err) {
			error.value = err.message;
		}
	};

	const getNutritionData = async (ingredients) => {
		try {
			return await $fetch("/api/edamam-food-nutrients", {
				method: "POST",
				body: { ingredients },
			});
		} catch (err) {
			error.value = err.message;
			return null;
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
