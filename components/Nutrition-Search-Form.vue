<script setup lang="ts">
import { ref, computed } from "vue";
import SelectNutrition from "./Select-Nutrition.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const ingredientsList = ref<string[]>([]);
const loading = ref(false);
const error = ref("");
const nutritionData = ref<any[]>([]);

const selectedQuantity = ref("");
const selectedMeasure = ref("");
const selectedIngredient = ref("");

const isIngredientValid = computed(
	() =>
		selectedQuantity.value.trim().length > 0 &&
		selectedMeasure.value.trim().length > 0 &&
		selectedIngredient.value.trim().length > 0
);

const addIngredient = () => {
	if (isIngredientValid.value) {
		const formattedIngredient = `${selectedQuantity.value} ${selectedMeasure.value} of ${selectedIngredient.value}`;
		ingredientsList.value.push(formattedIngredient);

		selectedQuantity.value = "";
		selectedMeasure.value = "";
		selectedIngredient.value = "";
		error.value = "";
	} else {
		error.value = "Please enter a valid ingredient with quantity and measure.";
	}
};

const hasIngredients = computed(() => ingredientsList.value.length > 0);

const removeIngredient = (index: number) => {
	ingredientsList.value.splice(index, 1);
};

// Función para obtener la información nutricional de la API
// const fetchNutrition = async () => {
// 	if (!hasIngredients.value) {
// 		error.value = "Please add at least one ingredient.";
// 		return;
// 	}

// 	loading.value = true;
// 	error.value = "";
// 	nutritionData.value = [];

// 	try {
// 		for (const ingredient of ingredientsList.value) {
// 			const appId = "f77623ac";
// 			const appKey = "ec3e7fe31ca7638903d7813203629cbd";
// 			const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
// 				ingredient
// 			)}`;

// 			const response = await fetch(url);

// 			if (!response.ok) {
// 				const errorMessage = await response.text();
// 				throw new Error(`API query error: ${errorMessage}`);
// 			}

// 			const data = await response.json();

// 			if (data.totalNutrients && Object.keys(data.totalNutrients).length > 0) {
// 				nutritionData.value.push({
// 					ingredient,
// 					nutrients: data,
// 				});
// 			} else {
// 				throw new Error(`No nutritional data found for ${ingredient}.`);
// 			}
// 		}
// 	} catch (err) {
// 		error.value = err.message || "Unknown error.";
// 		console.error(err);
// 	} finally {
// 		loading.value = false;
// 	}
// };

const redirectToResults = () => {
	if (hasIngredients.value) {
		router.push({
			path: "/nutrition-result",
			query: { ingredients: ingredientsList.value },
		});
	}
};
</script>
<template>
	<div class="flex flex-col justify-between items-center">
		<div class="w-[2/3]">
			<h1
				class="text-gray-900 text-center text-4xl font-bold leading-none w-full"
			>
				Nutritional Lookup by ingredients
			</h1>
			<div class="pt-4 flex flex-row gap-2 justify-center">
				<SelectNutrition
					v-model:selectedQuantity="selectedQuantity"
					v-model:selectedMeasure="selectedMeasure"
					v-model:selectedIngredient="selectedIngredient"
				/>
				<button
					@click="addIngredient"
					class="text-sm h-[44px] bg-gray-100 rounded-lg hover:bg-lime-500 w-[130px]"
					:disabled="!isIngredientValid"
				>
					Add Ingredient
				</button>
			</div>
		</div>

		<div v-if="error">{{ error }}</div>

		<div class="flex flex-row items-center gap-2">
			<div
				v-if="hasIngredients"
				class="border border-darkGray text-center rounded-lg"
			>
				<h3 class="font-bold p-2">Your Ingredients list:</h3>
				<ul class="w-[300px] flex flex-col">
					<li
						v-for="(ingredient, index) in ingredientsList"
						:key="index"
						class="flex justify-between items-center p-1"
					>
						<span class="pl-2">{{ ingredient }}</span>
						<button
							@click="removeIngredient(index)"
							class="text-slate-500 hover:text-red-700 pr-2"
						>
							<i class="pi pi-trash hover:text-orange-900"></i>
						</button>
					</li>
				</ul>
			</div>
			<button
				v-if="hasIngredients"
				@click="redirectToResults"
				class="text-sm h-[44px] bg-gray-100 rounded-lg hover:bg-lime-500 w-[130px]"
				:disabled="loading || !hasIngredients"
			>
				Get Nutritional Information
			</button>
		</div>

		<div v-if="loading">Loading...</div>

		<div v-if="nutritionData.length > 0">
			<h3>Nutritional Results:</h3>
			<ul>
				<li v-for="(result, index) in nutritionData" :key="index">
					<h4>Ingredient: {{ result.ingredient }}</h4>
					<div>
						<p>Calories: {{ result.nutrients.calories }} kcal</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
