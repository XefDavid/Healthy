<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

// Definición de propiedades recibidas desde el componente padre
const props = defineProps({
	selectedQuantity: String,
	selectedMeasure: String,
	selectedIngredient: String,
});

// Definición de eventos para comunicar cambios al componente padre
const emits = defineEmits([
	"update:selectedQuantity",
	"update:selectedMeasure",
	"update:selectedIngredient",
]);

// Opciones para las medidas
const measures = [
	{ label: "Ounce", value: "ounce" },
	{ label: "Gram", value: "gram" },
	{ label: "Pound", value: "pound" },
	{ label: "Kilogram", value: "kilogram" },
	{ label: "Pinch", value: "pinch" },
	{ label: "Liter", value: "liter" },
	{ label: "Gallon", value: "gallon" },
	{ label: "Pint", value: "pint" },
	{ label: "Quart", value: "quart" },
	{ label: "Milliliter", value: "milliliter" },
	{ label: "Drop", value: "drop" },
	{ label: "Cup", value: "cup" },
	{ label: "Tablespoon", value: "tablespoon" },
	{ label: "Teaspoon", value: "teaspoon" },
];
</script>
<template>
	<div
		class="mb-8 flex justify-between items-center bg-lime-500 text-sm p-1 rounded-lg gap-2"
	>
		<!-- Input para la cantidad -->
		<div>
			<InputText
				type="text"
				:placeholder="'Quantity'"
				:value="props.selectedQuantity"
				@input="$emit('update:selectedQuantity', $event.target.value)"
				class="w-[100px] h-[34px] text-center border border-gray-300 rounded-lg ml-1"
			/>
		</div>

		<!-- Dropdown para seleccionar la medida -->

		<Dropdown
			:model-value="props.selectedMeasure"
			:options="measures"
			optionLabel="label"
			optionValue="value"
			placeholder="Measure"
			class="w-[150px] h-[34px] border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:bg-lime-100 flex items-center"
			@update:model-value="$emit('update:selectedMeasure', $event)"
		/>

		<!-- Input para el nombre del ingrediente -->

		<InputText
			type="text"
			:placeholder="'Ingredient'"
			:value="props.selectedIngredient"
			@input="$emit('update:selectedIngredient', $event.target.value)"
			class="w-[140px] border border-gray-300 rounded-lg text-center mr-1 h-[34px]"
		/>
	</div>
</template>

<style scoped>
.input-topBar {
	width: 80px;
	padding: 0.5rem;
	border-radius: 0.25rem;
	border: 1px solid #ccc;
}
.measures {
	width: 100px;
}
</style>
