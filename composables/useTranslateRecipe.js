import { useTranslateQuery } from "~/composables/useTranslateQuery";

// Traduce el contenido inglés de una receta adaptada (título, nombres de
// ingrediente, pasos) al español en un solo lote con Promise.all. Cada
// texto va en su propio try/catch: si uno falla, esa entrada se queda en
// inglés en vez de tirar toda la traducción.
export const useTranslateRecipe = () => {
	const { translateTextStrict } = useTranslateQuery();

	const translating = ref(false);
	const hadFailures = ref(false);

	const translateBatch = (texts) =>
		Promise.all(
			texts.map(async (text) => {
				try {
					return await translateTextStrict(text, "en|es");
				} catch (err) {
					console.error("Recipe translation error:", err);
					hadFailures.value = true;
					return text;
				}
			})
		);

	// Acepta cualquier subconjunto de { titulo, ingredientesEn, pasosEn } y
	// devuelve solo las claves correspondientes ya traducidas, en el mismo
	// orden/longitud que la entrada.
	/**
	 * @param {{ titulo?: string, ingredientesEn?: string[], pasosEn?: string[] }} payload
	 * @returns {Promise<{ tituloEs?: string, ingredientesEs?: string[], pasosEs?: string[] }>}
	 */
	const translateRecipeContent = async ({ titulo, ingredientesEn, pasosEn }) => {
		translating.value = true;
		try {
			const texts = [];
			if (titulo) texts.push(titulo);
			if (ingredientesEn) texts.push(...ingredientesEn);
			if (pasosEn) texts.push(...pasosEn);

			const translated = await translateBatch(texts);

			let offset = 0;
			const result = {};
			if (titulo) result.tituloEs = translated[offset++];
			if (ingredientesEn) {
				result.ingredientesEs = translated.slice(offset, offset + ingredientesEn.length);
				offset += ingredientesEn.length;
			}
			if (pasosEn) {
				result.pasosEs = translated.slice(offset, offset + pasosEn.length);
				offset += pasosEn.length;
			}
			return result;
		} finally {
			translating.value = false;
		}
	};

	return { translating, hadFailures, translateRecipeContent };
};
