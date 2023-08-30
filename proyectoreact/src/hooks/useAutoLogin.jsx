import React from "react";
import { autoLoginUser } from "../services/user.service";
import { Navigate } from "react-router-dom";

export const useAutoLogin = async (userComplete, userLogin) => {
  try {
    const { password, email } = userComplete?.data?.user;
    const customFormData = {
      email,
      password,
    };
    const sendData = await autoLoginUser(customFormData);

    if (sendData?.status == 200) {
      const { name, email, image, check, role } = sendData?.data?.user;
      const userCustom = {
        token: sendData.data.token,
        user: name,
        email,
        image,
        check,
        role,
        _id: sendData.data.user._id,
      };

      const stringUser = JSON.stringify(userCustom);
      userLogin(stringUser);
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error);
  }
};
