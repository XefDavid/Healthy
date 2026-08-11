<script setup lang="ts">
import { reactive } from "vue";
import AdaptRecipeForm from "~/components/Adapt-Recipe-Form.vue";
import { useAdaptRecipeDraft } from "~/composables/useAdaptRecipeDraft";
import { createRecetaAdaptadaFromEdamam } from "~/utils/recetaAdaptada";

const draft = useAdaptRecipeDraft();
// Se construye una sola vez, al entrar a la página — no es un computed
// porque createRecetaAdaptadaFromEdamam genera un id nuevo cada vez que
// se llama, y no queremos una receta distinta en cada recomputación.
const receta = draft.value ? reactive(createRecetaAdaptadaFromEdamam(draft.value)) : null;
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative flex h-full max-w-4xl flex-col">
			<AppBreadcrumb :label="$t('adaptRecipe.title')" />

			<div class="mb-8 flex shrink-0 items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-sparkles text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("adaptRecipe.title") }}
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("adaptRecipe.subtitle") }}
					</p>
				</div>
			</div>

			<div class="min-h-0 flex-1 overflow-y-auto">
				<AdaptRecipeForm v-if="receta" :receta="receta" :auto-translate="true" />
				<p v-else class="text-sm text-neutral-400">
					{{ $t("adaptRecipe.noDraft") }}
				</p>
			</div>
		</div>
	</div>
</template>
