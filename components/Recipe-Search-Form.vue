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
	<div class="flex flex-col justify-center gap-6">
		<div>
			<h1
				class="text-lime-600 text-center text-4xl font-medium leading-none mb-4"
			>
				{{ $t("recipeFinder.title") }}
			</h1>
		</div>

		<div class="flex flex-col justify-center items-center w-[400px] gap-8">
			<div
				class="text-gray-900 text-sm font-normal leading-5 flex flex-col items-center"
			>
				<div class="flex gap-2">
					<InputText
						class="input w-full mb-2 text-center"
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
						class="button-green w-40 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-none"
						@click="submitSearch"
						:disabled="!query"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
