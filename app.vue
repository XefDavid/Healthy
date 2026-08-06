<script setup lang="ts">
import "primeicons/primeicons.css";
</script>

<template>
	<NuxtLayout>
		<Topbar />
		<AppSidebar />
		<div class="pt-16 md:ml-64">
			<NuxtPage />
			<ToolsQuickbar />
			<Footer />
		</div>
	</NuxtLayout>
</template>
<style>
@import "~/assets/css/main.css";
</style>
