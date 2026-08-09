<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { calculateExerciseTime, EXERCISES } from "~/utils/exerciseCalculator";

const props = defineProps<{ initialCalories?: string }>();

type Step = "calories" | "weight" | "exercise" | "animating" | "result";
const step = ref<Step>("calories");

const calories = ref(props.initialCalories ?? "");
const weightKg = ref("");
const exercise = ref("running");
const intensity = ref("moderate");

const result = ref<ReturnType<typeof calculateExerciseTime> | null>(null);

const isCaloriesValid = computed(() => Number(calories.value) > 0);
const isWeightValid = computed(() => Number(weightKg.value) > 0);

watch(
	() => props.initialCalories,
	(value) => {
		if (value) calories.value = value;
	}
);

const exerciseOptions = Object.entries(EXERCISES).map(([value, data]) => ({
	value,
	label: data.label,
	icon: data.icon,
}));

const intensities = [
	{ value: "light", label: "runner.intensity.light" },
	{ value: "moderate", label: "runner.intensity.moderate" },
	{ value: "fast", label: "runner.intensity.fast" },
];

const exerciseEmoji: Record<string, string> = {
	running: "🏃",
	walking: "🚶",
	cycling: "🚴",
	swimming: "🏊",
};
const animationEmoji = computed(() => exerciseEmoji[exercise.value] ?? "🏃");

const goToWeightStep = () => {
	if (!isCaloriesValid.value) return;
	step.value = "weight";
};

const goToExerciseStep = () => {
	if (!isWeightValid.value) return;
	step.value = "exercise";
};

const calculate = () => {
	step.value = "animating";

	setTimeout(() => {
		result.value = calculateExerciseTime({
			calories: Number(calories.value),
			weightKg: Number(weightKg.value),
			exercise: exercise.value,
			intensity: intensity.value,
		});
		step.value = "result";
	}, 1800);
};

const reset = () => {
	step.value = "calories";
	calories.value = "";
	weightKg.value = "";
	exercise.value = "running";
	intensity.value = "moderate";
	result.value = null;
};
</script>

