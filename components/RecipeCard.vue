<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAdaptRecipeDraft } from "~/composables/useAdaptRecipeDraft";

const props = defineProps<{ recipe: any }>();
const router = useRouter();
const draft = useAdaptRecipeDraft();

const adaptRecipe = () => {
	draft.value = props.recipe;
	router.push("/adapt-recipe");
};
</script>

<template>
	<div
		class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 transition duration-300 hover:border-lime-500/40"
	>
		<a :href="recipe.url" target="_blank" rel="noopener noreferrer" class="block">
			<img
				:src="recipe.image"
				:alt="recipe.label"
				class="w-full size-45 object-cover rounded-lg"
			/>
			<h2 class="text-lg font-semibold mt-2 text-center text-white">
				{{ recipe.label }}
			</h2>
		</a>
		<button
			type="button"
			@click="adaptRecipe"
			class="mt-3 h-9 w-full rounded-lg border border-neutral-700 bg-neutral-800 text-xs font-medium text-white transition hover:border-lime-500 hover:bg-lime-500 hover:text-neutral-950"
		>
			<i class="pi pi-sparkles mr-1"></i>{{ $t("adaptRecipe.button") }}
		</button>
	</div>
</template>
