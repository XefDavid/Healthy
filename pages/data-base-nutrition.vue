<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "#app";
import foodPlaning from "~/assets/images/foodPlaning.webp";
import { useEdamamDataBase } from "~/composables/useEdamamDataBase";
import noImage from "~/assets/images/noImage.webp";
import DataBaseResult from "./data-base-result.vue";

const { foodData, nutritionData, error, searchFood, getNutritionData } =
	useEdamamDataBase();
const query = ref("");
const loading = ref(false);
const imagesLoaded = ref(0);
const router = useRouter();
const route = useRoute();

const onSearch = async () => {
	if (query.value) {
		loading.value = true;
		await searchFood(query.value);
		await nextTick();

		imagesLoaded.value = 0;
	}
};

watch(imagesLoaded, (count) => {
	loading.value = false;
	imagesLoaded.value = 0;
});

onMounted(() => {
	loading.value = false;
	imagesLoaded.value = 0;
});

const fetchNutritionalInfo = async (foodId: any) => {
	console.log("Fetching nutritional info for food ID:", foodId); // Log antes de la llamada a la API

	const ingredients = [
		{
			quantity: 1,
			measureURI: "http://www.edamam.com/ontologies/edamam.owl#Serving",
			foodId: foodId,
		},
	];

	try {
		const nutritionResponse = await getNutritionData(ingredients);
		console.log("Nutrition response:", nutritionResponse); // Verificar lo que devuelve la API

		if (nutritionResponse) {
			nutritionData.value = nutritionResponse;
			console.log("Nutrition data fetched:", nutritionData.value); // Log de los datos nutricionales

			// Asegurarnos de que `router.push` se llama correctamente
			console.log("Redirecting to /data-base-result with foodId:", foodId);

			// Intentar redirigir con la ruta nombrada
			router.push({ name: "data-base-result", params: { foodId: foodId } });

			// También intentar una redirección directa con la URL para verificar si hay algún problema con el nombre de la ruta
			// router.push(`/data-base-result/${foodId}`);
		} else {
			error.value = "Failed to fetch nutritional info.";
			console.log("Error: No nutrition data returned.");
		}
	} catch (err) {
		error.value = "Failed to fetch nutritional info.";
		console.error("API Error:", err); // Log de error en la API
	}
};

console.log("soy la food data", foodData);
</script>

<template>
	<div class="container mx-auto px-4 py-8">
		<div class="m-4 flex items-center justify-center">
			<img class="w-64 h-64" :src="foodPlaning" alt="Food Planning Logo" />
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
		</div>

		<div class="flex justify-center gap-4 mb-6">
			<input
				type="text"
				v-model="query"
				placeholder="Search for food..."
				class="border border-gray-300 rounded-lg p-2 w-full max-w-md text-center"
			/>
			<Button
				label="Search"
				icon="pi pi-search"
				severity="success"
				class="w-32 !bg-gray-300 !border-none hover:!bg-lime-500"
				@click="onSearch"
				:disabled="!query"
			/>
		</div>

		<div
			v-if="foodData && foodData.length > 0"
			class="w-[900px] flex flex-col mx-auto"
		>
			<h1 class="text-3xl font-bold text-center mb-6">Your Results</h1>

			<div class="grid grid-cols-3 gap-8">
				<div
					v-for="(food, index) in foodData"
					:key="index"
					class="border rounded-lg shadow-lg bg-white p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
				>
					<button
						@click="fetchNutritionalInfo(food.food.foodId)"
						class="self-end text-gray-500"
					>
						<i class="pi pi-info-circle text-lg hover:text-lime-600"></i>
					</button>

					<h2
						class="text-lg font-semibold text-center mt-2 mb-4 overflow-hidden text-ellipsis whitespace-nowrap"
					>
						{{ food.food.label }}
					</h2>

					<div v-if="food.food.image">
						<img
							:src="food.food.image"
							alt="Food Image"
							class="w-full max-h-40 object-cover rounded-lg mb-4 border object-fit"
						/>
					</div>
					<div v-else>
						<img
							:src="noImage"
							alt="No Image"
							class="w-full h-40 object-cover rounded-lg mb-4 border"
						/>
					</div>

					<Button
						label="Get Nutritional Info"
						severity="primary"
						icon="pi pi-info-circle"
						class="w-full mt-auto !bg-gray-200 !border-none hover:!bg-lime-600"
						@click="fetchNutritionalInfo(food.food.foodId)"
					/>
				</div>
			</div>
		</div>

		<div v-else class="text-center text-gray-500">
			<p>No results found. Try another search.</p>
		</div>

		<!-- Display errors -->
		<p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
	</div>
</template>
