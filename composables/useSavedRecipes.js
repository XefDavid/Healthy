const STORAGE_KEY = "healthy:recetas-guardadas";

// Lista reactiva compartida (useState, mismo patrón que useSidebarOpen /
// useAdaptRecipeDraft) respaldada por localStorage. `loaded` evita releer
// localStorage en cada llamada al composable — solo se carga una vez.
export const useSavedRecipes = () => {
	const recetas = useState("recetasGuardadas", () => []);
	const loaded = useState("recetasGuardadasLoaded", () => false);

	const persist = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(recetas.value));
	};

	if (!loaded.value && typeof localStorage !== "undefined") {
		try {
			recetas.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
		} catch (err) {
			console.error("Error leyendo recetas guardadas:", err);
			recetas.value = [];
		}
		loaded.value = true;
	}

	const saveRecipe = (receta) => {
		const index = recetas.value.findIndex((r) => r.id === receta.id);
		if (index === -1) {
			recetas.value.push(receta);
		} else {
			recetas.value[index] = receta;
		}
		persist();
	};

	const deleteRecipe = (id) => {
		recetas.value = recetas.value.filter((r) => r.id !== id);
		persist();
	};

	const getRecipeById = (id) => recetas.value.find((r) => r.id === id);

	return { recetas, saveRecipe, deleteRecipe, getRecipeById };
};
