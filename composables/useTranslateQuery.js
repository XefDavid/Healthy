import { FOOD_DICTIONARY } from "~/utils/foodDictionary";

export const useTranslateQuery = () => {
	const { locale } = useI18n();

	const translateText = async (text, langpair) => {
		if (!text) return text;

		try {
			const response = await $fetch("https://api.mymemory.translated.net/get", {
				params: {
					q: text,
					langpair,
				},
			});

			return response?.responseData?.translatedText || text;
		} catch (err) {
			console.error("Translation error:", err);
			return text;
		}
	};

	// Español -> Inglés, usado para enviar las búsquedas del usuario a Edamam.
	// Se ejecuta siempre, independientemente del idioma de la interfaz, porque
	// el usuario puede escribir en español aunque la app esté en inglés (el
	// idioma por defecto). Traducir un texto que ya está en inglés no hace daño.
	// Consulta primero el diccionario de comida (fiable para palabras sueltas)
	// y solo cae a MyMemory si el término no está en el diccionario.
	const translateToEnglish = async (text) => {
		if (!text) return text;

		const dictionaryMatch = FOOD_DICTIONARY[text.trim().toLowerCase()];
		if (dictionaryMatch) return dictionaryMatch;

		return translateText(text, "es|en");
	};

	// Inglés -> Español, usado para mostrar en español los textos que vienen
	// en inglés desde Edamam (ej. títulos de recetas).
	const translateToSpanish = async (text) => {
		if (!text || locale.value !== "es") return text;

		return translateText(text, "en|es");
	};

	return { translateToEnglish, translateToSpanish };
};
