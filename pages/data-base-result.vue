<script setup lang="ts">
import { useRoute } from "vue-router"; // Importar useRoute de vue-router
import { ref, onMounted } from "vue";
import { useEdamamDataBase } from "~/composables/useEdamamDataBase";
import { useTranslateQuery } from "~/composables/useTranslateQuery";

const { t } = useI18n();
const { translateToSpanish } = useTranslateQuery();
const route = useRoute(); // Obtener parámetros de la URL
const foodId = ref(route.query.foodId); // Obtener el foodId de los query params
// El endpoint de nutrientes no devuelve label/image, así que se pasan
// desde la búsqueda anterior a través de los query params.
const foodLabel = ref(route.query.label as string);
const foodImage = ref((route.query.image as string) || "");
const foodDetails = ref<any>(null);
const error = ref("");

const { getNutritionData } = useEdamamDataBase();

// Función para obtener la información nutricional del alimento
const fetchFoodDetails = async () => {
	const ingredients = [
		{
			quantity: 100,
			measureURI: "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
			foodId: foodId.value,
		},
	];

	try {
		const response = await getNutritionData(ingredients);
		if (response) {
			response.label = await translateToSpanish(foodLabel.value);
			response.image = foodImage.value;
			foodDetails.value = response;
		} else {
			error.value = t("dataBaseResult.noData");
		}
	} catch (err) {
		error.value = t("dataBaseResult.fetchError");
		console.error("Error fetching data:", err);
	}
};

onMounted(() => {
	fetchFoodDetails(); // Llamar a la función cuando el componente se monte
});
</script>

<template>
	<div class="absolute top-3 right-3">
		<nuxt-link to="/" class="text-lime-400 hover:text-lime-300 text-sm">{{
			$t("dataBaseResult.backToSearch")
		}}</nuxt-link>
	</div>

	<div
		class="flex min-h-screen flex-col items-center gap-6 px-4 pt-16 pb-8 text-center"
	>
		<h1 class="text-2xl sm:text-3xl font-bold text-white">
			{{ $t("dataBaseResult.title") }}
		</h1>

		<div v-if="foodDetails" class="flex w-full flex-col items-center gap-6">
			<h2
				class="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-white"
			>
				<i class="pi pi-apple text-lime-400"></i>
				{{ foodDetails?.label }}
			</h2>

			<div
				class="rounded-2xl bg-white p-2 shadow-lg shadow-black/40 border border-neutral-800"
			>
				<img
					v-if="foodDetails?.image"
					:src="foodDetails?.image"
					alt="Food Image"
					class="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-xl"
				/>
				<div
					v-else
					class="w-44 h-44 sm:w-52 sm:h-52 flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-100 text-neutral-400"
				>
					<i class="pi pi-image text-3xl"></i>
					<span class="text-xs">{{ $t("dataBaseResult.noImage") }}</span>
				</div>
			</div>

			<div
				class="w-full max-w-xs rounded-lg border border-neutral-800 bg-neutral-900/60 p-5"
			>
				<h3 class="text-lg font-medium text-white">
					{{ $t("dataBaseResult.title") }}
					<span class="block text-xs font-normal text-neutral-400">{{
						$t("dataBaseResult.per100g")
					}}</span>
				</h3>
				<ul class="list-none mt-4 flex flex-col gap-3 text-left">
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-bolt text-orange-400"></i>
							{{ $t("nutritionResult.calories") }}
						</span>
						<span class="font-semibold text-white">{{
							foodDetails?.calories?.toFixed(2)
						}}</span>
					</li>
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-circle-fill text-yellow-400"></i>
							{{ $t("dataBaseResult.fat") }}
						</span>
						<span class="font-semibold text-white"
							>{{ foodDetails?.totalNutrients.FAT?.quantity?.toFixed(2) }}
							{{ foodDetails?.totalNutrients.FAT?.unit }}</span
						>
					</li>
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-box text-blue-400"></i>
							{{ $t("dataBaseResult.carbs") }}
						</span>
						<span class="font-semibold text-white"
							>{{ foodDetails?.totalNutrients.CHOCDF?.quantity?.toFixed(2) }}
							{{ foodDetails?.totalNutrients.CHOCDF?.unit }}</span
						>
					</li>
					<li class="flex items-center justify-between">
						<span class="flex items-center gap-2 text-neutral-300">
							<i class="pi pi-heart-fill text-red-400"></i>
							{{ $t("dataBaseResult.protein") }}
						</span>
						<span class="font-semibold text-white"
							>{{ foodDetails?.totalNutrients.PROCNT?.quantity?.toFixed(2) }}
							{{ foodDetails?.totalNutrients.PROCNT?.unit }}</span
						>
					</li>
				</ul>
			</div>
		</div>

		<div v-else-if="error" class="text-red-500 text-center mt-4">
			<p>{{ error }}</p>
		</div>
	</div>
</template>
