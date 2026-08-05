<script setup lang="ts">
import "primeicons/primeicons.css";
import LanguageToggle from "~/components/LanguageToggle.vue";
</script>

<template>
	<NuxtLayout>
		<div class="fixed top-3 left-3 z-50">
			<LanguageToggle />
		</div>
		<NuxtPage />
		<Footer />
	</NuxtLayout>
</template>
<style>
@import "~/assets/css/main.css";
</style>
