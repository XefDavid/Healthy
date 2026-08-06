<script setup lang="ts">
import { ref, computed } from "vue";
import SelectNutrition from "./Select-Nutrition.vue";
import { useTranslateQuery } from "~/composables/useTranslateQuery";
import { useEdamamRecipeAnalysis } from "~/composables/useEdamamRecipeAnalysis";
import { translateDietLabel } from "~/utils/dietLabels";

const { t } = useI18n();
const { translateToEnglish } = useTranslateQuery();
const { result, loading, error, analyzeRecipe } = useEdamamRecipeAnalysis();

const dishName = ref("");
const ingredientsList = ref<string[]>([]);
const formError = ref("");

const selectedQuantity = ref("");
const selectedMeasure = ref("");
const selectedIngredient = ref("");

const isIngredientValid = computed(
	() =>
		selectedQuantity.value.trim().length > 0 &&
		selectedMeasure.value.trim().length > 0 &&
		selectedIngredient.value.trim().length > 0
);

const hasIngredients = computed(() => ingredientsList.value.length > 0);
const canCalculate = computed(
	() => dishName.value.trim().length > 0 && hasIngredients.value
);

const dietLabels = computed(() =>
	(result.value?.dietLabels || [])
		.map((label: string) => translateDietLabel(label, t))
		.join(", ")
);

const addIngredient = async () => {
	if (isIngredientValid.value) {
		const translatedIngredient = await translateToEnglish(
			selectedIngredient.value
		);
		ingredientsList.value.push(
			`${selectedQuantity.value} ${selectedMeasure.value} of ${translatedIngredient}`
		);

		selectedQuantity.value = "";
		selectedMeasure.value = "";
		selectedIngredient.value = "";
		formError.value = "";
	} else {
		formError.value = t("nutritionFinder.invalidIngredient");
	}
};

const removeIngredient = (index: number) => {
	ingredientsList.value.splice(index, 1);
};

const calculate = async () => {
	if (!canCalculate.value) return;
	await analyzeRecipe(dishName.value, ingredientsList.value);
};
</script>

<template>
	<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Formulario -->
		<div class="flex flex-col gap-4">
			<div
				class="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4"
			>
				<input
					type="text"
					v-model="dishName"
					:placeholder="$t('recipeAnalyzer.dishNamePlaceholder')"
					class="input w-full !min-w-0 text-center"
				/>

				<div class="flex flex-col sm:flex-row gap-2 justify-center items-center">
					<SelectNutrition
						v-model:selectedQuantity="selectedQuantity"
						v-model:selectedMeasure="selectedMeasure"
						v-model:selectedIngredient="selectedIngredient"
					/>
					<button
						@click="addIngredient"
						class="text-sm h-[44px] w-full sm:w-[130px] shrink-0 bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-white"
						:disabled="!isIngredientValid"
					>
						{{ $t("common.addIngredient") }}
					</button>
				</div>

				<p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
			</div>

			<div
				v-if="hasIngredients"
				class="border border-neutral-800 bg-neutral-900/60 rounded-lg"
			>
				<h3 class="font-bold p-3 text-white text-sm">
					{{ $t("nutritionFinder.yourIngredients") }}
				</h3>
				<ul class="flex flex-col">
					<li
						v-for="(ingredient, index) in ingredientsList"
						:key="index"
						class="flex justify-between items-center px-3 py-1.5"
					>
						<span class="text-neutral-200 text-sm">{{ ingredient }}</span>
						<button
							@click="removeIngredient(index)"
							class="text-neutral-500 hover:text-red-500"
						>
							<i class="pi pi-trash"></i>
						</button>
					</li>
				</ul>
			</div>

			<button
				v-if="hasIngredients"
				@click="calculate"
				class="text-sm h-[44px] w-full bg-lime-500 text-neutral-950 rounded-lg hover:bg-lime-400 transition disabled:opacity-40 disabled:bg-neutral-800 disabled:text-neutral-500"
				:disabled="!canCalculate || loading"
			>
				<i class="pi pi-calculator mr-2"></i>
				{{ loading ? $t("common.loading") : $t("common.calculate") }}
			</button>

			<div v-if="error" class="text-red-500 text-sm text-center">
				{{ $t("recipeAnalyzer.error") }}
			</div>
		</div>

		<!-- Resumen -->
		<div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
			<h3 class="flex items-center gap-2 text-sm font-medium text-white">
				<i class="pi pi-chart-line text-lime-400"></i>
				{{ $t("recipeAnalyzer.resultsSubtitle") }}
			</h3>

			<template v-if="result">
				<p class="mt-3 text-lg font-semibold text-white">{{ dishName }}</p>

				<ul class="list-none mt-4 flex flex-col gap-3 text-left">
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-bolt text-orange-400"></i>
							{{ $t("nutritionResult.calories") }}
						</span>
						<span class="font-semibold text-white"
							>{{ Math.round(result.calories) }} kcal</span
						>
					</li>
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-circle-fill text-yellow-400"></i>
							{{ $t("dataBaseResult.fat") }}
						</span>
						<span class="font-semibold text-white"
							>{{ result.totalNutrients?.FAT?.quantity?.toFixed(2) }}
							{{ result.totalNutrients?.FAT?.unit }}</span
						>
					</li>
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-box text-blue-400"></i>
							{{ $t("dataBaseResult.carbs") }}
						</span>
						<span class="font-semibold text-white"
							>{{ result.totalNutrients?.CHOCDF?.quantity?.toFixed(2) }}
							{{ result.totalNutrients?.CHOCDF?.unit }}</span
						>
					</li>
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-heart-fill text-red-400"></i>
							{{ $t("dataBaseResult.protein") }}
						</span>
						<span class="font-semibold text-white"
							>{{ result.totalNutrients?.PROCNT?.quantity?.toFixed(2) }}
							{{ result.totalNutrients?.PROCNT?.unit }}</span
						>
					</li>
					<li class="flex items-center justify-between gap-2">
						<span class="flex items-center gap-2 text-neutral-300 shrink-0">
							<i class="pi pi-tags text-purple-400"></i>
							{{ $t("nutritionResult.dietLabels") }}
						</span>
						<span class="font-semibold text-white text-right">{{
							dietLabels || $t("nutritionResult.notAvailable")
						}}</span>
					</li>
				</ul>
			</template>

			<div
				v-else
				class="mt-6 flex flex-col items-center gap-2 py-8 text-center text-neutral-500"
			>
				<i class="pi pi-calculator text-3xl"></i>
				<p class="text-sm">{{ $t("recipeAnalyzer.emptyState") }}</p>
			</div>
		</div>
	</div>
</template>
