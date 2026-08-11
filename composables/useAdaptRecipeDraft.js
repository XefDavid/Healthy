// Guarda temporalmente la receta cruda de Edamam elegida para adaptar, para
// que sobreviva a la navegación hacia /adapt-recipe (el objeto tiene array
// de ingredientes e imagen, no cabe en query params).
export const useAdaptRecipeDraft = () => useState("adaptRecipeDraft", () => null);