<template>
	<div
		class="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-6"
	>
		<!-- Paso 1: calorías -->
		<div v-if="step === 'calories'" class="flex flex-col gap-4">
			<div class="flex flex-col items-center gap-2 text-center">
				<i class="pi pi-bolt text-3xl text-lime-400"></i>
				<h2 class="text-lg font-semibold text-white">
					{{ $t("runner.stepCaloriesTitle") }}
				</h2>
				<p class="text-sm text-neutral-400">
					{{ $t("runner.stepCaloriesSubtitle") }}
				</p>
			</div>
			<input
				type="number"
				min="1"
				v-model="calories"
				:placeholder="$t('runner.caloriesPlaceholder')"
				class="input w-full !min-w-0 text-center text-lg"
				@keyup.enter="goToWeightStep"
			/>
			<button
				@click="goToWeightStep"
				class="h-[44px] w-full rounded-lg bg-lime-500 text-sm font-medium text-neutral-950 transition hover:bg-lime-400 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:opacity-40"
				:disabled="!isCaloriesValid"
			>
				{{ $t("common.continue") }}
				<i class="pi pi-arrow-right ml-2"></i>
			</button>
		</div>

		<!-- Paso 2: peso -->
		<div v-else-if="step === 'weight'" class="flex flex-col gap-4">
			<div class="flex flex-col items-center gap-2 text-center">
				<i class="pi pi-user text-3xl text-lime-400"></i>
				<h2 class="text-lg font-semibold text-white">
					{{ $t("runner.stepWeightTitle") }}
				</h2>
			</div>
			<input
				type="number"
				min="1"
				v-model="weightKg"
				:placeholder="$t('calorieCalculator.weight')"
				class="input w-full !min-w-0 text-center text-lg"
				@keyup.enter="goToExerciseStep"
			/>
			<div class="flex gap-2">
				<button
					@click="step = 'calories'"
					class="h-[44px] w-12 shrink-0 rounded-lg border border-neutral-700 bg-neutral-800 text-white transition hover:border-lime-500/50"
				>
					<i class="pi pi-arrow-left"></i>
				</button>
				<button
					@click="goToExerciseStep"
					class="h-[44px] w-full rounded-lg bg-lime-500 text-sm font-medium text-neutral-950 transition hover:bg-lime-400 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:opacity-40"
					:disabled="!isWeightValid"
				>
					{{ $t("common.continue") }}
					<i class="pi pi-arrow-right ml-2"></i>
				</button>
			</div>
		</div>

		<!-- Paso 3: ejercicio + ritmo -->
		<div v-else-if="step === 'exercise'" class="flex flex-col gap-4">
			<div class="flex flex-col items-center gap-2 text-center">
				<i class="pi pi-map text-3xl text-lime-400"></i>
				<h2 class="text-lg font-semibold text-white">
					{{ $t("runner.stepExerciseTitle") }}
				</h2>
			</div>

			<div class="flex flex-col gap-2">
				<p class="text-sm text-neutral-400">{{ $t("runner.exerciseLabel") }}</p>
				<div class="grid grid-cols-4 gap-2">
					<button
						v-for="option in exerciseOptions"
						:key="option.value"
						type="button"
						@click="exercise = option.value"
						class="flex flex-col items-center gap-1 rounded-lg border p-2 text-xs font-medium transition"
						:class="
							exercise === option.value
								? 'border-lime-500 bg-lime-500/15 text-lime-400'
								: 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-lime-500/50'
						"
					>
						<span class="text-lg leading-none">{{ option.icon }}</span>
						{{ $t(option.label) }}
					</button>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<p class="text-sm text-neutral-400">{{ $t("runner.intensityLabel") }}</p>
				<div class="grid grid-cols-3 gap-2">
					<button
						v-for="option in intensities"
						:key="option.value"
						type="button"
						@click="intensity = option.value"
						class="rounded-lg border p-2 text-xs font-medium transition"
						:class="
							intensity === option.value
								? 'border-lime-500 bg-lime-500/15 text-lime-400'
								: 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-lime-500/50'
						"
					>
						{{ $t(option.label) }}
					</button>
				</div>
			</div>

			<div class="flex gap-2">
				<button
					@click="step = 'weight'"
					class="h-[44px] w-12 shrink-0 rounded-lg border border-neutral-700 bg-neutral-800 text-white transition hover:border-lime-500/50"
				>
					<i class="pi pi-arrow-left"></i>
				</button>
				<button
					@click="calculate"
					class="h-[44px] w-full rounded-lg bg-lime-500 text-sm font-medium text-neutral-950 transition hover:bg-lime-400"
				>
					<i class="pi pi-calculator mr-2"></i>{{ $t("common.calculate") }}
				</button>
			</div>
		</div>

		<!-- Paso 4: animación -->
		<div
			v-else-if="step === 'animating'"
			class="flex flex-col items-center gap-6 py-6"
		>
			<p class="text-sm text-neutral-400">{{ $t("runner.calculating") }}</p>
			<div class="relative h-1 w-full overflow-hidden rounded-full bg-neutral-800">
				<span class="runner-track absolute -left-6 text-2xl">{{ animationEmoji }}</span>
			</div>
		</div>

		<!-- Paso 5: resultado -->
		<div v-else-if="step === 'result' && result" class="flex flex-col gap-5">
			<div class="flex flex-col items-center gap-2 text-center">
				<i class="pi pi-flag-fill text-3xl text-lime-400"></i>
				<h2 class="text-lg font-semibold text-white">
					{{ $t("runner.resultTitle") }}
				</h2>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div
					class="flex flex-col items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
				>
					<span class="text-2xl font-bold text-white">{{ result.minutes }}</span>
					<span class="text-xs text-neutral-400">{{ $t("runner.minutes") }}</span>
				</div>
				<div
					class="flex flex-col items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
				>
					<span class="text-2xl font-bold text-lime-400">{{ result.km }}</span>
					<span class="text-xs text-neutral-400">{{ $t("runner.km") }}</span>
				</div>
			</div>

			<p class="flex items-start gap-2 text-xs text-neutral-500">
				<i class="pi pi-info-circle mt-0.5"></i>
				{{ $t("runner.disclaimer") }}
			</p>

			<button
				@click="reset"
				class="h-[44px] w-full rounded-lg border border-neutral-700 bg-neutral-800 text-sm font-medium text-white transition hover:border-lime-500/50 hover:text-lime-400"
			>
				<i class="pi pi-replay mr-2"></i>{{ $t("runner.calculateAgain") }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.runner-track {
	animation: runner-move 1.8s ease-in-out forwards;
}

@keyframes runner-move {
	0% {
		left: -1.5rem;
		transform: scaleX(1);
	}
	100% {
		left: 100%;
		transform: scaleX(1);
	}
}
</style>
