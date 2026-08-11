<script setup lang="ts">
import { useSavedRecipes } from "~/composables/useSavedRecipes";

const { recetas, deleteRecipe } = useSavedRecipes();
const { t } = useI18n();

const confirmDelete = (id: string) => {
	if (confirm(t("myRecipes.deleteConfirm"))) deleteRecipe(id);
};
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative flex h-full max-w-4xl flex-col">
			<AppBreadcrumb :label="$t('myRecipes.title')" />

			<div class="mb-8 flex shrink-0 items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-bookmark text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("myRecipes.title") }}
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("myRecipes.subtitle") }}
					</p>
				</div>
			</div>

			<div class="min-h-0 flex-1 overflow-y-auto">
				<p v-if="recetas.length === 0" class="text-sm text-neutral-400">
					{{ $t("myRecipes.emptyState") }}
				</p>

				<div v-else class="flex flex-wrap gap-4">
					<div
						v-for="receta in recetas"
						:key="receta.id"
						class="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 transition duration-300 hover:border-lime-500/40 sm:w-[240px]"
					>
						<nuxt-link :to="`/my-recipes/${receta.id}`" class="block">
							<img
								v-if="receta.imagen"
								:src="receta.imagen"
								:alt="receta.tituloEs"
								class="h-32 w-full rounded-lg object-cover"
							/>
							<h2 class="mt-2 text-sm font-semibold text-white">{{ receta.tituloEs }}</h2>
							<p class="mt-1 text-xs text-neutral-400">
								{{ receta.racionesBase }} {{ $t("adaptRecipe.servingsLabel").toLowerCase() }}
							</p>
						</nuxt-link>
						<button
							type="button"
							@click="confirmDelete(receta.id)"
							class="mt-3 flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-red-400"
						>
							<i class="pi pi-trash"></i>
							{{ $t("myRecipes.deleteButton") }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
