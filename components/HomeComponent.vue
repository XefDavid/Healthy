<script setup lang="ts">
import "primeicons/primeicons.css";

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
];
</script>

<template>
	<div
		class="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16 sm:gap-10"
	>
		<!-- Logo -->
		<div class="flex flex-col items-center gap-2">
			<AppLogo size="lg" />
			<div class="mt-1 h-px w-8 bg-lime-500"></div>
		</div>

		<!-- Heading -->
		<div class="flex flex-col items-center text-center">
			<h1 class="text-3xl font-bold leading-tight sm:text-4xl">
				<span class="block text-white">{{ $t("home.eat") }}</span>
				<span class="block text-white">{{ $t("home.drink") }}</span>
				<span class="block text-lime-400">{{ $t("home.love") }}</span>
			</h1>
			<i class="pi pi-heart mt-2 text-sm text-lime-500"></i>
			<p class="mt-4 max-w-xs text-sm text-neutral-400">
				{{ $t("home.subtitle") }}
			</p>
		</div>

		<!-- Cards -->
		<div class="flex w-full max-w-sm flex-col gap-4">
			<nuxt-link
				v-for="card in cards"
				:key="card.to"
				:to="card.to"
				class="flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 transition duration-300 hover:border-lime-500/50 hover:bg-neutral-900"
			>
				<div
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-500/15 text-lime-400"
				>
					<i :class="card.icon" class="text-xl"></i>
				</div>
				<div class="flex-1 text-left">
					<p class="font-semibold text-white">{{ $t(card.title) }}</p>
					<p class="text-sm text-neutral-400">{{ $t(card.subtitle) }}</p>
				</div>
				<i class="pi pi-chevron-right text-neutral-500"></i>
			</nuxt-link>
		</div>
	</div>
</template>
