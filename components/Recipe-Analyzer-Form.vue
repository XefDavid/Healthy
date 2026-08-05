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
	<div class="flex w-full flex-col items-center justify-center gap-6 px-4">
		<div class="w-full max-w-xl">
			<h1
				class="text-lime-400 text-center text-3xl sm:text-4xl font-medium leading-none w-full"
			>
				{{ $t("recipeAnalyzer.title") }}
			</h1>

			<input
				type="text"
				v-model="dishName"
				:placeholder="$t('recipeAnalyzer.dishNamePlaceholder')"
				class="input w-full mt-6 text-center"
			/>

			<div
				class="mt-4 flex flex-col sm:flex-row gap-2 justify-center items-center rounded-lg border border-neutral-800 bg-neutral-900/60 p-3"
			>
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
		</div>

		<div v-if="formError" class="text-red-500 text-sm">{{ formError }}</div>

		<div
			v-if="hasIngredients"
			class="w-full max-w-xs border border-neutral-700 bg-neutral-900/60 text-center rounded-lg"
		>
			<h3 class="font-bold p-2 text-white">
				{{ $t("nutritionFinder.yourIngredients") }}
			</h3>
			<ul class="flex flex-col">
				<li
					v-for="(ingredient, index) in ingredientsList"
					:key="index"
					class="flex justify-between items-center p-1"
				>
					<span class="pl-2 text-neutral-200">{{ ingredient }}</span>
					<button
						@click="removeIngredient(index)"
						class="text-neutral-500 hover:text-red-500 pr-2"
					>
						<i class="pi pi-trash"></i>
					</button>
				</li>
			</ul>
		</div>

		<button
			v-if="hasIngredients"
			@click="calculate"
			class="text-sm h-[44px] w-full sm:w-[200px] bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40"
			:disabled="!canCalculate || loading"
		>
			{{ loading ? $t("common.loading") : $t("common.calculate") }}
		</button>

		<div v-if="error" class="text-red-500 text-sm text-center">
			{{ $t("recipeAnalyzer.error") }}
		</div>

		<div
			v-if="result"
			class="w-full max-w-xs rounded-lg border border-neutral-800 bg-neutral-900/60 p-5"
		>
			<h3 class="text-lg font-medium text-white text-center">
				{{ dishName }}
			</h3>
			<span class="block text-xs font-normal text-neutral-400 text-center">{{
				$t("recipeAnalyzer.resultsSubtitle")
			}}</span>

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
		</div>
	</div>
</template>
