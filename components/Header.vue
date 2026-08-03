<script setup lang="ts">
import foodPlaning from "~/assets/images/foodPlaning.webp";
import RecipeSearchForm from "./Recipe-Search-Form.vue";
</script>

<template>
	<div>
		<div class="flex justify-center font-semibold flex-grow text-center">
			<img
				class="w-[125px] h-[125px]"
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
