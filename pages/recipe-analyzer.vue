<script setup lang="ts">
import RecipeAnalyzerForm from "~/components/Recipe-Analyzer-Form.vue";
</script>

<template>
	<div class="relative z-0 min-h-screen px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative mx-auto max-w-4xl">
			<AppBreadcrumb :label="$t('recipeAnalyzer.title')" />

			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-calculator text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("recipeAnalyzer.titlePrefix") }}
						<span class="text-lime-400">{{ $t("recipeAnalyzer.titleAccent") }}</span>
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("recipeAnalyzer.subtitle") }}
					</p>
				</div>
			</div>

			<RecipeAnalyzerForm />
		</div>
	</div>
</template>
