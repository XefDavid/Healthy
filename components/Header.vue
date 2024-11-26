<script setup lang="ts">
import foodPlaning from "~/assets/images/foodPlaning.webp";
import NutritionSearch from "./Nutrition-Search-Form.vue";
import RecipeSearchForm from "./Recipe-Search-Form.vue";
</script>

<template>
	<div>
		<div class="flex justify-center font-semibold flex-grow text-center">
			<img
				class="w-[250px] h-[250px]"
				:src="foodPlaning"
				alt="Food Planning Logo"
			/>
		</div>
		<div class="absolute top-3 right-3">
			<nuxt-link to="/">
				<Button
					label="Back"
					severity="secondary"
					text
					icon="pi pi-undo"
					class="button-gray w-full"
				/>
			</nuxt-link>
		</div>

		<div class="flex justify-center"><RecipeSearchForm /></div>
	</div>
</template>
s
