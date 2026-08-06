# Healthy 🥗

Aplicación web construida con **Nuxt 3** para planificar tu alimentación: buscar recetas, consultar información nutricional, analizar tus propias recetas y calcular tus calorías diarias. Interfaz oscura, totalmente responsiva y disponible en **español e inglés**.

## Índice

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Uso](#uso)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Internacionalización (ES/EN)](#internacionalización-esen)
- [Scripts disponibles](#scripts-disponibles)

## Características

- 🔎 **Buscador de recetas** (`recipe-finder`) contra la API pública de recetas de Edamam, con filtros por calorías, dieta, salud, tipo de comida y cocina.
- 🍎 **Info nutricional por ingredientes** (`nutrition-finder`) — arma una lista de ingredientes con cantidad y medida y consulta sus valores nutricionales.
- 📚 **Busca tu alimento** (`data-base-nutrition`) usando el Food Database de Edamam, con detalle de nutrientes por alimento (calorías, grasas, carbohidratos, proteínas por 100 g).
- 🧮 **Analiza tu receta** (`recipe-analyzer`) — introduce el nombre de un plato, añade sus ingredientes uno a uno y obtén calorías, macros y etiquetas de dieta de la receta completa (Edamam Recipe Analysis).
- ⚖️ **Calculadora de calorías diarias** (`calorie-calculator`) — calcula tu metabolismo basal (fórmula Mifflin-St Jeor), calorías de mantenimiento y un reparto de macros sugerido según tu objetivo. 100% cálculo local, sin depender de ninguna API externa.
- 🌗 **Tema oscuro** consistente en toda la app, con diseño responsivo (mobile / tablet / desktop).
- 🌐 **Español / Inglés**: interfaz completa traducida (`@nuxtjs/i18n`), con traducción automática de las búsquedas y de los resultados que vienen en inglés desde Edamam (diccionario propio + fallback a MyMemory API).
- 🦶 **Footer global** con atribución del autor y créditos a Edamam, presente en todas las páginas.

## Stack tecnológico

| Categoría        | Tecnología                                      |
| ----------------- | ----------------------------------------------- |
| Framework         | [Nuxt 3](https://nuxt.com/) (modo SPA, `ssr: false`) |
| UI Library        | [PrimeVue 4](https://primevue.org/) + [PrimeIcons](https://primevue.org/icons/) |
| Estilos           | [Tailwind CSS](https://tailwindcss.com/) + [PrimeFlex](https://primeflex.org/) |
| i18n              | [@nuxtjs/i18n](https://i18n.nuxtjs.org/) (español / inglés) |
| HTTP Client       | [Axios](https://axios-http.com/) + `$fetch` (ofetch, integrado en Nuxt) |
| APIs externas     | [Edamam Recipe API](https://developer.edamam.com/edamam-recipe-api), [Edamam Food Database API](https://developer.edamam.com/food-database-api), [Edamam Nutrition Analysis API](https://developer.edamam.com/edamam-nutrition-api) (incluye Recipe Analysis), [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) (gratuita, sin API key) |

## Estructura del proyecto

```
Healthy/
├── app.vue                          # Punto de entrada raíz: selector de idioma + página + footer
├── assets/
│   ├── css/main.css                 # Estilos globales (tema oscuro, clases compartidas)
│   └── images/                      # Imágenes estáticas
├── components/
│   ├── AppLogo.vue                  # Logo reutilizable (badge + wordmark)
│   ├── Calorie-Calculator-Form.vue  # Formulario de la calculadora de calorías
│   ├── Footer.vue                   # Footer global (autor, Edamam, aviso de portafolio)
│   ├── Header.vue                   # Wrapper del buscador de recetas
│   ├── HomeComponent.vue            # Contenido de la home (5 tarjetas de funcionalidades)
│   ├── LanguageToggle.vue           # Botón de cambio de idioma ES/EN
│   ├── Nutrition-Search-Form.vue    # Formulario de búsqueda nutricional por ingredientes
│   ├── Recipe-Analyzer-Form.vue     # Formulario de análisis de receta completa
│   ├── Recipe-Search-Form.vue       # Formulario de búsqueda de recetas
│   ├── Select-Nutrition.vue         # Selector de cantidad/medida/ingrediente reutilizable
│   ├── Selects-Recipes.vue          # Barra de filtros de recetas
│   └── top-bar.vue                  # Logo + botón "Atrás" para resultados de recetas
├── composables/
│   ├── useEdamam.js                 # Búsqueda de recetas (Recipe API)
│   ├── useEdamamDataBase.js         # Búsqueda de alimentos + nutrientes (Food Database API)
│   ├── useEdamamIdRecipe.js         # Detalle de una receta por URI/ID
│   ├── useEdamamRecipeAnalysis.js   # Análisis nutricional de una receta completa
│   └── useTranslateQuery.js         # Traducción ES↔EN de búsquedas y resultados
├── locales/
│   ├── en.json                      # Textos de la interfaz en inglés
│   └── es.json                      # Textos de la interfaz en español
├── pages/
│   ├── index.vue                    # Home
│   ├── recipe-finder.vue            # Buscador de recetas
│   ├── recipe-results.vue           # Resultados de recetas
│   ├── nutrition-finder.vue         # Buscador de información nutricional
│   ├── nutrition-result.vue         # Resultado nutricional
│   ├── data-base-nutrition.vue      # Buscador en la base de datos de alimentos
│   ├── data-base-result.vue         # Detalle nutricional de un alimento
│   ├── recipe-analyzer.vue          # Analizador de recetas propias
│   └── calorie-calculator.vue       # Calculadora de calorías diarias
├── utils/
│   ├── calorieCalculator.js         # Fórmula Mifflin-St Jeor + TDEE + macros
│   ├── dietLabels.js                # Traducción de etiquetas de dieta de Edamam
│   └── foodDictionary.js            # Diccionario ES→EN de alimentos comunes
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

Estas variables se exponen en `runtimeConfig.public` dentro de [`nuxt.config.ts`](nuxt.config.ts) y son consumidas por los composables en `composables/`. La traducción automática de búsquedas usa la API pública de MyMemory, que no requiere API key.

> ⚠️ El archivo `.env` está incluido en `.gitignore` y nunca debe subirse al repositorio.

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
| `/`                       | Home con acceso a las 5 funcionalidades                             |
| `/recipe-finder`          | Formulario de búsqueda de recetas                                    |
| `/recipe-results`         | Listado de recetas resultantes de la búsqueda, con filtros          |
| `/nutrition-finder`       | Formulario de búsqueda de información nutricional por ingredientes  |
| `/nutrition-result`       | Resultado del análisis nutricional                                   |
| `/data-base-nutrition`    | Búsqueda de alimentos en la base de datos de Edamam                 |
| `/data-base-result`       | Detalle de nutrientes de un alimento seleccionado                   |
| `/recipe-analyzer`        | Análisis nutricional de una receta propia (nombre + ingredientes)   |
| `/calorie-calculator`     | Calculadora de calorías diarias y reparto de macros                 |

## Internacionalización (ES/EN)

- El botón de idioma (arriba a la izquierda, en todas las páginas) cambia toda la interfaz entre español e inglés usando `@nuxtjs/i18n`. Los textos viven en [`locales/es.json`](locales/es.json) y [`locales/en.json`](locales/en.json).
- Como las APIs de Edamam solo entienden inglés, `composables/useTranslateQuery.js` traduce automáticamente lo que escribes en español antes de buscar: primero consulta [`utils/foodDictionary.js`](utils/foodDictionary.js) (diccionario propio de ~150 alimentos comunes, fiable e instantáneo) y solo si no encuentra coincidencia cae a la API gratuita de MyMemory.
- Los resultados que vienen en inglés desde Edamam (títulos de recetas, nombres de alimentos) se traducen de vuelta al español con el mismo composable.
- Las etiquetas de dieta (`LOW_FAT`, `LOW_SODIUM`, etc.) se traducen mediante un mapeo fijo en [`utils/dietLabels.js`](utils/dietLabels.js), ya que son un enum cerrado y no necesitan traducción automática.

## Scripts disponibles

| Script            | Descripción                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`      | Inicia el servidor de desarrollo              |
| `npm run build`    | Genera el build de producción                 |
| `npm run generate` | Genera una versión estática del sitio         |
| `npm run preview`  | Previsualiza el build de producción localmente|
| `npm run postinstall` | Ejecuta `nuxt prepare` tras instalar dependencias |
