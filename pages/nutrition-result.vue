<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app";
import { translateDietLabel, translateHealthLabel } from "~/utils/dietLabels";

const { t } = useI18n();
const loading = ref(false);
const error = ref("");
const nutritionData = ref<any[]>([]);
const route = useRoute();

const nutrientValue = (totalNutrients: any, key: string) =>
	totalNutrients?.[key]?.quantity ? Math.round(totalNutrients[key].quantity) : 0;

const fetchNutrition = async () => {
	loading.value = true;
	error.value = "";
	nutritionData.value = [];

	const config = useRuntimeConfig();

	try {
		const ingredients = Array.isArray(route.query.ingredients)
			? route.query.ingredients
			: [route.query.ingredients];

		for (const ingredient of ingredients as string[]) {
			const appId = config.public.edamamNutritionAppId;
			const appKey = config.public.edamamNutritionAppKey;
			const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
				ingredient
			)}`;

			const response = await fetch(url);
			if (!response.ok) {
				const errorMessage = await response.text();
				throw new Error(`API query error: ${errorMessage}`);
			}

			const data = await response.json();
			if (data.totalNutrients && Object.keys(data.totalNutrients).length > 0) {
				nutritionData.value.push({
					ingredient,
					nutrients: {
						calories: Math.round(data.calories),
						fat: nutrientValue(data.totalNutrients, "FAT"),
						carbs: nutrientValue(data.totalNutrients, "CHOCDF"),
						protein: nutrientValue(data.totalNutrients, "PROCNT"),
						fiber: nutrientValue(data.totalNutrients, "FIBTG"),
						sugar: nutrientValue(data.totalNutrients, "SUGAR"),
						sodium: nutrientValue(data.totalNutrients, "NA"),
						totalCO2Emissions: Math.round(data.totalCO2Emissions),
						co2EmissionsClass: data.co2EmissionsClass,
						totalWeight: Math.round(data.totalWeight),
						dietLabels: (data.dietLabels || []).map((l: string) =>
							translateDietLabel(l, t)
						),
						healthLabels: (data.healthLabels || [])
							.map((l: string) => translateHealthLabel(l, t))
							.filter(Boolean),
					},
				});
			} else {
				throw new Error(`No nutritional data found for ${ingredient}.`);
			}
		}
	} catch (err) {
		error.value = err instanceof Error ? err.message : t("nutritionResult.unknownError");
		console.error(err);
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	if (route.query.ingredients) {
		fetchNutrition();
	}
});
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative max-w-4xl">
			<AppBreadcrumb :label="$t('nutritionResult.title')" />

			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-apple text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("nutritionResult.title") }}
					</h1>
				</div>
			</div>

			<div v-if="loading" class="text-sm text-neutral-400">
				{{ $t("common.loading") }}
			</div>
			<div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

			<div
				v-if="nutritionData.length > 0"
				class="flex flex-wrap justify-center gap-6"
			>
				<div
					v-for="(result, index) in nutritionData"
					:key="index"
					class="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 p-5 transition duration-300 hover:border-lime-500/40 sm:w-[380px]"
				>
					<h2 class="mb-4 text-lg font-semibold text-white">
						{{ result.ingredient }}
					</h2>

					<ul class="flex flex-col gap-3 text-left">
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-bolt text-orange-400"></i>
								{{ $t("nutritionResult.calories") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.calories }} kcal</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-circle-fill text-yellow-400"></i>
								{{ $t("dataBaseResult.fat") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.fat }} g</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-box text-blue-400"></i>
								{{ $t("dataBaseResult.carbs") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.carbs }} g</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-heart-fill text-red-400"></i>
								{{ $t("dataBaseResult.protein") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.protein }} g</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-align-justify text-lime-400"></i>
								{{ $t("nutritionResult.fiber") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.fiber }} g</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-stop-circle text-pink-400"></i>
								{{ $t("nutritionResult.sugar") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.sugar }} g</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-percentage text-cyan-400"></i>
								{{ $t("nutritionResult.sodium") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.sodium }} mg</span>
						</li>

						<div class="my-1 h-px bg-neutral-800"></div>

						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-cloud text-blue-300"></i>
								{{ $t("nutritionResult.co2Emissions") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.totalCO2Emissions }} g</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-verified text-green-400"></i>
								{{ $t("nutritionResult.co2Class") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.co2EmissionsClass }}</span>
						</li>
						<li class="flex items-center justify-between">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-gauge text-neutral-400"></i>
								{{ $t("nutritionResult.totalWeight") }}
							</span>
							<span class="font-semibold text-white">{{ result.nutrients.totalWeight }} g</span>
						</li>
						<li v-if="result.nutrients.dietLabels.length" class="flex flex-col gap-2">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-tags text-purple-400"></i>
								{{ $t("nutritionResult.dietLabels") }}
							</span>
							<div class="flex flex-wrap gap-1.5">
								<span
									v-for="label in result.nutrients.dietLabels"
									:key="label"
									:title="label"
									class="rounded-full border border-purple-400/30 bg-purple-400/10 px-2.5 py-1 text-xs font-medium text-purple-300"
								>
									{{ label }}
								</span>
							</div>
						</li>
						<li v-if="result.nutrients.healthLabels.length" class="flex flex-col gap-2">
							<span class="flex items-center gap-2 text-neutral-300">
								<i class="pi pi-shield text-lime-400"></i>
								{{ $t("nutritionResult.healthLabels") }}
							</span>
							<div class="flex flex-wrap gap-1.5">
								<span
									v-for="label in result.nutrients.healthLabels"
									:key="label"
									:title="label"
									class="rounded-full border border-lime-500/30 bg-lime-500/10 px-2.5 py-1 text-xs font-medium text-lime-300"
								>
									{{ label }}
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
