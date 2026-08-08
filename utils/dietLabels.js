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

// Las healthLabels de Edamam también vienen como enums crudos en inglés,
// reutilizando las mismas claves de i18n ya usadas en los filtros de recetas.
const HEALTH_LABEL_KEYS = {
	SUGAR_CONSCIOUS: "filters.health.sugarConscious",
	LOW_SUGAR: "filters.health.sugarConscious",
	EGG_FREE: "filters.health.eggFree",
	VEGETARIAN: "filters.health.vegetarian",
	MEDITERRANEAN: "filters.health.mediterranean",
	DAIRY_FREE: "filters.health.dairyFree",
	GLUTEN_FREE: "filters.health.glutenFree",
	WHEAT_FREE: "filters.health.wheatFree",
	PEANUT_FREE: "filters.health.peanutFree",
	TREE_NUT_FREE: "filters.health.treeNutFree",
	SOY_FREE: "filters.health.soyFree",
	FISH_FREE: "filters.health.fishFree",
	SHELLFISH_FREE: "filters.health.shellfishFree",
	PORK_FREE: "filters.health.porkFree",
	RED_MEAT_FREE: "filters.health.redMeatFree",
	CRUSTACEAN_FREE: "filters.health.crustaceanFree",
	CELERY_FREE: "filters.health.celeryFree",
	MUSTARD_FREE: "filters.health.mustardFree",
	SESAME_FREE: "filters.health.sesameFree",
	LUPINE_FREE: "filters.health.lupinFree",
	MOLLUSK_FREE: "filters.health.molluskFree",
	ALCOHOL_FREE: "filters.health.alcoholFree",
	SULPHITE_FREE: "filters.health.sulfiteFree",
	KOSHER: "filters.health.kosher",
	IMMUNO_SUPPORTIVE: "filters.health.immunoSupportive",
};

export const translateHealthLabel = (label, t) => {
	const key = HEALTH_LABEL_KEYS[label];
	return key ? t(key) : null;
};
