<script setup lang="ts">
import Button from "primevue/button";
import "primeicons/primeicons.css";

import foodPlaning from "~/assets/images/foodPlaning.webp";
</script>

<template>
	<div class="flex flex-col items-center justify-center min-h-screen gap-4">
		<div class="flex justify-center font-semibold">
			<img
				class="w-[125px] h-[125px]"
				:src="foodPlaning"
				alt="Food Planning Logo"
			/>
		</div>
		<div class="flex justify-center">
			<div class="flex flex-col w-[400px] h-[200px]">
				<h1 class="flex justify-star font-medium text-lime-600 text-4xl">
					{{ $t("home.eat") }}
				</h1>
				<h1 class="flex justify-center text-lime-600 font-medium text-3xl pl-3">
					{{ $t("home.drink") }}
				</h1>
				<h1
					class="flex justify-end text-lime-600 font-medium text-2xl pl-[60px]"
				>
					{{ $t("home.love") }}
				</h1>
			</div>
		</div>
		<div class="flex flex-row justify-between gap-3">
			<nuxt-link to="/recipe-finder">
				<Button
					:label="$t('home.recipeButton')"
					severity="secondary"
					icon="pi pi-globe"
					iconPos="left"
					class="hover:!bg-lime-400 transition duration-300"
				/>
			</nuxt-link>
			<nuxt-link to="/nutrition-finder">
				<Button
					:label="$t('home.nutritionButton')"
					severity="secondary"
					icon="pi pi-apple"
					icon-pos="left"
					class="hover:!bg-lime-400 transition duration-300"
				/>
			</nuxt-link>
			<nuxt-link to="/data-base-nutrition">
				<Button
					:label="$t('home.dataButton')"
					severity="secondary"
					icon="pi pi-search"
					icon-pos="left"
					class="hover:!bg-lime-400 transition duration-300"
				/>
			</nuxt-link>
		</div>
	</div>
</template>
