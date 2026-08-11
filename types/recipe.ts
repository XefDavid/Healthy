// Esquema de una receta de Edamam adaptada a un documento propio de Healthy.
// fichaNutricional sigue siendo opcional (fase futura del roadmap); el
// resto de campos se inicializan siempre en createRecetaAdaptadaFromEdamam,
// aunque estén vacíos, para que la edición reactiva no tenga que lidiar con
// undefined.

export interface IngredienteAdaptado {
	nombreEs: string;
	nombreEn: string;
	cantidad: number;
	unidad: string;
	// Peso estimado en gramos que da Edamam para `cantidad` (ej. "2 cups
	// flour" -> ~240g). Es lo que de verdad se usa para el coste, porque
	// `cantidad` puede venir en unidades no convertibles a gramos a ojo
	// (tazas, cucharadas, piezas...).
	pesoBaseGramos: number;
	// Coste opcional, el usuario rellena solo uno de los tres modos (nunca
	// varios a la vez): precio directo por kilo, precio de un paquete + sus
	// gramos (ej. "250g / 2,50€"), o precio por unidad — este último para
	// ingredientes que se compran/cuentan por pieza y no por peso (huevos,
	// yemas de huevo...), donde forzar un precio por gramo no tiene sentido.
	precioPorKilo?: number | null;
	precioPaquete?: number | null;
	gramosPaquete?: number | null;
	precioPorUnidad?: number | null;
}

export interface RecetaAdaptada {
	id: string;
	tituloEs: string;
	tituloEn: string;
	imagen: string;
	racionesBase: number;
	ingredientes: IngredienteAdaptado[];
	notas: string;
	fuente: {
		nombre: string;
		url: string;
	};
	fechaGuardada: string;
	fichaNutricional?: {
		calorias: number;
		proteinas: number;
		grasas: number;
		carbohidratos: number;
	};
}
