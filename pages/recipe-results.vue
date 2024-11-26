<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEdamam } from "~/composables/useEdamam";
import TopBar from "~/components/top-bar.vue";
import foodPlaning from "~/assets/images/foodPlaning.webp";

import { useState } from "nuxt/app";

const route = useRoute();
const router = useRouter();

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
	<div class="container mx-auto px-4">
		<div class="m-4 flex items-center justify-center">
			<TopBar />
		</div>

		<div class="flex justify-center">
			<SelectsRecipes />
		</div>

		<div class="flex flex-col gap-4 justify-center">
			<div v-if="loading" class="text-center">
				<p>Loading recipes...</p>
			</div>
			<div v-if="error" class="text-center text-red-500">
				<p>{{ error }}</p>
			</div>
			<div v-if="!loading && filteredRecipes.length === 0" class="text-center">
				<p>No recipes found.</p>
			</div>
			<div class="flex justify-center">
				<h1>
					We've Found a Total of
					<strong>{{ filteredRecipes.length }}</strong> Recipes!
				</h1>
			</div>
			<div class="flex justify-center">
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[1100px]"
				>
					<div
						v-for="recipe in filteredRecipes"
						:key="recipe.uri"
						class="border p-4 rounded-lg shadow-lg"
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
							<h2 class="text-xl font-semibold mt-2 text-center">
								{{ recipe.label }}
							</h2>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
