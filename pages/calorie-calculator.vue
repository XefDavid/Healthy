<script setup lang="ts">
import CalorieCalculatorForm from "~/components/Calorie-Calculator-Form.vue";
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
			<CalorieCalculatorForm />
		</div>
	</div>
</template>
