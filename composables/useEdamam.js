import { ref } from "vue";

export const useEdamam = () => {
	const recipes = ref([]);
	const loading = ref(false);
	const error = ref(null);

	const getRecipes = async (searchCriteria) => {
		const { query } = searchCriteria;

		loading.value = true;
		error.value = null;

		try {
			const data = await $fetch("/api/edamam-recipes", {
				params: { q: query },
			});

			if (data.hits) {
				recipes.value = data.hits.map((hit) => hit.recipe);
			} else {
				error.value = "No recipes found";
			}
		} catch (err) {
			error.value = err.data?.message || "Error fetching recipes from Edamam";
			console.error("Error details:", err);
		} finally {
			loading.value = false;
		}
	};

	return { recipes, loading, error, getRecipes };
};
