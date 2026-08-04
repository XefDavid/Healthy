<script setup lang="ts">
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

		<div
			class="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-16"
		>
			<AppLogo size="lg" />
			<RecipeSearchForm />
		</div>
	</div>
</template>
