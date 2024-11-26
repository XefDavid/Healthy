<script setup lang="ts">
const food = ref(""); // Current input value
const error = ref("");
const isFoodValid = computed(() => food.value.trim().length > 0);
const ingredientsList = ref<string[]>([]); // List of added ingredients for query

const addIngredient = () => {
	if (isFoodValid.value) {
		ingredientsList.value.push(food.value.trim());
		food.value = ""; // Clear the input after adding
	} else {
		error.value = "Please enter a valid ingredient.";
	}
};
</script>

<template>
	<div class="flex justify-center w-1/2 text-sm">
		<input
			v-model="food"
			type="text"
			placeholder="Enter an ingredient (e.g., 100g chicken)"
			class="border-spacing-10 bg-white border border-gray-300 p-2 m-2 h-12"
		/>
		<button
			@click="addIngredient"
			class="bg-green-500"
			:disabled="!isFoodValid"
		>
			Add Ingredient
		</button>
	</div>
</template>
