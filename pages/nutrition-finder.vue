<script setup lang="ts">
import NutritionSearchForm from "~/components/Nutrition-Search-Form.vue";
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative mx-auto max-w-3xl">
			<AppBreadcrumb :label="$t('nutritionFinder.title')" />

			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-apple text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("nutritionFinder.title") }}
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("home.nutritionSubtitle") }}
					</p>
				</div>
			</div>

			<NutritionSearchForm />
		</div>
	</div>
</template>
