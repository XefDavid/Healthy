<script setup lang="ts">
import toolsBackground from "~/assets/images/fondo_herramientas.png";
import heroBowl from "~/assets/images/hero-bowl.png";
</script>

<template>
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<!--
			Contenedor anclado arriba a la derecha con la MISMA relación de
			aspecto que la imagen original (1535x1024). Así la posición del
			plato (en %) siempre coincide con el anillo, sin importar el
			tamaño real de la ventana.
		-->
		<div
			class="absolute right-0 top-0 aspect-[1535/1024] w-full max-w-[1535px] sm:w-[85%] lg:w-[70%]"
		>
			<img
				:src="toolsBackground"
				alt=""
				class="h-full w-full object-cover object-right-top opacity-70"
			/>
			<img
				:src="heroBowl"
				alt=""
				class="absolute hidden rounded-full object-cover opacity-90 sm:block"
				style="left: 84.5%; top: 51%; width: 18.5%; aspect-ratio: 1 / 1; transform: translate(-50%, -50%);"
			/>
		</div>
	</div>
</template>
