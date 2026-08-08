<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useTranslateQuery } from "~/composables/useTranslateQuery";

const query = ref("");
const router = useRouter();
const placeholder = "All recipes";
const { translateToEnglish } = useTranslateQuery();

const submitSearch = async () => {
	if (!query.value.trim()) return;

	const translatedQuery = await translateToEnglish(query.value);

	router.push({
		path: "/recipe-results",
		query: {
			query: translatedQuery,
		},
	});
	resetFields();
};

const resetFields = () => {
	query.value = "";
};

const clearPalceHolder = () => {
	if (query.value === placeholder) {
		query.value = "";
	}
};
</script>

<template>
	<div
		class="flex w-full max-w-xl flex-col items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4"
	>
		<InputText
			class="input w-full !min-w-0 text-center"
			type="text"
			v-model="query"
			:placeholder="$t('recipeFinder.placeholder')"
			@focus="clearPalceHolder"
			@blur="clearPalceHolder"
			@keyup.enter="submitSearch"
		/>
		<Button
			:label="$t('common.search')"
			severity="success"
			raised
			icon="pi pi-search"
			icon-pos="left"
			class="button-green w-full sm:w-40 shrink-0 disabled:!bg-neutral-800 disabled:!text-neutral-500 disabled:cursor-not-allowed disabled:border-none"
			@click="submitSearch"
			:disabled="!query"
		/>
	</div>
</template>
