<script setup lang="ts">
const { locale, setLocale } = useI18n();

const toggleLocale = () => {
	setLocale(locale.value === "en" ? "es" : "en");
};
</script>

<template>
	<button
		type="button"
		@click="toggleLocale"
		class="text-xs font-medium text-neutral-300 hover:text-lime-400 hover:border-lime-500 transition duration-300 border border-neutral-700 rounded-lg px-3 py-1.5 bg-neutral-900/80 shadow-sm backdrop-blur"
	>
		{{ locale === "en" ? "🇪🇸 Español" : "🇬🇧 English" }}
	</button>
</template>
