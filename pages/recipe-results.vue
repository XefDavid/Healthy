<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEdamam } from "~/composables/useEdamam";
import { useTranslateQuery } from "~/composables/useTranslateQuery";

import { useState } from "nuxt/app";

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const { translateToSpanish } = useTranslateQuery();

const TRANSLATE_TIP_DISMISSED_KEY = "recipeResults.translateTipDismissed";
const showTranslateTip = ref(false);

onMounted(() => {
	if (localStorage.getItem(TRANSLATE_TIP_DISMISSED_KEY) !== "1") {
		showTranslateTip.value = true;
	}
});

const dismissTranslateTip = () => {
	showTranslateTip.value = false;
	localStorage.setItem(TRANSLATE_TIP_DISMISSED_KEY, "1");
};

const { recipes, loading, error, getRecipes } = useEdamam();
const originalRecipes = ref([]);
const filteredRecipes = ref([]);
const specificRecipe = ref({});

const maxCalories = useState("maxCalories", () => null);
const selectedDiet = useState("selectedDiet", () => "");
const selectedHealth = useState("selectedHealth", () => "");
const selectedMealType = useState("selectedMealType", () => "");
const selectedDishType = useState("selectedDishType");
const cuisineType = useState("cuisineType", () => "");

onMounted(() => {
	if (!maxCalories.value) maxCalories.value = null;
	if (!selectedDiet.value) selectedDiet.value = "";
	if (!selectedHealth.value) selectedHealth.value = "";
	if (!selectedMealType.value) selectedMealType.value = "";
	if (!selectedDishType.value) selectedDishType.value = "";
	if (!cuisineType.value) cuisineType.value = "";
});

const loadRecipes = async () => {
	const searchCriteria = {
		query: route.query.query || "",
	};

	await getRecipes(searchCriteria);

	originalRecipes.value = [...recipes.value];

	await Promise.all(
		originalRecipes.value.map(async (recipe: any) => {
			recipe.label = await translateToSpanish(recipe.label);
		})
	);

	filteredRecipes.value = [...originalRecipes.value];
};

const applyFilters = () => {
	filteredRecipes.value = originalRecipes.value
		.filter((recipe: any) => {
			if (maxCalories.value) {
				return recipe.calories <= maxCalories.value;
			}
			return true;
		})
		.filter((recipe: any) => {
			if (selectedDiet.value) {
				return (
					recipe.dietLabels &&
					Array.isArray(recipe.dietLabels) &&
					recipe.dietLabels.includes(selectedDiet.value)
				);
			}
			return true;
		})

		.filter((recipe: any) => {
			if (selectedHealth.value) {
				return recipe.healthLabels.includes(selectedHealth.value);
			}
			return true;
		})
		.filter((recipe: any) => {
			if (selectedMealType.value) {
				return recipe.mealType.includes(selectedMealType.value);
			}
			return true;
		})
		.filter((recipe: any) => {
			if (selectedDishType.value) {
				return recipe.dishType.includes(selectedDishType.value);
			}
			return true;
		})
		.filter((recipe: any) => {
			if (cuisineType.value) {
				return recipe.cuisineType.includes(cuisineType.value);
			}
			return true;
		});
};

onMounted(() => {
	loadRecipes();
});

watch(
	[
		maxCalories,
		selectedDiet,
		selectedHealth,
		selectedMealType,
		selectedDishType,
		cuisineType,
	],
	applyFilters
);

const goToRecipeDetails = (recipe: any) => {
	// Guardar la receta seleccionada en specificRecipe
	specificRecipe.value = recipe;
};

console.log("hola soy el array", filteredRecipes.value);
console.log("hola soy los datos guardados especificos", specificRecipe.value);
console;
</script>

<template>
	<div class="container mx-auto px-4 pt-8">
		<div class="flex justify-center">
			<SelectsRecipes />
		</div>

		<div class="flex flex-col gap-4 justify-center pb-16">
			<div
				v-if="showTranslateTip && locale === 'es'"
				class="mx-auto flex w-full max-w-[1100px] items-start gap-3 rounded-lg border border-lime-500/30 bg-lime-500/10 px-4 py-3 text-sm text-neutral-200"
			>
				<i class="pi pi-info-circle mt-0.5 text-lime-400"></i>
				<p class="flex-1">{{ $t("recipeResults.translateTip") }}</p>
				<button
					type="button"
					@click="dismissTranslateTip"
					class="text-neutral-400 hover:text-white"
					:aria-label="$t('common.close')"
				>
					<i class="pi pi-times"></i>
				</button>
			</div>

			<div v-if="loading" class="text-center text-neutral-300">
				<p>{{ $t("recipeResults.loading") }}</p>
			</div>
			<div v-if="error" class="text-center text-red-500">
				<p>{{ error }}</p>
			</div>
			<div
				v-if="!loading && filteredRecipes.length === 0"
				class="text-center text-neutral-300"
			>
				<p>{{ $t("recipeResults.noResults") }}</p>
			</div>
			<div class="flex justify-center text-white">
				<i18n-t keypath="recipeResults.foundTotal" tag="h1">
					<template #count>
						<strong class="text-lime-400">{{ filteredRecipes.length }}</strong>
					</template>
				</i18n-t>
			</div>
			<div class="flex justify-center">
				<div
					class="grid w-full max-w-[1100px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
				>
					<div
						v-for="recipe in filteredRecipes"
						:key="recipe.uri"
						class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 transition duration-300 hover:border-lime-500/40"
					>
						<a
							:href="recipe.url"
							target="_blank"
							rel="noopener noreferrer"
							class="block h-full"
						>
							<img
								:src="recipe.image"
								:alt="recipe.label"
								class="w-full size-45 object-cover rounded-lg"
							/>
							<h2 class="text-xl font-semibold mt-2 text-center text-white">
								{{ recipe.label }}
							</h2>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
