<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

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
	<div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
		<!-- Input para la cantidad -->
		<input
			type="text"
			:placeholder="$t('selectNutrition.quantity')"
			:value="props.selectedQuantity"
			@input="$emit('update:selectedQuantity', $event.target.value)"
			class="input !min-w-0 text-center"
		/>

		<!-- Select para la medida -->
		<select
			:value="props.selectedMeasure"
			@change="$emit('update:selectedMeasure', $event.target.value)"
			class="input !min-w-0 !justify-start bg-neutral-900 text-sm"
			:class="props.selectedMeasure ? '!text-white' : '!text-neutral-500'"
		>
			<option value="" disabled hidden>{{ $t("selectNutrition.measure") }}</option>
			<option v-for="measure in measures" :key="measure.value" :value="measure.value">
				{{ measure.label }}
			</option>
		</select>

		<!-- Input para el nombre del ingrediente -->
		<input
			type="text"
			:placeholder="$t('selectNutrition.ingredient')"
			:value="props.selectedIngredient"
			@input="$emit('update:selectedIngredient', $event.target.value)"
			class="input !min-w-0 text-center"
		/>
	</div>
</template>
