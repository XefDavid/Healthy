# Healthy 🥗

Aplicación web construida con **Nuxt 3** para planificar tu alimentación: buscar recetas, consultar información nutricional, analizar tus propias recetas, calcular tus calorías diarias, recibir sugerencias de recetas con lo que tienes a mano, calcular cuánto ejercicio hace falta para quemar unas calorías dadas, y adaptar cualquier receta encontrada a un documento propio (traducido, escalado por raciones, con coste y notas) guardado en "Mis Recetas". Interfaz de panel/dashboard con barra lateral fija, a pantalla completa en cada herramienta, tema oscuro, totalmente responsiva y disponible en **español e inglés**.

## Índice

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Seguridad: claves de API](#seguridad-claves-de-api)
- [Uso](#uso)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Internacionalización (ES/EN)](#internacionalización-esen)
- [Scripts disponibles](#scripts-disponibles)

## Características

- 🔎 **Buscador de recetas** (`recipe-finder`) contra la API pública de recetas de Edamam, con filtros por calorías, dieta, salud, tipo de comida y cocina.
- 🍎 **Info nutricional por ingredientes** (`nutrition-finder`) — arma una lista de ingredientes con cantidad y medida y consulta sus valores nutricionales (calorías, grasas, carbohidratos, proteínas, fibra, azúcares, sodio, CO2, etiquetas de dieta y de salud).
- 📚 **Busca tu alimento** (`data-base-nutrition`) usando el Food Database de Edamam, con detalle de nutrientes por alimento (calorías, grasas, carbohidratos, proteínas por 100 g).
- 🧮 **Analiza tu receta** (`recipe-analyzer`) — introduce el nombre de un plato, añade sus ingredientes uno a uno y obtén calorías, macros y etiquetas de dieta de la receta completa (Edamam Recipe Analysis), con acceso directo a "¿Cómo lo quemo?" para ver cuánto ejercicio hace falta para quemarla.
- ⚖️ **Calculadora de calorías diarias** (`calorie-calculator`) — calcula tu metabolismo basal (fórmula Mifflin-St Jeor), calorías de mantenimiento y un reparto de macros sugerido según tu objetivo. 100% cálculo local, sin depender de ninguna API externa.
- 🍲 **¿Qué cocino hoy?** (`recipe-suggester`) — dime hasta 5 ingredientes que tengas a mano y te sugiero recetas que los usan.
- 🏃 **¿Cómo lo quemo?** (`running-calculator`) — asistente en pasos (calorías → peso → tipo de ejercicio y ritmo → resultado) que calcula minutos y kilómetros necesarios para quemar unas calorías dadas corriendo, caminando, en bici o nadando, usando valores MET estándar. 100% cálculo local.
- 📌 **Añadir a Mis Recetas** (`adapt-recipe`, `my-recipes`) — convierte cualquier receta encontrada en "Recetas" o "¿Qué cocino hoy?" en un documento propio:
  - Traducción automática inglés → español del título e ingredientes (API gratuita MyMemory, sin key), editable en el momento antes de guardar.
  - Escandallo: recalcula la cantidad de cada ingrediente al cambiar el número de raciones, con redondeo distinto para medidas continuas (gramos, tazas...) y para piezas (huevos, dientes de ajo...); los ingredientes sin cantidad reconocible (p. ej. "sal al gusto") se marcan como tal en vez de escalarse a 0.
  - Coste opcional por ingrediente en tres modos (€/kg, €/paquete + gramos, €/unidad), usando el peso en gramos que estima Edamam para cada ingrediente (no la cantidad mostrada, que puede venir en tazas o piezas) — total y coste por ración, recalculado con las raciones.
  - Notas libres y guardado real en `localStorage` (sección **Mis Recetas**), con vista de lista y de detalle que reutiliza el mismo formulario para seguir editando lo ya guardado.
- 🧭 **Barra lateral fija** con navegación a las 8 herramientas y selector de idioma; en móvil se abre como panel deslizante desde un botón flotante.
- 🖥️ **Cada herramienta a pantalla completa**, sin scroll de página — el contenido largo (listas de resultados, formularios con muchos campos) hace scroll dentro de su propia tarjeta, y el fondo decorativo cubre siempre toda la pantalla.
- 🌗 **Tema oscuro** consistente en toda la app, con diseño responsivo (mobile / tablet / desktop) y fondo decorativo en las páginas de herramientas.
- 🌐 **Español / Inglés**: interfaz completa traducida (`@nuxtjs/i18n`), con traducción automática de las búsquedas y de los resultados que vienen en inglés desde Edamam (diccionario propio + fallback a MyMemory API), independiente del idioma activo de la interfaz.
- 🦶 **Footer global** con atribución del autor y créditos a Edamam, presente en todas las páginas.

## Stack tecnológico

| Categoría        | Tecnología                                      |
| ----------------- | ----------------------------------------------- |
| Framework         | [Nuxt 3](https://nuxt.com/) (modo SPA, `ssr: false`) |
| UI Library        | [PrimeVue 4](https://primevue.org/) + [PrimeIcons](https://primevue.org/icons/) |
| Estilos           | [Tailwind CSS](https://tailwindcss.com/) + [PrimeFlex](https://primeflex.org/) |
| i18n              | [@nuxtjs/i18n](https://i18n.nuxtjs.org/) (español / inglés) |
| HTTP Client       | `$fetch` (ofetch, integrado en Nuxt) |
| Backend ligero    | Rutas [Nitro](https://nitro.unjs.io/) en `server/api/` — proxies que ocultan las claves de Edamam del navegador (ver [Seguridad](#seguridad-claves-de-api)) |
| APIs externas     | [Edamam Recipe API](https://developer.edamam.com/edamam-recipe-api), [Edamam Food Database API](https://developer.edamam.com/food-database-api), [Edamam Nutrition Analysis API](https://developer.edamam.com/edamam-nutrition-api) (incluye Recipe Analysis), [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) (gratuita, sin API key) |
| Persistencia      | `localStorage` del navegador (recetas guardadas en "Mis Recetas"), sin backend ni base de datos |

## Estructura del proyecto

```
Healthy/
├── app.vue                          # Punto de entrada raíz: sidebar + botón móvil + página + footer
├── assets/
│   ├── css/main.css                 # Estilos globales (tema oscuro, clases compartidas)
│   └── images/                      # Imágenes estáticas (fondo decorativo, foto del bowl)
├── components/
│   ├── AppBreadcrumb.vue            # Breadcrumb "Inicio > Herramienta" de cada página
│   ├── AppLogo.vue                  # Logo reutilizable (badge + wordmark)
│   ├── AppSidebar.vue               # Barra lateral fija (desktop) + drawer (móvil)
│   ├── SidebarContent.vue           # Contenido de la barra: logo, idioma, navegación
│   ├── Adapt-Recipe-Form.vue        # Formulario de "Añadir a Mis Recetas" (traducción, escandallo, coste, notas)
│   ├── Calorie-Calculator-Form.vue  # Formulario de la calculadora de calorías
│   ├── Footer.vue                   # Footer global (autor, Edamam, aviso de portafolio)
│   ├── Header.vue                   # Wrapper del buscador de recetas
│   ├── HomeComponent.vue            # Contenido de la home (hero + badges de confianza)
│   ├── Nutrition-Search-Form.vue    # Formulario de búsqueda nutricional por ingredientes
│   ├── PageBackground.vue           # Fondo decorativo compartido por las páginas de herramientas
│   ├── Recipe-Analyzer-Form.vue     # Formulario de análisis de receta completa
│   ├── RecipeCard.vue               # Tarjeta de receta reutilizable (resultados + botón "Añadir a Mis Recetas")
│   ├── Recipe-Search-Form.vue       # Formulario de búsqueda de recetas
│   ├── Recipe-Suggester-Form.vue    # Formulario de "¿Qué cocino hoy?"
│   ├── Runner-Form.vue              # Asistente en pasos de "¿Cómo lo quemo?"
│   ├── Select-Nutrition.vue         # Selector de cantidad/medida/ingrediente reutilizable
│   └── Selects-Recipes.vue          # Barra de filtros de recetas
├── composables/
│   ├── useAdaptRecipeDraft.js       # Estado compartido: receta cruda de Edamam elegida para adaptar
│   ├── useEdamam.js                 # Búsqueda de recetas (llama a server/api/edamam-recipes)
│   ├── useEdamamDataBase.js         # Búsqueda de alimentos + nutrientes (server/api/edamam-food-*)
│   ├── useEdamamRecipeAnalysis.js   # Análisis nutricional de una receta completa (server/api/edamam-analyze-recipe)
│   ├── useSavedRecipes.js           # CRUD reactivo de "Mis Recetas" sobre localStorage
│   ├── useSidebarState.js           # Estado compartido (abierto/cerrado) del drawer móvil
│   ├── useTranslateQuery.js         # Traducción ES↔EN de búsquedas y resultados
│   └── useTranslateRecipe.js        # Traducción por lotes (título/ingredientes/pasos) para Mis Recetas
├── locales/
│   ├── en.json                      # Textos de la interfaz en inglés
│   └── es.json                      # Textos de la interfaz en español
├── server/
│   └── api/                         # Proxies a Edamam: las claves nunca llegan al navegador
│       ├── edamam-recipes.get.ts          # Recipe Search API
│       ├── edamam-food-search.get.ts      # Food Database API (parser)
│       ├── edamam-food-nutrients.post.ts  # Food Database API (nutrientes)
│       ├── edamam-analyze-recipe.post.ts  # Nutrition/Recipe Analysis API
│       └── edamam-nutrition-data.get.ts   # Nutrition Analysis API (un ingrediente)
├── pages/
│   ├── index.vue                    # Home
│   ├── adapt-recipe.vue             # "Añadir a Mis Recetas" — receta recién adaptada (aún sin guardar)
│   ├── recipe-finder.vue            # Buscador de recetas
│   ├── recipe-results.vue           # Resultados de recetas
│   ├── nutrition-finder.vue         # Buscador de información nutricional
│   ├── nutrition-result.vue         # Resultado nutricional
│   ├── data-base-nutrition.vue      # Buscador en la base de datos de alimentos
│   ├── data-base-result.vue         # Detalle nutricional de un alimento
│   ├── recipe-analyzer.vue          # Analizador de recetas propias
│   ├── calorie-calculator.vue       # Calculadora de calorías diarias
│   ├── recipe-suggester.vue         # "¿Qué cocino hoy?"
│   ├── running-calculator.vue       # "¿Cómo lo quemo?"
│   └── my-recipes/
│       ├── index.vue                # Listado de recetas guardadas
│       └── [id].vue                 # Detalle/edición de una receta guardada (ruta dinámica)
├── types/
│   └── recipe.ts                    # Interfaces RecetaAdaptada / IngredienteAdaptado
├── utils/
│   ├── calorieCalculator.js         # Fórmula Mifflin-St Jeor + TDEE + macros
│   ├── dietLabels.js                # Traducción de etiquetas de dieta y de salud de Edamam
│   ├── exerciseCalculator.js        # Valores MET por ejercicio/ritmo para "¿Cómo lo quemo?"
│   ├── foodDictionary.js            # Diccionario ES→EN de alimentos comunes
│   ├── measureLabels.js             # Traducción de medidas de Edamam (cup, tablespoon, "<unit>"...)
│   └── recetaAdaptada.js            # Modelo, escandallo y cálculo de coste de "Mis Recetas"
├── public/                          # Archivos estáticos servidos directamente (favicon, robots.txt)
├── nuxt.config.ts                   # Configuración de Nuxt (módulos, i18n, tema PrimeVue, runtimeConfig)
├── tailwind.config.js               # Configuración de Tailwind CSS
└── package.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- Un gestor de paquetes: `npm`, `pnpm`, `yarn` o `bun`
- Credenciales de API de [Edamam](https://developer.edamam.com/) (Recipe API, Food Database API y Nutrition Analysis API — esta última también cubre el endpoint de Recipe Analysis usado por el analizador de recetas)

## Instalación

Clona el repositorio e instala las dependencias:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```bash
NUXT_EDAMAM_RECIPES_APP_ID=
NUXT_EDAMAM_RECIPES_APP_KEY=

NUXT_EDAMAM_DATABASE_FOOD_APP_ID=
NUXT_EDAMAM_DATABASE_FOOD_APP_KEY=

NUXT_EDAMAM_NUTRITION_APP_ID=
NUXT_EDAMAM_NUTRITION_APP_KEY=
```

Estas variables se leen en `runtimeConfig` (privado, **sin** `.public`) dentro de [`nuxt.config.ts`](nuxt.config.ts), y solo las usan las rutas de servidor en `server/api/edamam-*.ts` — nunca un composable o página del cliente directamente. La traducción automática de búsquedas usa la API pública de MyMemory, que no requiere API key.

> ⚠️ El archivo `.env` está incluido en `.gitignore` y nunca debe subirse al repositorio.

## Seguridad: claves de API

Las claves de Edamam viven en `runtimeConfig` privado, no en `runtimeConfig.public`. La diferencia importa: cualquier valor bajo `.public` se serializa dentro del bundle JS que descarga el navegador, así que cualquier visitante podría abrir las herramientas de desarrollador (pestaña Network o Sources) y leerlas en texto plano — sin importar que el `.env` nunca se suba al repositorio.

Por eso ninguna llamada a Edamam sale directamente desde el cliente: cada composable (`useEdamam.js`, `useEdamamDataBase.js`, `useEdamamRecipeAnalysis.js`) y la página `nutrition-result.vue` llaman con `$fetch` a una ruta propia bajo `server/api/edamam-*.ts`, y es esa ruta —ejecutada en el servidor, con acceso al `runtimeConfig` privado— la que añade `app_id`/`app_key` antes de reenviar la petición a `api.edamam.com`. Si en el futuro se añade una nueva llamada a una API externa que necesite una clave, debe seguir este mismo patrón desde el principio.

## Uso

### Servidor de desarrollo

Levanta el servidor de desarrollo en `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Build de producción

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

### Previsualizar el build de producción

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Consulta la [documentación de despliegue de Nuxt](https://nuxt.com/docs/getting-started/deployment) para más información.

## Rutas de la aplicación

| Ruta                     | Descripción                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `/`                       | Home con acceso a las 8 herramientas                                |
| `/recipe-finder`          | Formulario de búsqueda de recetas                                    |
| `/recipe-results`         | Listado de recetas resultantes de la búsqueda, con filtros          |
| `/nutrition-finder`       | Formulario de búsqueda de información nutricional por ingredientes  |
| `/nutrition-result`       | Resultado del análisis nutricional                                   |
| `/data-base-nutrition`    | Búsqueda de alimentos en la base de datos de Edamam                 |
| `/data-base-result`       | Detalle de nutrientes de un alimento seleccionado                   |
| `/recipe-analyzer`        | Análisis nutricional de una receta propia (nombre + ingredientes)   |
| `/calorie-calculator`     | Calculadora de calorías diarias y reparto de macros                 |
| `/recipe-suggester`       | "¿Qué cocino hoy?" — sugerencia de recetas a partir de ingredientes  |
| `/running-calculator`     | "¿Cómo lo quemo?" — minutos/km de ejercicio para quemar X calorías (acepta `?calories=` para prellenar) |
| `/adapt-recipe`           | "Añadir a Mis Recetas" sobre la última receta elegida en un resultado de búsqueda (aún no guardada) |
| `/my-recipes`             | Listado de recetas guardadas en `localStorage`                       |
| `/my-recipes/[id]`        | Detalle/edición de una receta guardada, reutiliza `Adapt-Recipe-Form.vue` sin re-traducir |

## Internacionalización (ES/EN)

- El selector de idioma vive en la parte superior de la barra lateral (visible en todas las páginas) y cambia toda la interfaz entre español e inglés usando `@nuxtjs/i18n`. Los textos viven en [`locales/es.json`](locales/es.json) y [`locales/en.json`](locales/en.json). El idioma por defecto de la interfaz es inglés.
- Como las APIs de Edamam solo entienden inglés, `composables/useTranslateQuery.js` traduce automáticamente lo que escribes en español antes de buscar, **sin importar el idioma activo de la interfaz** (para no depender de que el usuario cambie el selector antes de escribir en español): primero consulta [`utils/foodDictionary.js`](utils/foodDictionary.js) (diccionario propio de ~150 alimentos comunes, fiable e instantáneo) y solo si no encuentra coincidencia cae a la API gratuita de MyMemory.
- Los resultados que vienen en inglés desde Edamam (títulos de recetas, nombres de alimentos) se traducen de vuelta al español con el mismo composable, esta traducción sí respeta el idioma activo de la interfaz.
- Las etiquetas de dieta y de salud (`LOW_FAT`, `LOW_SODIUM`, `GLUTEN_FREE`, etc.) se traducen mediante un mapeo fijo en [`utils/dietLabels.js`](utils/dietLabels.js), ya que son un enum cerrado y no necesitan traducción automática.
- Las medidas que da Edamam (`cup`, `tablespoon`, el literal `<unit>` para ingredientes contados por pieza, etc.) se traducen igual mediante un mapeo fijo en [`utils/measureLabels.js`](utils/measureLabels.js), reutilizando el mismo diccionario `selectNutrition.measures` de los locales.
- "Añadir a Mis Recetas" usa `translateTextStrict` (variante de `useTranslateQuery.js` que relanza el error en vez de silenciarlo) para poder avisar de forma discreta si alguna traducción concreta no estuvo disponible, dejando esa entrada en inglés y editable a mano en vez de romper el resto del formulario.

## Scripts disponibles

| Script            | Descripción                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`      | Inicia el servidor de desarrollo              |
| `npm run build`    | Genera el build de producción                 |
| `npm run generate` | Genera una versión estática del sitio         |
| `npm run preview`  | Previsualiza el build de producción localmente|
| `npm run postinstall` | Ejecuta `nuxt prepare` tras instalar dependencias |
