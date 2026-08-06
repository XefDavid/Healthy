<script setup lang="ts">
const route = useRoute();

const tools = [
	{ to: "/nutrition-finder", icon: "pi pi-apple", label: "home.nutritionButton" },
	{ to: "/data-base-nutrition", icon: "pi pi-search", label: "home.dataButton" },
	{ to: "/recipe-analyzer", icon: "pi pi-calculator", label: "home.analyzerButton" },
	{ to: "/calorie-calculator", icon: "pi pi-gauge", label: "home.calorieCalculatorButton" },
	{ to: "/recipe-suggester", icon: "pi pi-inbox", label: "home.suggesterButton" },
];
</script>

<template>
	<nav
		class="mx-4 my-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 sm:mx-6"
	>
		<nuxt-link
			v-for="tool in tools"
			:key="tool.to"
			:to="tool.to"
			class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition"
			:class="
				route.path === tool.to
					? 'bg-lime-500/15 text-lime-400 border border-lime-500/30'
					: 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
			"
		>
			<span
				class="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-500/15 text-lime-400"
			>
				<i :class="tool.icon" class="text-sm"></i>
			</span>
			{{ $t(tool.label) }}
		</nuxt-link>
	</nav>
</template>
