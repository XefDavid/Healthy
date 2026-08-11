// Edamam devuelve `measure` en inglés y en minúsculas (ej. "cup",
// "tablespoon"), o el literal "<unit>" cuando el ingrediente se cuenta por
// pieza sin unidad concreta (ej. "3 eggs"). Reutiliza el mismo diccionario
// de medidas que ya usa el buscador de nutrición (`selectNutrition.measures`)
// para no duplicar traducciones.
const normalizeMeasureKey = (unidad) => (unidad || "").replace(/[<>]/g, "").trim().toLowerCase();

export const translateMeasure = (unidad, t, te) => {
	if (!unidad) return "";

	const key = `selectNutrition.measures.${normalizeMeasureKey(unidad)}`;
	return te(key) ? t(key) : unidad;
};
