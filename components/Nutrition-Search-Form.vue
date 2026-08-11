<script setup lang="ts">
import { ref, computed } from "vue";
import SelectNutrition from "./Select-Nutrition.vue";
import { useRouter } from "vue-router";
import { useTranslateQuery } from "~/composables/useTranslateQuery";

const router = useRouter();
const { t } = useI18n();
const { translateToEnglish } = useTranslateQuery();

const ingredientsList = ref<string[]>([]);
const loading = ref(false);
const error = ref("");

const selectedQuantity = ref("");
const selectedMeasure = ref("");
const selectedIngredient = ref("");

const isIngredientValid = computed(
	() =>
		selectedQuantity.value.trim().length > 0 &&
		selectedMeasure.value.trim().length > 0 &&
		selectedIngredient.value.trim().length > 0
);

const addIngredient = async () => {
	if (isIngredientValid.value) {
		const translatedIngredient = await translateToEnglish(
			selectedIngredient.value
		);
		const formattedIngredient = `${selectedQuantity.value} ${selectedMeasure.value} of ${translatedIngredient}`;
		ingredientsList.value.push(formattedIngredient);

		selectedQuantity.value = "";
		selectedMeasure.value = "";
		selectedIngredient.value = "";
		error.value = "";
	} else {
		error.value = t("nutritionFinder.invalidIngredient");
	}
};

const hasIngredients = computed(() => ingredientsList.value.length > 0);

const removeIngredient = (index: number) => {
	ingredientsList.value.splice(index, 1);
};

const redirectToResults = () => {
	if (hasIngredients.value) {
		router.push({
			path: "/nutrition-result",
			query: { ingredients: ingredientsList.value },
		});
	}
};
</script>
<template>
	<div class="flex w-full flex-col gap-6">
		<div
			class="flex w-full max-w-2xl flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-3"
		>
			<SelectNutrition
				v-model:selectedQuantity="selectedQuantity"
				v-model:selectedMeasure="selectedMeasure"
				v-model:selectedIngredient="selectedIngredient"
			/>
			<button
				@click="addIngredient"
				class="w-full text-sm h-[44px] bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-white"
				:disabled="!isIngredientValid"
			>
				{{ $t("common.addIngredient") }}
			</button>
		</div>

		<div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

		<div class="flex flex-col sm:flex-row items-center gap-2">
			<div
				v-if="hasIngredients"
				class="border border-neutral-700 bg-neutral-900/60 text-center rounded-lg"
			>
				<h3 class="font-bold p-2 text-white">
					{{ $t("nutritionFinder.yourIngredients") }}
				</h3>
				<ul class="w-full max-w-xs flex flex-col">
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
				@click="redirectToResults"
				class="text-sm h-[44px] w-full sm:w-[160px] bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40"
				:disabled="loading || !hasIngredients"
			>
				{{ $t("nutritionFinder.getInfo") }}
			</button>
		</div>
	</div>
</template>
