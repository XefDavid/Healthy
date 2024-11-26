<script setup lang="ts">
import { useRoute } from "vue-router"; // Importar useRoute de vue-router
import { ref, onMounted } from "vue";
import { useEdamamDataBase } from "~/composables/useEdamamDataBase";

const route = useRoute(); // Obtener parámetros de la URL
const foodId = ref(route.params.foodId); // Obtener el foodId de los parámetros de la ruta
const foodDetails = ref(null);
const error = ref("");

const { getNutritionData } = useEdamamDataBase();

// Función para obtener la información nutricional del alimento
const fetchFoodDetails = async () => {
	const ingredients = [
		{
			quantity: 1,
			measureURI: "http://www.edamam.com/ontologies/edamam.owl#Serving",
			foodId: foodId.value,
		},
	];

	try {
		const response = await getNutritionData(ingredients);
		if (response) {
			foodDetails.value = response;
		} else {
			error.value = "No nutritional data found.";
		}
	} catch (err) {
		error.value = "Error fetching data.";
		console.error("Error fetching data:", err);
	}
};

onMounted(() => {
	fetchFoodDetails(); // Llamar a la función cuando el componente se monte
});
</script>

<template>
	<div class="container mx-auto px-4 py-8">
		<div class="flex justify-between items-center">
			<h1 class="text-3xl font-bold">Nutritional Information</h1>
			<nuxt-link to="/" class="text-blue-500">Back to Search</nuxt-link>
		</div>

		<div v-if="foodDetails">
			<!-- Mostrar los detalles del alimento -->
			<h2 class="text-2xl font-semibold">{{ foodDetails?.label }}</h2>
			<div v-if="foodDetails?.image">
				<img
					:src="foodDetails?.image"
					alt="Food Image"
					class="w-full max-h-40 object-cover rounded-lg mt-4"
				/>
			</div>
			<div v-else>
				<p>No image available.</p>
			</div>

			<div class="mt-6">
				<h3 class="text-xl font-medium">Nutritional Information</h3>
				<ul class="list-none">
					<li><strong>Calories:</strong> {{ foodDetails?.calories }}</li>
					<li>
						<strong>Fat:</strong>
						{{ foodDetails?.totalNutrients.FAT?.quantity }}
						{{ foodDetails?.totalNutrients.FAT?.unit }}
					</li>
					<li>
						<strong>Carbs:</strong>
						{{ foodDetails?.totalNutrients.CHOCDF?.quantity }}
						{{ foodDetails?.totalNutrients.CHOCDF?.unit }}
					</li>
					<li>
						<strong>Protein:</strong>
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
