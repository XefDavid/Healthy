<script setup lang="ts">
const GITHUB_URL = "https://github.com/XefDavid";
const LINKEDIN_URL = "https://www.linkedin.com/in/davidgarciajorge/";
const EDAMAM_URL = "https://www.edamam.com/";
</script>

<template>
	<footer
		class="border-t border-neutral-800 px-4 py-6 text-center text-sm text-neutral-400"
	>
		<div
			class="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3"
		>
			<span>
				{{ $t("footer.builtBy") }}
				<span class="font-medium text-neutral-200">David García Jorge</span>
			</span>
			<span class="flex items-center gap-3">
				<a
					:href="GITHUB_URL"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="hover:text-lime-400 transition"
				>
					<i class="pi pi-github"></i>
				</a>
				<a
					:href="LINKEDIN_URL"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					class="hover:text-lime-400 transition"
				>
					<i class="pi pi-linkedin"></i>
				</a>
			</span>
		</div>

		<div class="mt-2">
			{{ $t("footer.poweredBy") }}
			<a
				:href="EDAMAM_URL"
				target="_blank"
				rel="noopener noreferrer"
				class="text-lime-400 hover:text-lime-300 underline underline-offset-2"
			>
				Edamam API
			</a>
		</div>

		<p class="mx-auto mt-3 max-w-md text-xs text-neutral-500">
			{{ $t("footer.disclaimer") }}
		</p>
	</footer>
</template>
