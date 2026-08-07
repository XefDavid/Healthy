<script setup lang="ts">
import "primeicons/primeicons.css";

const route = useRoute();
const FIXED_HEIGHT_ROUTES = ["/", "/running-calculator"];
const isFixedHeight = computed(() => FIXED_HEIGHT_ROUTES.includes(route.path));
</script>

<template>
	<NuxtLayout>
		<Topbar />
		<AppSidebar />
		<div
			class="flex flex-col pt-16 md:ml-64"
			:class="isFixedHeight ? 'h-screen overflow-hidden' : 'min-h-screen'"
		>
			<div class="min-h-0 flex-1">
				<NuxtPage />
			</div>
			<Footer />
		</div>
	</NuxtLayout>
</template>
<style>
@import "~/assets/css/main.css";
</style>
