<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isSidebarOpen = useSidebarOpen();
const search = ref("");

const submitSearch = () => {
	const query = search.value.trim();
	if (!query) return;
	router.push({ path: "/recipe-results", query: { query } });
	search.value = "";
};
</script>

<template>
	<header
		class="fixed left-0 right-0 top-0 z-50 flex h-16 items-center gap-3 border-b border-neutral-800 bg-neutral-950/95 px-4 backdrop-blur sm:px-6"
	>
		<button
			type="button"
			@click="isSidebarOpen = true"
			class="text-white md:hidden"
			:aria-label="$t('sidebar.openMenu')"
		>
			<i class="pi pi-bars text-xl"></i>
		</button>

		<nuxt-link to="/" class="flex shrink-0 items-center gap-2">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-lime-400 to-green-600"
			>
				<i class="pi pi-apple text-base text-neutral-950"></i>
			</div>
			<div class="hidden leading-tight sm:block">
				<div class="flex items-baseline gap-1 text-sm font-bold tracking-wide">
					<span class="text-white">{{ $t("home.brandFood") }}</span>
					<span class="text-lime-400">{{ $t("home.brandPlanning") }}</span>
				</div>
				<div class="text-[9px] tracking-[0.25em] text-neutral-500">
					{{ $t("home.brandTagline") }}
				</div>
			</div>
		</nuxt-link>

		<div class="mx-auto flex w-full max-w-md items-center">
			<div class="relative w-full">
				<i
					class="pi pi-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500"
				></i>
				<input
					v-model="search"
					type="text"
					:placeholder="$t('topbar.searchPlaceholder')"
					@keyup.enter="submitSearch"
					class="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-neutral-500 focus:border-lime-500/50 focus:outline-none"
				/>
			</div>
		</div>
	</header>
</template>
