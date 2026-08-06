<script setup lang="ts">
const props = withDefaults(
	defineProps<{ size?: "sm" | "lg"; align?: "center" | "start" }>(),
	{ size: "sm", align: "center" }
);
</script>

<template>
	<div
		class="flex flex-col gap-2"
		:class="props.align === 'start' ? 'items-start' : 'items-center'"
	>
		<div
			class="flex items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400 to-green-600 shadow-lg shadow-lime-500/20"
			:class="size === 'lg' ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-14 w-14'"
		>
			<i
				class="pi pi-apple text-neutral-950"
				:class="size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-2xl'"
			></i>
		</div>
		<div
			class="flex items-baseline gap-1.5 font-bold tracking-wide"
			:class="size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base'"
		>
			<span class="text-white">{{ $t("home.brandFood") }}</span>
			<span class="text-lime-400">{{ $t("home.brandPlanning") }}</span>
		</div>
		<div
			v-if="size === 'lg'"
			class="text-[10px] tracking-[0.3em] text-neutral-400"
		>
			{{ $t("home.brandTagline") }}
		</div>
	</div>
</template>
