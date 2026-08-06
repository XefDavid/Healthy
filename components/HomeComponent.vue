<script setup lang="ts">
import "primeicons/primeicons.css";
import heroBowl from "~/assets/images/hero-bowl.png";

const cards = [
	{
		to: "/recipe-finder",
		icon: "pi pi-globe",
		title: "home.recipeButton",
		subtitle: "home.recipeSubtitle",
	},
	{
		to: "/nutrition-finder",
		icon: "pi pi-apple",
		title: "home.nutritionButton",
		subtitle: "home.nutritionSubtitle",
	},
	{
		to: "/data-base-nutrition",
		icon: "pi pi-chart-bar",
		title: "home.dataButton",
		subtitle: "home.dataSubtitle",
	},
	{
		to: "/recipe-analyzer",
		icon: "pi pi-calculator",
		title: "home.analyzerButton",
		subtitle: "home.analyzerSubtitle",
	},
	{
		to: "/calorie-calculator",
		icon: "pi pi-gauge",
		title: "home.calorieCalculatorButton",
		subtitle: "home.calorieCalculatorSubtitle",
	},
	{
		to: "/recipe-suggester",
		icon: "pi pi-inbox",
		title: "home.suggesterButton",
		subtitle: "home.suggesterSubtitle",
	},
];

const trustBadges = [
	{ icon: "pi pi-shield", title: "home.trustPrivate", subtitle: "home.trustPrivateSubtitle" },
	{ icon: "pi pi-bolt", title: "home.trustFast", subtitle: "home.trustFastSubtitle" },
	{ icon: "pi pi-verified", title: "home.trustHealthy", subtitle: "home.trustHealthySubtitle" },
	{ icon: "pi pi-user", title: "home.trustPersonal", subtitle: "home.trustPersonalSubtitle" },
];
</script>

<template>
	<div class="px-6 py-10 sm:px-10 sm:py-14">
		<!-- Hero -->
		<div
			class="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-lime-950/20 px-6 py-10 sm:px-10 sm:py-14"
		>
			<div
				class="pointer-events-none absolute -right-16 top-1/2 hidden h-80 w-80 -translate-y-1/2 sm:block lg:-right-6 lg:h-96 lg:w-96"
			>
				<div class="absolute inset-0 rounded-full bg-lime-500/20 blur-3xl"></div>
				<div
					class="absolute -inset-3 animate-pulse rounded-full border border-lime-500/20"
				></div>
				<img
					:src="heroBowl"
					alt=""
					class="relative h-full w-full rounded-full object-cover shadow-2xl shadow-lime-500/10"
				/>
			</div>

			<div class="relative flex flex-col gap-3 sm:max-w-xs lg:max-w-md">
				<AppLogo size="lg" align="start" />

				<h1 class="mt-4 flex flex-wrap items-baseline gap-x-3 text-3xl font-bold sm:text-5xl">
					<span class="text-white">{{ $t("home.eat") }}</span>
					<span class="text-white">{{ $t("home.drink") }}</span>
					<span class="text-lime-400">{{ $t("home.love") }}</span>
				</h1>
				<i class="pi pi-heart text-sm text-lime-500"></i>
				<p class="max-w-md text-sm text-neutral-400 sm:text-base">
					{{ $t("home.subtitle") }}
				</p>
			</div>
		</div>

		<!-- Cards -->
		<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<nuxt-link
				v-for="card in cards"
				:key="card.to"
				:to="card.to"
				class="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 transition duration-300 hover:border-lime-500/50 hover:bg-neutral-900"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-500/15 text-lime-400"
				>
					<i :class="card.icon" class="text-xl"></i>
				</div>
				<div class="mt-4">
					<p class="font-semibold text-white">{{ $t(card.title) }}</p>
					<p class="mt-1 text-sm text-neutral-400">{{ $t(card.subtitle) }}</p>
				</div>
				<div class="mt-4 flex justify-end">
					<span
						class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition group-hover:border-lime-500 group-hover:text-lime-400"
					>
						<i class="pi pi-arrow-right text-xs"></i>
					</span>
				</div>
			</nuxt-link>
		</div>

		<!-- Trust badges -->
		<div class="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:grid-cols-2 lg:grid-cols-4">
			<div
				v-for="badge in trustBadges"
				:key="badge.title"
				class="flex items-center gap-3"
			>
				<i :class="badge.icon" class="text-lime-400"></i>
				<div>
					<p class="text-sm font-semibold text-white">{{ $t(badge.title) }}</p>
					<p class="text-xs text-neutral-500">{{ $t(badge.subtitle) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
