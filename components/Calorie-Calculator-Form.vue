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
</script>

<template>
	<div class="flex w-full flex-col items-center justify-center gap-6 px-4">
		<div class="w-full max-w-md">
			<h1
				class="text-lime-400 text-center text-3xl sm:text-4xl font-medium leading-none w-full"
			>
				{{ $t("calorieCalculator.title") }}
			</h1>

			<div
				class="mt-6 flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4"
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
			</div>

			<button
				@click="calculate"
				class="mt-4 w-full text-sm h-[44px] bg-neutral-800 text-white border border-neutral-700 rounded-lg hover:bg-lime-500 hover:text-neutral-950 hover:border-lime-500 transition disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-white"
				:disabled="!isFormValid"
			>
				{{ $t("common.calculate") }}
			</button>
		</div>

		<div
			v-if="result"
			class="w-full max-w-xs rounded-lg border border-neutral-800 bg-neutral-900/60 p-5"
		>
			<h3 class="text-lg font-medium text-white text-center">
				{{ $t("calorieCalculator.goalCaloriesLabel") }}
			</h3>
			<p class="text-center text-3xl font-bold text-lime-400 mt-1">
				{{ result.goalCalories }} kcal
			</p>

			<ul class="list-none mt-4 flex flex-col gap-2 text-left text-sm">
				<li class="flex items-center justify-between">
					<span class="text-neutral-400">{{
						$t("calorieCalculator.bmrLabel")
					}}</span>
					<span class="font-medium text-neutral-200"
						>{{ result.bmr }} kcal</span
					>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-neutral-400">{{
						$t("calorieCalculator.maintenanceLabel")
					}}</span>
					<span class="font-medium text-neutral-200"
						>{{ result.maintenance }} kcal</span
					>
				</li>
			</ul>

			<h4 class="text-sm font-medium text-neutral-400 mt-4 mb-2">
				{{ $t("calorieCalculator.macrosSubtitle") }}
			</h4>
			<ul class="list-none flex flex-col gap-3 text-left">
				<li class="flex items-center justify-between">
					<span class="flex items-center gap-2 text-neutral-300">
						<i class="pi pi-heart-fill text-red-400"></i>
						{{ $t("dataBaseResult.protein") }}
					</span>
					<span class="font-semibold text-white">{{ result.protein }} g</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="flex items-center gap-2 text-neutral-300">
						<i class="pi pi-box text-blue-400"></i>
						{{ $t("dataBaseResult.carbs") }}
					</span>
					<span class="font-semibold text-white">{{ result.carbs }} g</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="flex items-center gap-2 text-neutral-300">
						<i class="pi pi-circle-fill text-yellow-400"></i>
						{{ $t("dataBaseResult.fat") }}
					</span>
					<span class="font-semibold text-white">{{ result.fat }} g</span>
				</li>
			</ul>

			<p class="mt-4 text-xs text-neutral-500 text-center">
				{{ $t("calorieCalculator.disclaimer") }}
			</p>
		</div>
	</div>
</template>
