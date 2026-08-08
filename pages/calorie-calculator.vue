<script setup lang="ts">
import CalorieCalculatorForm from "~/components/Calorie-Calculator-Form.vue";
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative max-w-4xl">
			<AppBreadcrumb :label="$t('calorieCalculator.title')" />

			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-gauge text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("calorieCalculator.titlePrefix") }}
						<span class="text-lime-400">{{ $t("calorieCalculator.titleAccent") }}</span>
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("calorieCalculator.subtitle") }}
					</p>
				</div>
			</div>

			<CalorieCalculatorForm />
		</div>
	</div>
</template>
