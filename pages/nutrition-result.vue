<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app"; // Para claves de API
import foodPlaning from "~/assets/images/foodPlaning.webp";
import noImage from "~/assets/images/no-image.webp";

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
		for (const ingredient of route.query.ingredients as string[]) {
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
						dietLabels: data.dietLabels.join(", "),
					},
				});
			} else {
				throw new Error(`No nutritional data found for ${ingredient}.`);
			}
		}
	} catch (err) {
		error.value = err.message || "Unknown error.";
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
	<div class="flex justify-center font-semibold flex-grow text-center">
		<img
			class="w-[250px] h-[250px]"
			:src="foodPlaning"
			alt="Food Planning Logo"
		/>
	</div>
	<div class="absolute top-3 right-3">
		<nuxt-link to="/">
			<Button
				label="Back"
				severity="secondary"
				text
				icon="pi pi-undo"
				class="button-gray w-full"
			/>
		</nuxt-link>
	</div>

	<div class="flex flex-col items-center">
		<div v-if="loading" class="text-lg text-gray-700">Loading...</div>
		<div v-if="error" class="text-red-500">{{ error }}</div>

		<div v-if="nutritionData.length > 0" class="pb-8">
			<h3
				class="text-gray-900 text-center text-4xl font-extrabold leading-none w-full pb-4 mt-[-50px]"
			>
				Your Nutritional Results
			</h3>

			<ul
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
			>
				<li
					v-for="(result, index) in nutritionData"
					:key="index"
					class="p-6 bg-white shadow-md rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300"
				>
					<h1 class="text-xl font-bold text-gray-700 mb-2">
						{{ result.ingredient }}
					</h1>

					<div class="flex flex-col gap-3 text-left">
						<div class="flex items-center text-gray-600">
							<i class="fas fa-fire text-red-500 mr-2"></i>
							<span class="font-semibold">Calories:</span>
							<span class="ml-auto">{{ result.nutrients.calories }} kcal</span>
						</div>

						<div class="flex items-center text-gray-600">
							<i class="fas fa-cloud text-blue-400 mr-2"></i>
							<span class="font-semibold">Total CO2 Emissions:</span>
							<span class="ml-auto"
								>{{ result.nutrients.totalCO2Emissions }} g</span
							>
						</div>

						<div class="flex items-center text-gray-600">
							<i class="fas fa-leaf text-green-500 mr-2"></i>
							<span class="font-semibold">CO2 Emission Class:</span>
							<span class="ml-auto">{{
								result.nutrients.co2EmissionsClass
							}}</span>
						</div>

						<div class="flex items-center text-gray-600">
							<i class="fas fa-weight text-yellow-500 mr-2"></i>
							<span class="font-semibold">Total Weight:</span>
							<span class="ml-auto">{{ result.nutrients.totalWeight }} g</span>
						</div>

						<div class="flex items-center text-gray-600">
							<i class="fas fa-utensils text-purple-500 mr-2"></i>
							<span class="font-semibold">Diet Labels:</span>
							<span class="ml-auto">{{
								result.nutrients.dietLabels || "N/A"
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
