<script setup lang="ts">
import { ref, computed } from "vue";
import { useEdamam } from "~/composables/useEdamam";
import { useTranslateQuery } from "~/composables/useTranslateQuery";

const MAX_INGREDIENTS = 5;

const { recipes, loading, error, getRecipes } = useEdamam();
const { translateToEnglish, translateToSpanish } = useTranslateQuery();

const ingredientInput = ref("");
const ingredientsList = ref<string[]>([]);
const hasSearched = ref(false);

const hasIngredients = computed(() => ingredientsList.value.length > 0);
const canAddMore = computed(
	() => ingredientsList.value.length < MAX_INGREDIENTS
);
const canAddCurrent = computed(
	() => ingredientInput.value.trim().length > 0 && canAddMore.value
);

const addIngredient = () => {
	if (!canAddCurrent.value) return;
	ingredientsList.value.push(ingredientInput.value.trim());
	ingredientInput.value = "";
};

const removeIngredient = (index: number) => {
	ingredientsList.value.splice(index, 1);
};

const searchRecipes = async () => {
	if (!hasIngredients.value) return;

	const translatedIngredients = await Promise.all(
		ingredientsList.value.map((ingredient) => translateToEnglish(ingredient))
	);

	await getRecipes({ query: translatedIngredients.join(" ") });

	await Promise.all(
		recipes.value.map(async (recipe: any) => {
			recipe.label = await translateToSpanish(recipe.label);
		})
	);

	hasSearched.value = true;
};
</script>

<template>
	<div class="flex w-full flex-col gap-6">
		<div class="w-full max-w-md">
			<div class="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
				<div class="flex flex-col sm:flex-row gap-2">
					<input
						type="text"
						v-model="ingredientInput"
						:placeholder="$t('recipeSuggester.placeholder')"
						:disabled="!canAddMore"
						@keyup.enter="addIngredient"
						class="input flex-1 !min-w-0"
					/>
					<button
						type="button"
						@click="addIngredient"
						class="h-10 px-4 shrink-0 text-sm bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-white"
						:disabled="!canAddCurrent"
					>
						{{ $t("common.addIngredient") }}
					</button>
				</div>

				<p class="text-xs text-neutral-500">
					{{
						canAddMore
							? $t("recipeSuggester.remaining", {
									count: 5 - ingredientsList.length,
								})
							: $t("recipeSuggester.maxReached")
					}}
				</p>

				<div
					v-if="hasIngredients"
					class="flex flex-wrap justify-center gap-2"
				>
					<span
						v-for="(ingredient, index) in ingredientsList"
						:key="index"
						class="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm text-white"
					>
						{{ ingredient }}
						<button
							type="button"
							@click="removeIngredient(index)"
							class="text-neutral-400 hover:text-red-500"
						>
							<i class="pi pi-times text-xs"></i>
						</button>
					</span>
				</div>
			</div>

			<button
				@click="searchRecipes"
				class="mt-4 w-full text-sm h-[44px] bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-white"
				:disabled="!hasIngredients || loading"
			>
				{{ loading ? $t("common.loading") : $t("recipeSuggester.searchButton") }}
			</button>
		</div>

		<div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>

		<div
			v-if="hasSearched && !loading && recipes.length === 0"
			class="text-neutral-400 text-center"
		>
			{{ $t("recipeResults.noResults") }}
		</div>

		<div
			v-if="recipes.length > 0"
			class="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
		>
			<RecipeCard v-for="recipe in recipes" :key="recipe.uri" :recipe="recipe" />
		</div>
	</div>
</template>
