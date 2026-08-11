<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { scaleIngredients, calculateRecipeCost } from "~/utils/recetaAdaptada";
import { translateMeasure } from "~/utils/measureLabels";
import { useTranslateRecipe } from "~/composables/useTranslateRecipe";
import { useSavedRecipes } from "~/composables/useSavedRecipes";

const { t, te } = useI18n();

// `receta` ya viene construida (reactive) por quien use este componente:
// pages/adapt-recipe.vue la crea desde Edamam, pages/my-recipes/[id].vue
// la carga ya guardada. `autoTranslate` solo debe ser true la primera vez
// (datos crudos en inglés) — nunca al reabrir una receta ya guardada, o
// sobreescribiría en silencio cualquier corrección manual del usuario.
const props = withDefaults(defineProps<{ receta: any; autoTranslate?: boolean }>(), {
	autoTranslate: false,
});
const receta = props.receta;

const router = useRouter();
const { saveRecipe } = useSavedRecipes();

const racionesDeseadas = ref(receta.racionesBase);
const activeLang = ref<"es" | "en">("es");

const ingredientesEscalados = computed(() =>
	scaleIngredients(receta.ingredientes, receta.racionesBase, racionesDeseadas.value)
);

const costeReceta = computed(() => calculateRecipeCost(ingredientesEscalados.value, racionesDeseadas.value));

// Estado de UI puro (no forma parte del documento RecetaAdaptada): qué
// ingredientes tienen el panel de precio abierto, y en qué modo cada uno.
const costOpenIndices = reactive<Set<number>>(new Set());
const costModes = reactive<Record<number, "kilo" | "paquete" | "unidad">>({});

const toggleCostPanel = (index: number) => {
	if (costOpenIndices.has(index)) {
		costOpenIndices.delete(index);
	} else {
		costOpenIndices.add(index);
		if (!costModes[index]) costModes[index] = "kilo";
	}
};

// Solo un modo vive a la vez: al cambiar, se limpian los otros dos para que
// ingredientCost no tenga que decidir cuál manda si el usuario rellenó más
// de uno. €/ud es el modo natural para ingredientes que se compran por
// pieza y no por peso (huevos, yemas de huevo...).
const setCostMode = (index: number, mode: "kilo" | "paquete" | "unidad") => {
	costModes[index] = mode;
	const ingrediente = receta.ingredientes[index];
	if (mode !== "kilo") ingrediente.precioPorKilo = null;
	if (mode !== "paquete") {
		ingrediente.precioPaquete = null;
		ingrediente.gramosPaquete = null;
	}
	if (mode !== "unidad") ingrediente.precioPorUnidad = null;
};

const decreaseServings = () => {
	if (racionesDeseadas.value > 1) racionesDeseadas.value -= 1;
};
const increaseServings = () => {
	racionesDeseadas.value += 1;
};

const { translating: translatingContent, hadFailures, translateRecipeContent } = useTranslateRecipe();

onMounted(() => {
	if (!props.autoTranslate) return;

	translateRecipeContent({
		titulo: receta.tituloEn,
		ingredientesEn: receta.ingredientes.map((ingrediente) => ingrediente.nombreEn),
	}).then(({ tituloEs, ingredientesEs }) => {
		receta.tituloEs = tituloEs ?? receta.tituloEs;
		ingredientesEs?.forEach((nombreEs, index) => {
			receta.ingredientes[index].nombreEs = nombreEs;
		});
	});
});

const saveRecetaGuardada = () => {
	saveRecipe(receta);
	router.push("/my-recipes");
};
</script>

