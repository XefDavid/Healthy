<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app"; // Para claves de API
import { translateDietLabel } from "~/utils/dietLabels";

const { t } = useI18n();
const loading = ref(false);
const error = ref("");
const nutritionData = ref<any[]>([]);
const route = useRoute();

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
						totalCO2Emissions: Math.round(data.totalCO2Emissions),
						co2EmissionsClass: data.co2EmissionsClass,
						totalWeight: Math.round(data.totalWeight),
						dietLabels: data.dietLabels.map((l: string) => translateDietLabel(l, t)).join(", "),
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
// Ejecuta la búsqueda al cargar la página
onMounted(() => {
	if (route.query.ingredients) {
		fetchNutrition();
	}
});
</script>

<template>
	<div class="absolute top-3 right-3">
		<nuxt-link to="/">
			<Button
				:label="$t('common.back')"
				severity="secondary"
				text
				icon="pi pi-undo"
				class="button-gray w-full"
			/>
		</nuxt-link>
	</div>

	<div class="flex flex-col items-center gap-8 px-4 py-16">
		<AppLogo size="sm" />

		<div v-if="loading" class="text-lg text-neutral-300">
			{{ $t("common.loading") }}
		</div>
		<div v-if="error" class="text-red-500 text-center">{{ error }}</div>

		<div v-if="nutritionData.length > 0" class="w-full pb-8">
			<h3
				class="text-white text-center text-3xl sm:text-4xl font-extrabold leading-none w-full pb-8"
			>
				{{ $t("nutritionResult.title") }}
			</h3>

			<ul class="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto px-4">
				<li
					v-for="(result, index) in nutritionData"
					:key="index"
					class="w-full sm:w-80 p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl hover:border-lime-500/40 transition duration-300"
				>
					<h1 class="text-xl font-bold text-white mb-2">
						{{ result.ingredient }}
					</h1>

					<div class="flex flex-col gap-3 text-left">
						<div class="flex items-center text-neutral-300">
							<i class="fas fa-fire text-red-500 mr-2"></i>
							<span class="font-semibold">{{ $t("nutritionResult.calories") }}</span>
							<span class="ml-auto">{{ result.nutrients.calories }} kcal</span>
						</div>

						<div class="flex items-center text-neutral-300">
							<i class="fas fa-cloud text-blue-400 mr-2"></i>
							<span class="font-semibold">{{ $t("nutritionResult.co2Emissions") }}</span>
							<span class="ml-auto"
								>{{ result.nutrients.totalCO2Emissions }} g</span
							>
						</div>

						<div class="flex items-center text-neutral-300">
							<i class="fas fa-leaf text-green-500 mr-2"></i>
							<span class="font-semibold">{{ $t("nutritionResult.co2Class") }}</span>
							<span class="ml-auto">{{
								result.nutrients.co2EmissionsClass
							}}</span>
						</div>

						<div class="flex items-center text-neutral-300">
							<i class="fas fa-weight text-yellow-500 mr-2"></i>
							<span class="font-semibold">{{ $t("nutritionResult.totalWeight") }}</span>
							<span class="ml-auto">{{ result.nutrients.totalWeight }} g</span>
						</div>

						<div class="flex items-center text-neutral-300">
							<i class="fas fa-utensils text-purple-500 mr-2"></i>
							<span class="font-semibold">{{ $t("nutritionResult.dietLabels") }}</span>
							<span class="ml-auto">{{
								result.nutrients.dietLabels || $t("nutritionResult.notAvailable")
							}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
