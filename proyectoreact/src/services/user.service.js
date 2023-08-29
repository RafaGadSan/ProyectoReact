import { APIUser } from "./service.config";

//!Para el register
export const registerUser = async (formData) => {
  return APIUser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res) //promesa para gestionar la asincronia
    .catch((error) => error);
};

//! Para el confirmationCode

export const checkConfirmationUser = async (formData) => {
  return APIUser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el reenvio del confirmationCode

export const resendCodeConfirmationUser = async (formData) => {
  return APIUser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};
