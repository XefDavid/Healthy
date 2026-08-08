<script setup lang="ts">
const isMobileOpen = useSidebarOpen();

const closeMobile = () => {
	isMobileOpen.value = false;
};
</script>

<template>
	<!-- Mobile overlay -->
	<div
		v-if="isMobileOpen"
		class="fixed inset-0 z-30 bg-black/60 md:hidden"
		@click="closeMobile"
	></div>

	<!-- Mobile drawer -->
	<aside
		v-if="isMobileOpen"
		class="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-neutral-800 bg-neutral-950 px-4 py-5 md:hidden"
	>
		<SidebarContent />
	</aside>

	<!-- Desktop sidebar (always visible) -->
	<aside
		class="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col justify-between border-r border-neutral-800 bg-neutral-950 px-4 py-5 md:flex"
	>
		<SidebarContent />
	</aside>
</template>
