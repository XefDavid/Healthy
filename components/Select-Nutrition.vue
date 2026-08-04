<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
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

const { t } = useI18n();

// Opciones para las medidas
const measures = computed(() => [
	{ label: t("selectNutrition.measures.ounce"), value: "ounce" },
	{ label: t("selectNutrition.measures.gram"), value: "gram" },
	{ label: t("selectNutrition.measures.pound"), value: "pound" },
	{ label: t("selectNutrition.measures.kilogram"), value: "kilogram" },
	{ label: t("selectNutrition.measures.pinch"), value: "pinch" },
	{ label: t("selectNutrition.measures.liter"), value: "liter" },
	{ label: t("selectNutrition.measures.gallon"), value: "gallon" },
	{ label: t("selectNutrition.measures.pint"), value: "pint" },
	{ label: t("selectNutrition.measures.quart"), value: "quart" },
	{ label: t("selectNutrition.measures.milliliter"), value: "milliliter" },
	{ label: t("selectNutrition.measures.drop"), value: "drop" },
	{ label: t("selectNutrition.measures.cup"), value: "cup" },
	{ label: t("selectNutrition.measures.tablespoon"), value: "tablespoon" },
	{ label: t("selectNutrition.measures.teaspoon"), value: "teaspoon" },
]);
</script>
<template>
	<div
		class="mb-8 flex justify-between items-center bg-lime-500 text-sm p-1 rounded-lg gap-2"
	>
		<!-- Input para la cantidad -->
		<div>
			<InputText
				type="text"
				:placeholder="$t('selectNutrition.quantity')"
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
			:placeholder="$t('selectNutrition.measure')"
			class="w-[150px] h-[34px] border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:bg-lime-100 flex items-center"
			@update:model-value="$emit('update:selectedMeasure', $event)"
		/>

		<!-- Input para el nombre del ingrediente -->

		<InputText
			type="text"
			:placeholder="$t('selectNutrition.ingredient')"
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
