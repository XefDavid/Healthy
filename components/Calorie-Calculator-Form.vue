<script setup lang="ts">
import { ref, computed } from "vue";
import { calculateDailyCalories } from "~/utils/calorieCalculator";

const sex = ref("female");
const age = ref("");
const heightCm = ref("");
const weightKg = ref("");
const activity = ref("moderate");
const goal = ref("maintain");

const result = ref<ReturnType<typeof calculateDailyCalories> | null>(null);

const isFormValid = computed(
	() =>
		Number(age.value) > 0 &&
		Number(heightCm.value) > 0 &&
		Number(weightKg.value) > 0
);

const calculate = () => {
	if (!isFormValid.value) return;

	result.value = calculateDailyCalories({
		sex: sex.value,
		age: Number(age.value),
		heightCm: Number(heightCm.value),
		weightKg: Number(weightKg.value),
		activity: activity.value,
		goal: goal.value,
	});
};

// Reparto fijo de macros usado por la fórmula (ver utils/calorieCalculator.js):
// 30% proteína, 40% carbohidratos, 30% grasas del total de calorías.
const macroSplit = [
	{
		key: "protein",
		percent: 30,
		icon: "pi pi-heart-fill",
		color: "text-red-400",
		bar: "bg-red-400",
		label: "dataBaseResult.protein",
	},
	{
		key: "carbs",
		percent: 40,
		icon: "pi pi-box",
		color: "text-blue-400",
		bar: "bg-blue-400",
		label: "dataBaseResult.carbs",
	},
	{
		key: "fat",
		percent: 30,
		icon: "pi pi-circle-fill",
		color: "text-yellow-400",
		bar: "bg-yellow-400",
		label: "dataBaseResult.fat",
	},
];
</script>

<template>
	<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Formulario -->
		<div
			class="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4"
		>
			<div class="flex gap-3">
				<button
					type="button"
					@click="sex = 'female'"
					class="flex-1 h-10 rounded-lg border transition text-sm font-medium"
					:class="
						sex === 'female'
							? 'bg-lime-500 text-neutral-950 border-lime-500'
							: 'bg-neutral-800 text-white border-neutral-700 hover:border-lime-500/50'
					"
				>
					{{ $t("calorieCalculator.female") }}
				</button>
				<button
					type="button"
					@click="sex = 'male'"
					class="flex-1 h-10 rounded-lg border transition text-sm font-medium"
					:class="
						sex === 'male'
							? 'bg-lime-500 text-neutral-950 border-lime-500'
							: 'bg-neutral-800 text-white border-neutral-700 hover:border-lime-500/50'
					"
				>
					{{ $t("calorieCalculator.male") }}
				</button>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
				<input
					type="number"
					min="1"
					v-model="age"
					:placeholder="$t('calorieCalculator.age')"
					class="input !min-w-0 text-center"
				/>
				<input
					type="number"
					min="1"
					v-model="heightCm"
					:placeholder="$t('calorieCalculator.height')"
					class="input !min-w-0 text-center"
				/>
				<input
					type="number"
					min="1"
					v-model="weightKg"
					:placeholder="$t('calorieCalculator.weight')"
					class="input !min-w-0 text-center"
				/>
			</div>

			<select
				v-model="activity"
				class="input !justify-start text-sm text-white bg-neutral-900"
			>
				<option value="sedentary">
					{{ $t("calorieCalculator.activity.sedentary") }}
				</option>
				<option value="light">
					{{ $t("calorieCalculator.activity.light") }}
				</option>
				<option value="moderate">
					{{ $t("calorieCalculator.activity.moderate") }}
				</option>
				<option value="active">
					{{ $t("calorieCalculator.activity.active") }}
				</option>
				<option value="veryActive">
					{{ $t("calorieCalculator.activity.veryActive") }}
				</option>
			</select>

			<select
				v-model="goal"
				class="input !justify-start text-sm text-white bg-neutral-900"
			>
				<option value="lose">{{ $t("calorieCalculator.goal.lose") }}</option>
				<option value="maintain">
					{{ $t("calorieCalculator.goal.maintain") }}
				</option>
				<option value="gain">{{ $t("calorieCalculator.goal.gain") }}</option>
			</select>

			<button
				@click="calculate"
				class="mt-1 w-full text-sm h-[44px] bg-lime-500 text-neutral-950 rounded-lg hover:bg-lime-400 transition disabled:opacity-40 disabled:bg-neutral-800 disabled:text-neutral-500"
				:disabled="!isFormValid"
			>
				<i class="pi pi-calculator mr-2"></i>{{ $t("common.calculate") }}
			</button>
		</div>

		<!-- Resumen -->
		<div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5">
			<h3 class="flex items-center gap-2 text-sm font-medium text-white">
				<i class="pi pi-chart-line text-lime-400"></i>
				{{ $t("calorieCalculator.summaryTitle") }}
			</h3>

			<template v-if="result">
				<p class="mt-4 text-sm text-neutral-400">
					{{ $t("calorieCalculator.maintenanceLabel") }}
				</p>
				<p class="text-2xl font-bold text-white">
					{{ result.maintenance }}
					<span class="text-sm font-normal text-neutral-400">kcal/día</span>
				</p>

				<p class="mt-4 text-sm text-neutral-400">
					{{ $t("calorieCalculator.goalCaloriesLabel") }}
				</p>
				<p class="text-2xl font-bold text-lime-400">
					{{ result.goalCalories }}
					<span class="text-sm font-normal text-neutral-400">kcal/día</span>
				</p>

				<div class="mt-2 h-px bg-neutral-800"></div>

				<h4 class="mt-4 mb-3 text-sm font-medium text-neutral-400">
					{{ $t("calorieCalculator.macrosSubtitle") }}
				</h4>
				<ul class="flex flex-col gap-4">
					<li v-for="macro in macroSplit" :key="macro.key">
						<div class="flex items-center justify-between text-sm">
							<span class="flex items-center gap-2 text-neutral-300">
								<i :class="[macro.icon, macro.color]"></i>
								{{ $t(macro.label) }}
							</span>
							<span class="text-neutral-400">
								<strong class="text-white">{{ result[macro.key] }} g</strong>
								· {{ macro.percent }}%
							</span>
						</div>
						<div class="mt-1.5 h-1.5 w-full rounded-full bg-neutral-800">
							<div
								class="h-1.5 rounded-full"
								:class="macro.bar"
								:style="{ width: macro.percent + '%' }"
							></div>
						</div>
					</li>
				</ul>

				<p class="mt-5 flex items-start gap-2 text-xs text-neutral-500">
					<i class="pi pi-info-circle mt-0.5"></i>
					{{ $t("calorieCalculator.disclaimer") }}
				</p>
			</template>

			<div
				v-else
				class="mt-6 flex flex-col items-center gap-2 py-8 text-center text-neutral-500"
			>
				<i class="pi pi-gauge text-3xl"></i>
				<p class="text-sm">{{ $t("calorieCalculator.emptyState") }}</p>
			</div>
		</div>
	</div>
</template>
