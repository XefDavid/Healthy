<script setup lang="ts">
import RecipeSuggesterForm from "~/components/Recipe-Suggester-Form.vue";
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative max-w-3xl">
			<AppBreadcrumb :label="$t('recipeSuggester.title')" />

			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-inbox text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("recipeSuggester.title") }}
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("recipeSuggester.subtitle") }}
					</p>
				</div>
			</div>

			<RecipeSuggesterForm />
		</div>
	</div>
</template>
