<script setup lang="ts">
import "primeicons/primeicons.css";

const route = useRoute();
// Todas las páginas van a pantalla completa sin scroll por defecto (con
// scroll interno dentro de su propia tarjeta si el contenido es largo).
// recipe-results y data-base-result son la excepción: usan un layout más
// antiguo sin PageBackground ni scroll interno todavía.
const SCROLLABLE_ROUTES = ["/recipe-results", "/data-base-result"];
const isFixedHeight = computed(() => !SCROLLABLE_ROUTES.includes(route.path));

const isSidebarOpen = useSidebarOpen();
</script>

<template>
	<NuxtLayout>
		<AppSidebar />

		<button
			type="button"
			@click="isSidebarOpen = true"
			class="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/95 text-white backdrop-blur md:hidden"
			:aria-label="$t('sidebar.openMenu')"
		>
			<i class="pi pi-bars text-lg"></i>
		</button>

		<div
			class="flex flex-col md:ml-64"
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
