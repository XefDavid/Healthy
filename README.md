# Healthy 🥗

Aplicación web construida con **Nuxt 3** para buscar recetas, consultar información nutricional de alimentos y explorar una base de datos de alimentos, todo apoyado en las APIs de **Edamam**.

## Índice

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Uso](#uso)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Scripts disponibles](#scripts-disponibles)

## Características

- 🔎 **Buscador de recetas** (`recipe-finder`) contra la API pública de recetas de Edamam.
- 🍎 **Buscador de información nutricional** (`nutrition-finder`) para consultar el valor nutricional de alimentos.
- 📚 **Base de datos de alimentos** (`data-base-nutrition`) usando el Food Database de Edamam, con detalle de nutrientes por alimento.
- 🎨 UI construida con **PrimeVue** (tema Aura) y **Tailwind CSS**.

## Stack tecnológico

| Categoría        | Tecnología                                      |
| ----------------- | ----------------------------------------------- |
| Framework         | [Nuxt 3](https://nuxt.com/) (modo SPA, `ssr: false`) |
| UI Library        | [PrimeVue 4](https://primevue.org/) + [PrimeIcons](https://primevue.org/icons/) |
| Estilos           | [Tailwind CSS](https://tailwindcss.com/) + [PrimeFlex](https://primeflex.org/) |
| HTTP Client       | [Axios](https://axios-http.com/) |
| APIs externas     | [Edamam Recipe API](https://developer.edamam.com/edamam-recipe-api), [Edamam Food Database API](https://developer.edamam.com/food-database-api), [Edamam Nutrition Analysis API](https://developer.edamam.com/edamam-nutrition-api), [Pexels API](https://www.pexels.com/api/) |

## Estructura del proyecto

```
Healthy/
├── app.vue                      # Punto de entrada raíz de la app
├── assets/
│   ├── css/main.css             # Estilos globales
│   └── images/                  # Imágenes estáticas (logo, placeholders, etc.)
├── components/
│   ├── Header.vue               # Cabecera de la home
│   ├── HomeComponent.vue        # Contenido principal de la home
│   ├── Input-Button-nutrition.vue
│   ├── Nutrition-Search-Form.vue
│   ├── Recipe-Search-Form.vue
│   ├── Select-Nutrition.vue
│   ├── Selects-Recipes.vue
│   └── top-bar.vue
├── composables/
│   ├── useEdamam.js              # Búsqueda de recetas (Recipe API)
│   ├── useEdamamDataBase.js      # Búsqueda de alimentos + nutrientes (Food Database API)
│   └── useEdamamIdRecipe.js      # Detalle de una receta por URI/ID
├── pages/
│   ├── index.vue                 # Home
│   ├── recipe-finder.vue         # Buscador de recetas
│   ├── recipe-results.vue        # Resultados de recetas
│   ├── nutrition-finder.vue      # Buscador de información nutricional
│   ├── nutrition-result.vue      # Resultado nutricional
│   ├── data-base-nutrition.vue   # Buscador en la base de datos de alimentos
│   └── data-base-result.vue      # Detalle nutricional de un alimento
├── public/                       # Archivos estáticos servidos directamente (favicon, robots.txt)
├── nuxt.config.ts                # Configuración de Nuxt (módulos, tema PrimeVue, runtimeConfig)
├── tailwind.config.js            # Configuración de Tailwind CSS
└── package.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- Un gestor de paquetes: `npm`, `pnpm`, `yarn` o `bun`
- Credenciales de API de [Edamam](https://developer.edamam.com/) (Recipe API, Food Database API y Nutrition Analysis API) y, opcionalmente, de [Pexels](https://www.pexels.com/api/)

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

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves (puedes usar `.env.example` como plantilla si existe):

```bash
NUXT_EDAMAM_RECIPES_APP_ID=
NUXT_EDAMAM_RECIPES_APP_KEY=

NUXT_EDAMAM_DATABASE_FOOD_APP_ID=
NUXT_EDAMAM_DATABASE_FOOD_APP_KEY=

NUXT_EDAMAM_NUTRITION_APP_ID=
NUXT_EDAMAM_NUTRITION_APP_KEY=

NUXT_PEXELS_API_KEY=
```

Estas variables se exponen en `runtimeConfig.public` dentro de [`nuxt.config.ts`](nuxt.config.ts) y son consumidas por los composables en `composables/`.

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
| `/`                       | Home con accesos a las tres funcionalidades principales             |
| `/recipe-finder`          | Formulario de búsqueda de recetas                                    |
| `/recipe-results`         | Listado de recetas resultantes de la búsqueda                       |
| `/nutrition-finder`       | Formulario de búsqueda de información nutricional                   |
| `/nutrition-result`       | Resultado del análisis nutricional                                   |
| `/data-base-nutrition`    | Búsqueda de alimentos en la base de datos de Edamam                 |
| `/data-base-result`       | Detalle de nutrientes de un alimento seleccionado                   |

## Scripts disponibles

| Script            | Descripción                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`      | Inicia el servidor de desarrollo              |
| `npm run build`    | Genera el build de producción                 |
| `npm run generate` | Genera una versión estática del sitio         |
| `npm run preview`  | Previsualiza el build de producción localmente|
| `npm run postinstall` | Ejecuta `nuxt prepare` tras instalar dependencias |
