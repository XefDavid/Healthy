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
const router = useRouter();

const onSearch = async () => {
	if (query.value) {
		loading.value = true;
		const translatedQuery = await translateToEnglish(query.value);
		await searchFood(translatedQuery);

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

	<div class="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-16">
		<AppLogo size="lg" />

		<h1 class="text-lime-400 text-center text-3xl sm:text-4xl font-medium leading-none">
			{{ $t("dataBase.title") }}
		</h1>

		<div class="flex w-full max-w-md flex-col sm:flex-row justify-center gap-4">
			<input
				type="text"
				v-model="query"
				:placeholder="$t('dataBase.placeholder')"
				class="input w-full max-w-md text-center"
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
			class="w-full max-w-[900px] flex flex-col mx-auto"
		>
			<h1 class="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
				{{ $t("dataBase.resultsTitle") }}
			</h1>

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

		<div v-else class="text-center text-neutral-400">
			<p>{{ $t("dataBase.noResults") }}</p>
		</div>

		<!-- Display errors -->
		<p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
	</div>
</template>
