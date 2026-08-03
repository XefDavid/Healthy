<script setup lang="ts">
import NutritionSearchForm from "~/components/Nutrition-Search-Form.vue";
import foodPlaning from "~/assets/images/foodPlaning.webp";
</script>

<template>
	<div>
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

		<div class="flex flex-col items-center justify-center min-h-screen gap-8">
			<img
				class="w-[125px] h-[125px]"
				:src="foodPlaning"
				alt="Food Planning Logo"
			/>
			<NutritionSearchForm />
		</div>
	</div>
</template>
