<script setup lang="ts">
import foodPlaning from "~/assets/images/foodPlaning.webp";
</script>

<template>
	<div class="flex justify-center font-semibold flex-grow text-center">
		<img
			class="w-[125px] h-[125px]"
			:src="foodPlaning"
			alt="Food Planning Logo"
		/>
	</div>
	<div class="absolute top-3 right-3">
		<nuxt-link to="/">
			<Button
				:label="$t('common.back')"
				severity="secondary"
				text
				icon="pi pi-undo"
				class="button-gray w-full"
			/>
		</nuxt-link>
	</div>
</template>
