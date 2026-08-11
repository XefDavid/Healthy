<script setup lang="ts">
import AdaptRecipeForm from "~/components/Adapt-Recipe-Form.vue";
import { useSavedRecipes } from "~/composables/useSavedRecipes";

const route = useRoute();
const { getRecipeById } = useSavedRecipes();

// getRecipeById devuelve la referencia real dentro de la lista guardada
// (no una copia), así que editar aquí ya muta el estado en memoria; el
// botón "Guardar" del formulario solo hace falta para volcarlo a
// localStorage.
const receta = getRecipeById(route.params.id as string);
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative flex h-full max-w-4xl flex-col">
			<AppBreadcrumb :label="$t('myRecipes.title')" />

			<div v-if="receta" class="mb-8 flex shrink-0 items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-bookmark text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("myRecipes.title") }}
					</h1>
				</div>
			</div>

			<div class="min-h-0 flex-1 overflow-y-auto">
				<AdaptRecipeForm v-if="receta" :receta="receta" :auto-translate="false" />
				<div v-else class="flex flex-col items-start gap-3">
					<p class="text-sm text-neutral-400">{{ $t("myRecipes.notFound") }}</p>
					<nuxt-link to="/my-recipes" class="text-sm text-lime-400 hover:text-lime-300">
						{{ $t("myRecipes.backToList") }}
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>
