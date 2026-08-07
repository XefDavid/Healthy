<script setup lang="ts">
import RunnerForm from "~/components/Runner-Form.vue";

const route = useRoute();
const initialCalories = computed(() => {
	const value = route.query.calories;
	return typeof value === "string" ? value : undefined;
});
</script>

<template>
	<div class="relative z-0 h-full px-4 py-4 sm:px-8 sm:py-6">
		<PageBackground />

		<div class="relative mx-auto flex h-full max-w-3xl flex-col">
			<AppBreadcrumb :label="$t('runner.title')" />

			<div class="mb-4 flex items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-map text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("runner.titlePrefix") }}
						<span class="text-lime-400">{{ $t("runner.titleAccent") }}</span>
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("runner.subtitle") }}
					</p>
				</div>
			</div>

			<div class="flex min-h-0 flex-1 items-center justify-center">
				<RunnerForm :initial-calories="initialCalories" />
			</div>
		</div>
	</div>
</template>
