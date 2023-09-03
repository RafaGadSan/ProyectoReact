import { updateToken } from "../util/updateToken";
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

//!Uptade ingredient
export const updateIngredient = async (formData, id) => {
  return APIUser.patch(`/ingredients/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!Delete ingredient
export const deleteIngredientService = async (id) => {
  return APIUser.delete(`/ingredients/${id}`, {
    headers: { Authorization: `Bearer ${updateToken()}` },
  })
    .then((res) => res)
    .catch((error) => error);
};
