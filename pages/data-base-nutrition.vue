<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter } from "#app";
import { useEdamamDataBase } from "~/composables/useEdamamDataBase";
import { useTranslateQuery } from "~/composables/useTranslateQuery";

const { t } = useI18n();
const { translateToEnglish, translateToSpanish } = useTranslateQuery();
const { foodData, nutritionData, error, searchFood, getNutritionData } =
	useEdamamDataBase();
const query = ref("");
const loading = ref(false);
const imagesLoaded = ref(0);
const hasSearched = ref(false);
const router = useRouter();

const onSearch = async () => {
	if (query.value) {
		loading.value = true;
		const translatedQuery = await translateToEnglish(query.value);
		await searchFood(translatedQuery);
		hasSearched.value = true;

		if (foodData.value) {
			await Promise.all(
				foodData.value.map(async (hint: any) => {
					hint.food.label = await translateToSpanish(hint.food.label);
				})
			);
		}

		await nextTick();

		imagesLoaded.value = 0;
	}
};

watch(imagesLoaded, () => {
	loading.value = false;
	imagesLoaded.value = 0;
});

onMounted(() => {
	loading.value = false;
	imagesLoaded.value = 0;
});

const fetchNutritionalInfo = async (food: any) => {
	const foodId = food.foodId;
	console.log("Fetching nutritional info for food ID:", foodId); // Log antes de la llamada a la API

	const ingredients = [
		{
			quantity: 100,
			measureURI: "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
			foodId: foodId,
		},
	];

	try {
		const nutritionResponse = await getNutritionData(ingredients);
		console.log("Nutrition response:", nutritionResponse); // Verificar lo que devuelve la API

		if (nutritionResponse) {
			nutritionData.value = nutritionResponse;
			console.log("Nutrition data fetched:", nutritionData.value); // Log de los datos nutricionales

			router.push({
				path: "/data-base-result",
				query: { foodId, label: food.label, image: food.image || "" },
			});
		} else {
			error.value = t("dataBase.failedInfo");
			console.log("Error: No nutrition data returned.");
		}
	} catch (err) {
		error.value = t("dataBase.failedInfo");
		console.error("API Error:", err); // Log de error en la API
	}
};

console.log("soy la food data", foodData);
</script>

<template>
	<div class="relative z-0 h-full px-4 py-8 sm:px-8 sm:py-10">
		<PageBackground />

		<div class="relative flex h-full max-w-4xl flex-col">
			<AppBreadcrumb :label="$t('dataBase.title')" />

			<div class="mb-8 flex shrink-0 items-center gap-4">
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-lime-400"
				>
					<i class="pi pi-chart-bar text-2xl"></i>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-white sm:text-3xl">
						{{ $t("dataBase.title") }}
					</h1>
					<p class="mt-1 text-sm text-neutral-400">
						{{ $t("home.dataSubtitle") }}
					</p>
				</div>
			</div>

			<div class="min-h-0 flex-1 overflow-y-auto">
				<div class="flex w-full max-w-xl flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 sm:flex-row">
					<input
						type="text"
						v-model="query"
						:placeholder="$t('dataBase.placeholder')"
						class="input w-full text-center"
					/>
					<Button
						:label="$t('common.search')"
						icon="pi pi-search"
						severity="success"
						class="button-green w-full sm:w-32 shrink-0 disabled:!bg-neutral-800 disabled:!text-neutral-500 disabled:cursor-not-allowed disabled:border-none"
						@click="onSearch"
						:disabled="!query"
					/>
				</div>

				<div
					v-if="foodData && foodData.length > 0"
					class="mt-8 flex w-full flex-col"
				>
					<h2 class="text-xl font-bold text-white mb-6 text-center sm:text-left">
						{{ $t("dataBase.resultsTitle") }}
					</h2>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
						<div
							v-for="(food, index) in foodData"
							:key="index"
							class="border border-neutral-800 rounded-lg bg-neutral-900/60 p-4 flex flex-col justify-between hover:border-lime-500/40 transition duration-300"
						>
							<button
								@click="fetchNutritionalInfo(food.food)"
								class="self-end text-neutral-400"
							>
								<i class="pi pi-info-circle text-lg hover:text-lime-400"></i>
							</button>

							<h2
								class="text-lg font-semibold text-center mt-2 mb-4 overflow-hidden text-ellipsis whitespace-nowrap text-white"
							>
								{{ food.food.label }}
							</h2>

							<div v-if="food.food.image">
								<img
									:src="food.food.image"
									alt="Food Image"
									class="w-full max-h-40 object-cover rounded-lg mb-4 border border-neutral-800 object-fit"
								/>
							</div>
							<div
								v-else
								class="w-full h-40 mb-4 flex flex-col items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-600"
							>
								<i class="pi pi-image text-3xl"></i>
								<span class="text-xs text-neutral-500">{{
									$t("dataBase.noImage")
								}}</span>
							</div>

							<Button
								:label="$t('dataBase.getInfo')"
								severity="primary"
								icon="pi pi-info-circle"
								class="w-full mt-auto !bg-neutral-800 !text-white !border-none hover:!bg-lime-600 hover:!text-neutral-950"
								@click="fetchNutritionalInfo(food.food)"
							/>
						</div>
					</div>
				</div>

				<div v-else-if="hasSearched" class="mt-8 text-center text-neutral-400">
					<p>{{ $t("dataBase.noResults") }}</p>
				</div>

				<!-- Display errors -->
				<p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
			</div>
		</div>
	</div>
</template>
