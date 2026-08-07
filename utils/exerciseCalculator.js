// Valores MET (Compendium of Physical Activities) por tipo de ejercicio e
// intensidad. 1 MET ≈ 1 kcal por kg de peso corporal por hora, aproximación
// estándar usada para convertir gasto calórico en tiempo/distancia.
export const EXERCISES = {
	running: {
		label: "runner.exercise.running",
		icon: "pi pi-forward",
		intensities: {
			light: { speedKmh: 8, met: 8.3 },
			moderate: { speedKmh: 10, met: 9.8 },
			fast: { speedKmh: 12, met: 11.8 },
		},
	},
	walking: {
		label: "runner.exercise.walking",
		icon: "pi pi-user",
		intensities: {
			light: { speedKmh: 4.8, met: 3.0 },
			moderate: { speedKmh: 5.6, met: 3.8 },
			fast: { speedKmh: 6.4, met: 5.0 },
		},
	},
	cycling: {
		label: "runner.exercise.cycling",
		icon: "pi pi-refresh",
		intensities: {
			light: { speedKmh: 14, met: 4.0 },
			moderate: { speedKmh: 18, met: 8.0 },
			fast: { speedKmh: 22, met: 10.0 },
		},
	},
	swimming: {
		label: "runner.exercise.swimming",
		icon: "pi pi-circle",
		intensities: {
			light: { speedKmh: 2, met: 6.0 },
			moderate: { speedKmh: 2.5, met: 8.3 },
			fast: { speedKmh: 3, met: 10.0 },
		},
	},
};

export function calculateExerciseTime({ calories, weightKg, exercise, intensity }) {
	const exerciseData = EXERCISES[exercise] ?? EXERCISES.running;
	const { speedKmh, met } =
		exerciseData.intensities[intensity] ?? exerciseData.intensities.moderate;

	const caloriesPerMinute = (met * weightKg) / 60;
	const minutes = calories / caloriesPerMinute;
	const km = speedKmh * (minutes / 60);

	return {
		minutes: Math.round(minutes),
		km: Math.round(km * 10) / 10,
		speedKmh,
	};
}
