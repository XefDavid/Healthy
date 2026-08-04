<script setup lang="ts"></script>

<template>
	<div class="flex justify-center pt-6">
		<AppLogo size="sm" />
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
