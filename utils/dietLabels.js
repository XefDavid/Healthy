// Las dietLabels de Edamam vienen como enums crudos en inglés
// (LOW_FAT, LOW_SODIUM...). Se mapean a las claves de i18n ya usadas
// en los filtros de recetas para mostrarlas traducidas.
const DIET_LABEL_KEYS = {
	BALANCED: "filters.diet.balanced",
	HIGH_FIBER: "filters.diet.highFiber",
	HIGH_PROTEIN: "filters.diet.highProtein",
	LOW_CARB: "filters.diet.lowCarb",
	LOW_FAT: "filters.diet.lowFat",
	LOW_SODIUM: "filters.diet.lowSodium",
};

export const translateDietLabel = (label, t) => {
	const key = DIET_LABEL_KEYS[label];
	return key ? t(key) : label;
};
