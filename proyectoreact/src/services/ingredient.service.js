import { APIUser } from "./service.config";

//! Obtener todos los ingredientes
export const getAllIngredients = async () => {
  return APIUser.get("/ingredients/")
    .then((res) => res) //promesa para gestionar la asincronia.
    .catch((error) => error);
};


//! Ingredientes por ID
export const getIngredientById = async (id) => {
  return APIUser.get(`/ingredients/${id}`)
    .then((res) => res) //promesa para gestionar la asincronia.
    .catch((error) => error);
};
