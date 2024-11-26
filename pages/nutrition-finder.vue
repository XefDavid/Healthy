<script setup lang="ts">
import NutritionSearchForm from "~/components/Nutrition-Search-Form.vue";
import foodPlaning from "~/assets/images/foodPlaning.webp";
</script>

<template>
	<div class="flex items-center justify-between">
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
	</div>

	<div class="mt-[-20px]">
		<NutritionSearchForm />
	</div>
</template>
