<script setup lang="ts">
const isSidebarOpen = useSidebarOpen();
</script>

<template>
	<header class="fixed left-0 right-0 top-0 z-50 flex h-16 items-center">
		<div
			class="flex h-full w-full items-center gap-3 bg-neutral-950/95 px-4 backdrop-blur sm:px-6 md:w-64 md:shrink-0 md:border-r md:border-neutral-800"
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
		</div>
	</header>
</template>
