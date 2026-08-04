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
		class="text-xs font-medium text-gray-600 hover:text-lime-600 hover:border-lime-500 transition duration-300 border border-gray-300 rounded-lg px-3 py-1.5 bg-white shadow-sm"
	>
		{{ locale === "en" ? "🇪🇸 Español" : "🇬🇧 English" }}
	</button>
</template>
