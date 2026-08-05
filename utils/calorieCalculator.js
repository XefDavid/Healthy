// Ecuación de Mifflin-St Jeor para el metabolismo basal (BMR), el
// estándar más usado hoy en día para estimar el gasto calórico.
const ACTIVITY_MULTIPLIERS = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	veryActive: 1.9,
};

const GOAL_ADJUSTMENTS = {
	lose: -500,
	maintain: 0,
	gain: 500,
};

export function calculateDailyCalories({
	sex,
	age,
	heightCm,
	weightKg,
	activity,
	goal,
}) {
	const bmr =
		sex === "male"
			? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
			: 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

	const maintenance = bmr * (ACTIVITY_MULTIPLIERS[activity] ?? 1.2);
	const goalCalories = Math.max(
		0,
		maintenance + (GOAL_ADJUSTMENTS[goal] ?? 0)
	);

	// Reparto de macros sugerido: 30% proteína, 40% carbohidratos, 30% grasas.
	const protein = (goalCalories * 0.3) / 4;
	const carbs = (goalCalories * 0.4) / 4;
	const fat = (goalCalories * 0.3) / 9;

	return {
		bmr: Math.round(bmr),
		maintenance: Math.round(maintenance),
		goalCalories: Math.round(goalCalories),
		protein: Math.round(protein),
		carbs: Math.round(carbs),
		fat: Math.round(fat),
	};
}
