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
	<div class="flex w-full flex-col items-center justify-center gap-6 px-4">
		<div>
			<h1
				class="text-lime-400 text-center text-3xl sm:text-4xl font-medium leading-none mb-4"
			>
				{{ $t("recipeFinder.title") }}
			</h1>
		</div>

		<div class="flex w-full max-w-md flex-col items-center justify-center gap-8">
			<div class="flex w-full flex-col items-center text-sm font-normal leading-5">
				<div class="flex w-full flex-col gap-2 sm:flex-row">
					<InputText
						class="input w-full mb-2 sm:mb-0 text-center"
						type="text"
						v-model="query"
						:placeholder="$t('recipeFinder.placeholder')"
						@focus="clearPalceHolder"
						@blur="clearPalceHolder"
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
			</div>
		</div>
	</div>
</template>
