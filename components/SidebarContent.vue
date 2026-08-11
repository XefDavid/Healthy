<script setup lang="ts">
import { ref } from "vue";

const { locale, setLocale } = useI18n();
const route = useRoute();
const isMobileOpen = useSidebarOpen();
const isLangOpen = ref(false);

const navItems = [
	{ to: "/", icon: "pi pi-home", label: "sidebar.home" },
	{ to: "/recipe-finder", icon: "pi pi-globe", label: "sidebar.recipes" },
	{ to: "/nutrition-finder", icon: "pi pi-apple", label: "sidebar.nutrition" },
	{ to: "/data-base-nutrition", icon: "pi pi-search", label: "sidebar.foods" },
	{ to: "/recipe-analyzer", icon: "pi pi-calculator", label: "home.analyzerButton" },
	{ to: "/calorie-calculator", icon: "pi pi-gauge", label: "home.calorieCalculatorButton" },
	{ to: "/recipe-suggester", icon: "pi pi-lightbulb", label: "home.suggesterButton" },
	{ to: "/running-calculator", icon: "🏋️", label: "home.runnerButton" },
	{ to: "/my-recipes", icon: "pi pi-bookmark", label: "sidebar.myRecipes" },
];

const availableLocales = [
	{ code: "es", label: "Español" },
	{ code: "en", label: "English" },
];

const switchLocale = (code: string) => {
	setLocale(code);
	isLangOpen.value = false;
};

const closeMobile = () => {
	isMobileOpen.value = false;
};
</script>

<template>
	<div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
		<nuxt-link to="/" class="flex shrink-0 items-center gap-2">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-lime-400 to-green-600"
			>
				<i class="pi pi-apple text-base text-neutral-950"></i>
			</div>
			<div class="leading-tight">
				<div class="flex items-baseline gap-1 text-sm font-bold tracking-wide">
					<span class="text-white">{{ $t("home.brandFood") }}</span>
					<span class="text-lime-400">{{ $t("home.brandPlanning") }}</span>
				</div>
				<div class="text-[9px] tracking-[0.25em] text-neutral-500">
					{{ $t("home.brandTagline") }}
				</div>
			</div>
		</nuxt-link>

		<div class="relative">
			<button
				type="button"
				@click="isLangOpen = !isLangOpen"
				class="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-white hover:border-lime-500/50"
			>
				<i class="pi pi-globe text-neutral-400"></i>
				{{ locale === "es" ? "Español" : "English" }}
				<i class="pi pi-chevron-down text-xs text-neutral-500"></i>
			</button>
			<div
				v-if="isLangOpen"
				class="absolute left-0 mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-900 py-1 shadow-lg"
			>
				<button
					v-for="l in availableLocales"
					:key="l.code"
					type="button"
					@click="switchLocale(l.code)"
					class="block w-full px-3 py-1.5 text-left text-sm text-white hover:bg-neutral-800"
				>
					{{ l.label }}
				</button>
			</div>
		</div>

		<nav class="flex flex-col gap-1">
			<nuxt-link
				v-for="item in navItems"
				:key="item.to"
				:to="item.to"
				@click="closeMobile"
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition"
				:class="
					route.path === item.to
						? 'bg-lime-500/15 text-lime-400 border border-lime-500/30'
						: 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
				"
			>
				<i v-if="item.icon.startsWith('pi ')" :class="item.icon"></i>
				<span v-else class="inline-flex h-4 w-4 items-center justify-center grayscale text-lg leading-none">{{ item.icon }}</span>
				{{ $t(item.label) }}
			</nuxt-link>
		</nav>
	</div>
</template>
