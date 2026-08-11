// Unidades de tipo "pieza" (sin medida continua): redondeamos al 0.5 más
// cercano en vez de a 1 decimal, para evitar cosas como "2.3333 huevos".
// Sin `measure` (Edamam no siempre lo da, ej. "2 eggs") se trata igual.
const PIECE_MEASURES = new Set([
	"unit",
	"whole",
	"clove",
	"piece",
	"leaf",
	"sprig",
	"stalk",
	"slice",
]);

const isPieceMeasure = (measure) =>
	!measure || PIECE_MEASURES.has(measure.toLowerCase());

export const roundQuantity = (value, measure) =>
	isPieceMeasure(measure) ? Math.round(value * 2) / 2 : Math.round(value * 10) / 10;

// Edamam devuelve quantity: 0 cuando no reconoce ninguna cantidad en el
// ingrediente original (ej. "kosher salt", "salt to taste"). No confundir
// con measure "<unit>", que Edamam también usa para ingredientes normales
// contados por pieza y con cantidad real (ej. "3 eggs").
export const isImpreciseIngredient = (ingrediente) => ingrediente.cantidad === 0;

export const scaleIngredients = (ingredientes, racionesBase, racionesDeseadas) => {
	const factor = racionesDeseadas / (racionesBase || 1);
	return ingredientes.map((ingrediente) => {
		const esImpreciso = isImpreciseIngredient(ingrediente);
		return {
			...ingrediente,
			esImpreciso,
			cantidad: esImpreciso
				? ingrediente.cantidad
				: roundQuantity(ingrediente.cantidad * factor, ingrediente.unidad),
			// A diferencia de `cantidad`, el peso en gramos sí se escala aunque
			// el ingrediente sea impreciso (Edamam da una estimación de peso
			// incluso para "sal al gusto"), porque es la base del coste.
			pesoGramos: Math.round((ingrediente.pesoBaseGramos || 0) * factor),
		};
	});
};

// Coste total de un ingrediente ya escalado, o null si no tiene precio (no
// participa en el total). El modo €/ud multiplica por `cantidad` (huevos,
// yemas...: se compran por pieza, no por peso, así que forzar un precio por
// gramo aquí no tendría sentido); los otros dos modos usan `pesoGramos`
// (estimación de Edamam, ya escalada) en vez de `cantidad`, porque esta
// puede venir en tazas o cucharadas, que no son gramos.
export const ingredientCost = (ingrediente) => {
	if (ingrediente.precioPorUnidad) return ingrediente.precioPorUnidad * ingrediente.cantidad;
	if (ingrediente.precioPorKilo) return (ingrediente.precioPorKilo / 1000) * ingrediente.pesoGramos;
	if (ingrediente.precioPaquete && ingrediente.gramosPaquete) {
		return (ingrediente.precioPaquete / ingrediente.gramosPaquete) * ingrediente.pesoGramos;
	}
	return null;
};

export const calculateRecipeCost = (ingredientesEscalados, racionesDeseadas) => {
	const total = ingredientesEscalados.reduce((suma, ingrediente) => {
		const coste = ingredientCost(ingrediente);
		return coste === null ? suma : suma + coste;
	}, 0);

	return {
		total: Math.round(total * 100) / 100,
		perServing: Math.round((total / (racionesDeseadas || 1)) * 100) / 100,
	};
};

// tituloEs/tituloEn e nombreEs/nombreEn parten del mismo texto de Edamam
// (normalmente inglés) hasta que la traducción automática rellene la
// columna que falte.
/** @returns {import("~/types/recipe").RecetaAdaptada} */
export const createRecetaAdaptadaFromEdamam = (recipe) => {
	// `food` es el nombre limpio del ingrediente (ej. "flour"); `text` es la
	// línea completa original (ej. "2 cups all-purpose flour") y no nos sirve
	// aquí porque cantidad y unidad ya se muestran por separado.
	const ingredientes = (recipe.ingredients || []).map((ingrediente) => ({
		nombreEs: ingrediente.food || ingrediente.text,
		nombreEn: ingrediente.food || ingrediente.text,
		cantidad: ingrediente.quantity || 0,
		unidad: ingrediente.measure || "",
		pesoBaseGramos: ingrediente.weight || 0,
		precioPorKilo: null,
		precioPaquete: null,
		gramosPaquete: null,
		precioPorUnidad: null,
	}));

	return {
		id: crypto.randomUUID(),
		tituloEs: recipe.label,
		tituloEn: recipe.label,
		imagen: recipe.image,
		racionesBase: recipe.yield || 4,
		ingredientes,
		notas: "",
		fuente: {
			nombre: recipe.source,
			url: recipe.url,
		},
		fechaGuardada: new Date().toISOString(),
	};
};
