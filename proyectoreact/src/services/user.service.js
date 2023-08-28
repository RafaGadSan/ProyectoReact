import { APIUser } from "./service.config";

export const registerUser = async (formData) => {
  return APIUser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};
