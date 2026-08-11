<script setup lang="ts">
import toolsBackground from "~/assets/images/fondo_herramientas.png";
import heroBowl from "~/assets/images/hero-bowl.png";
</script>

<template>
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<!--
			Caja a ancho y alto completos del contenedor (antes solo cubría el
			70% derecho y una altura fija por aspect-ratio, dejando huecos sin
			fondo). object-cover recorta la imagen para llenar la caja sin
			deformarla; el anillo/bowl puede desplazarse ligeramente respecto a
			su posición calibrada original, pero es preferible a dejar huecos
			negros sin fondo.
		-->
		<div class="absolute inset-0">
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
