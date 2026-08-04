<script setup lang="ts">
import foodPlaning from "~/assets/images/foodPlaning.webp";
import RecipeSearchForm from "./Recipe-Search-Form.vue";
</script>

<template>
	<div>
		<div class="absolute top-3 right-3">
			<nuxt-link to="/">
				<Button
					:label="$t('common.back')"
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
			<RecipeSearchForm />
		</div>
	</div>
</template>
