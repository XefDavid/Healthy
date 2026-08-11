// Proxy fino a la Recipe Search API de Edamam: las claves viven en
// runtimeConfig privado (server-only) en vez de runtimeConfig.public, así
// que nunca llegan al bundle JS que descarga el navegador.
export default defineEventHandler(async (event) => {
	const { q } = getQuery(event);
	const config = useRuntimeConfig(event);

	return $fetch("https://api.edamam.com/api/recipes/v2", {
		params: {
			q,
			app_id: config.edamamRecipesAppId,
			app_key: config.edamamRecipesAppKey,
			type: "public",
			from: 0,
			to: 100,
		},
	});
});
