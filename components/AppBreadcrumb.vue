<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
	<nav class="mb-6 flex items-center gap-2 text-sm text-neutral-400">
		<nuxt-link to="/" class="transition hover:text-lime-400">{{
			$t("sidebar.home")
		}}</nuxt-link>
		<i class="pi pi-angle-right text-xs"></i>
		<span class="text-white">{{ label }}</span>
	</nav>
</template>
