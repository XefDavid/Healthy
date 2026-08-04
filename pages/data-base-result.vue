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
	<div class="container mx-auto max-w-2xl px-4 pt-16 pb-8">
		<div class="flex justify-between items-center gap-4">
			<h1 class="text-2xl sm:text-3xl font-bold text-white">
				{{ $t("dataBaseResult.title") }}
			</h1>
			<nuxt-link to="/" class="text-lime-400 hover:text-lime-300 shrink-0">{{
				$t("dataBaseResult.backToSearch")
			}}</nuxt-link>
		</div>

		<div v-if="foodDetails">
			<!-- Mostrar los detalles del alimento -->
			<h2 class="text-xl sm:text-2xl font-semibold text-white mt-6">
				{{ foodDetails?.label }}
			</h2>
			<div v-if="foodDetails?.image">
				<img
					:src="foodDetails?.image"
					alt="Food Image"
					class="w-full max-h-60 object-cover rounded-lg mt-4 border border-neutral-800"
				/>
			</div>
			<div v-else>
				<p class="text-neutral-400 mt-2">{{ $t("dataBaseResult.noImage") }}</p>
			</div>

			<div
				class="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/60 p-6"
			>
				<h3 class="text-xl font-medium text-white">
					{{ $t("dataBaseResult.title") }}
					<span class="text-sm font-normal text-neutral-400">{{
						$t("dataBaseResult.per100g")
					}}</span>
				</h3>
				<ul class="list-none mt-2 text-neutral-300">
					<li>
						<strong class="text-white">{{ $t("nutritionResult.calories") }}</strong>
						{{ foodDetails?.calories }}
					</li>
					<li>
						<strong class="text-white">{{ $t("dataBaseResult.fat") }}</strong>
						{{ foodDetails?.totalNutrients.FAT?.quantity }}
						{{ foodDetails?.totalNutrients.FAT?.unit }}
					</li>
					<li>
						<strong class="text-white">{{ $t("dataBaseResult.carbs") }}</strong>
						{{ foodDetails?.totalNutrients.CHOCDF?.quantity }}
						{{ foodDetails?.totalNutrients.CHOCDF?.unit }}
					</li>
					<li>
						<strong class="text-white">{{ $t("dataBaseResult.protein") }}</strong>
						{{ foodDetails?.totalNutrients.PROCNT?.quantity }}
						{{ foodDetails?.totalNutrients.PROCNT?.unit }}
					</li>
				</ul>
			</div>
		</div>

		<div v-else-if="error" class="text-red-500 text-center mt-4">
			<p>{{ error }}</p>
		</div>
	</div>
</template>
