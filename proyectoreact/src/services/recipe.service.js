import { APIUser } from "./service.config";


//! Todas las recetas
export const getAllRecipes = async () => {
  return APIUser.get("/recipes")
    .then((res) => res)
    .catch((error) => error);
};