<template>
	<div class="flex flex-col gap-6">
		<div
			class="flex flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-5 sm:flex-row sm:items-center"
		>
			<img
				v-if="receta.imagen"
				:src="receta.imagen"
				:alt="receta.tituloEs"
				class="h-32 w-full rounded-lg object-cover sm:w-40"
			/>
			<div class="flex flex-1 flex-col gap-1">
				<input
					v-if="activeLang === 'es'"
					v-model="receta.tituloEs"
					class="input !min-w-0 text-lg font-semibold"
				/>
				<input v-else v-model="receta.tituloEn" class="input !min-w-0 text-lg font-semibold" />
				<a
					:href="receta.fuente.url"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-lime-400"
				>
					<i class="pi pi-external-link"></i>
					{{ $t("adaptRecipe.sourceLabel") }} {{ receta.fuente.nombre }}
				</a>
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-3">
			<div class="flex gap-1.5">
				<button
					type="button"
					@click="activeLang = 'es'"
					class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
					:class="activeLang === 'es' ? 'bg-lime-500 text-neutral-950' : 'border border-neutral-700 bg-neutral-800 text-neutral-300'"
				>
					Español
				</button>
				<button
					type="button"
					@click="activeLang = 'en'"
					class="rounded-lg px-3 py-1.5 text-xs font-medium transition"
					:class="activeLang === 'en' ? 'bg-lime-500 text-neutral-950' : 'border border-neutral-700 bg-neutral-800 text-neutral-300'"
				>
					English
				</button>
			</div>
			<span v-if="translatingContent" class="flex items-center gap-1.5 text-xs text-neutral-400">
				<i class="pi pi-spin pi-spinner"></i>
				{{ $t("adaptRecipe.translating") }}
			</span>
		</div>

		<p v-if="hadFailures" class="text-xs text-neutral-500">
			<i class="pi pi-exclamation-triangle mr-1 text-yellow-500"></i>
			{{ $t("adaptRecipe.translationWarning") }}
		</p>

		<div class="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
			<span class="text-sm text-neutral-300">{{ $t("adaptRecipe.servingsLabel") }}</span>
			<div class="flex items-center gap-3">
				<button
					type="button"
					@click="decreaseServings"
					class="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-white transition hover:border-lime-500/50"
					:disabled="racionesDeseadas <= 1"
				>
					<i class="pi pi-minus text-xs"></i>
				</button>
				<span class="w-6 text-center text-lg font-semibold text-white">{{ racionesDeseadas }}</span>
				<button
					type="button"
					@click="increaseServings"
					class="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-white transition hover:border-lime-500/50"
				>
					<i class="pi pi-plus text-xs"></i>
				</button>
			</div>
		</div>

		<div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
			<h3 class="mb-3 text-sm font-medium text-neutral-300">
				{{ $t("adaptRecipe.ingredientsTitle") }}
			</h3>
			<ul class="flex flex-col gap-2">
				<li
					v-for="(ingrediente, index) in receta.ingredientes"
					:key="index"
					class="flex flex-col gap-2 border-b border-neutral-800 py-2 text-sm last:border-0"
				>
					<div class="flex items-center gap-3">
						<input
							v-if="activeLang === 'es'"
							v-model="ingrediente.nombreEs"
							class="input !min-w-0 flex-1 !py-1.5 text-sm"
						/>
						<input v-else v-model="ingrediente.nombreEn" class="input !min-w-0 flex-1 !py-1.5 text-sm" />

						<span v-if="ingredientesEscalados[index].esImpreciso" class="shrink-0 italic text-neutral-500">
							{{ $t("adaptRecipe.toTaste") }}
						</span>
						<span v-else class="shrink-0 text-neutral-400">
							{{ ingredientesEscalados[index].cantidad }} {{ translateMeasure(ingredientesEscalados[index].unidad, t, te) }}
						</span>

						<button
							type="button"
							@click="toggleCostPanel(index)"
							class="shrink-0 text-neutral-500 transition hover:text-lime-400"
							:class="{ 'text-lime-400': costOpenIndices.has(index) }"
							:aria-label="$t('adaptRecipe.addPrice')"
						>
							<i class="pi pi-euro"></i>
						</button>
					</div>

					<div v-if="costOpenIndices.has(index)" class="flex flex-wrap items-center gap-2 pl-1">
						<div class="flex gap-1">
							<button
								type="button"
								@click="setCostMode(index, 'kilo')"
								class="rounded-lg px-2.5 py-1 text-xs font-medium transition"
								:class="costModes[index] === 'kilo' ? 'bg-lime-500 text-neutral-950' : 'border border-neutral-700 bg-neutral-800 text-neutral-300'"
							>
								{{ $t("adaptRecipe.costModeKilo") }}
							</button>
							<button
								type="button"
								@click="setCostMode(index, 'paquete')"
								class="rounded-lg px-2.5 py-1 text-xs font-medium transition"
								:class="costModes[index] === 'paquete' ? 'bg-lime-500 text-neutral-950' : 'border border-neutral-700 bg-neutral-800 text-neutral-300'"
							>
								{{ $t("adaptRecipe.costModePackage") }}
							</button>
							<button
								type="button"
								@click="setCostMode(index, 'unidad')"
								class="rounded-lg px-2.5 py-1 text-xs font-medium transition"
								:class="costModes[index] === 'unidad' ? 'bg-lime-500 text-neutral-950' : 'border border-neutral-700 bg-neutral-800 text-neutral-300'"
							>
								{{ $t("adaptRecipe.costModeUnit") }}
							</button>
						</div>

						<input
							v-if="costModes[index] === 'kilo'"
							v-model.number="ingrediente.precioPorKilo"
							type="number"
							min="0"
							step="0.01"
							:placeholder="$t('adaptRecipe.costPerKiloLabel')"
							class="input !min-w-0 w-28 !py-1 text-xs"
						/>
						<template v-else-if="costModes[index] === 'paquete'">
							<input
								v-model.number="ingrediente.precioPaquete"
								type="number"
								min="0"
								step="0.01"
								:placeholder="$t('adaptRecipe.costPackagePriceLabel')"
								class="input !min-w-0 w-28 !py-1 text-xs"
							/>
							<input
								v-model.number="ingrediente.gramosPaquete"
								type="number"
								min="0"
								step="1"
								:placeholder="$t('adaptRecipe.costPackageGramsLabel')"
								class="input !min-w-0 w-28 !py-1 text-xs"
							/>
						</template>
						<input
							v-else
							v-model.number="ingrediente.precioPorUnidad"
							type="number"
							min="0"
							step="0.01"
							:placeholder="$t('adaptRecipe.costPerUnitLabel')"
							class="input !min-w-0 w-28 !py-1 text-xs"
						/>
					</div>
				</li>
			</ul>
		</div>

		<div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
			<h3 class="mb-3 text-sm font-medium text-neutral-300">
				{{ $t("adaptRecipe.costTitle") }}
			</h3>
			<p v-if="costeReceta.total === 0" class="text-sm text-neutral-400">
				{{ $t("adaptRecipe.costEmptyHint") }}
			</p>
			<ul v-else class="flex flex-col gap-2 text-sm">
				<li class="flex items-center justify-between">
					<span class="text-neutral-300">{{ $t("adaptRecipe.costTotalLabel") }}</span>
					<span class="font-semibold text-white">{{ costeReceta.total.toFixed(2) }} €</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-neutral-300">{{ $t("adaptRecipe.costPerServingLabel") }}</span>
					<span class="font-semibold text-lime-400">{{ costeReceta.perServing.toFixed(2) }} €</span>
				</li>
			</ul>
		</div>

		<div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
			<h3 class="mb-3 text-sm font-medium text-neutral-300">
				{{ $t("adaptRecipe.instructionsTitle") }}
			</h3>
			<p class="mb-3 text-sm text-neutral-400">
				{{ $t("adaptRecipe.instructionsHint") }}
			</p>
			<a
				:href="receta.fuente.url"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 text-sm text-lime-400 hover:text-lime-300"
			>
				<i class="pi pi-external-link"></i>
				{{ $t("adaptRecipe.instructionsLink") }}
			</a>
		</div>

		<div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
			<h3 class="mb-3 text-sm font-medium text-neutral-300">
				{{ $t("adaptRecipe.notesTitle") }}
			</h3>
			<textarea
				v-model="receta.notas"
				rows="4"
				:placeholder="$t('adaptRecipe.notesPlaceholder')"
				class="input !min-w-0 w-full resize-y text-sm"
			/>
		</div>

		<button
			type="button"
			@click="saveRecetaGuardada"
			class="h-[44px] w-full rounded-lg bg-lime-500 text-sm font-medium text-neutral-950 transition hover:bg-lime-400"
		>
			<i class="pi pi-bookmark mr-2"></i>{{ $t("adaptRecipe.saveButton") }}
		</button>
	</div>
</template>
