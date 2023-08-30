import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import {
  checkConfirmationUser,
  resendCodeConfirmationUser,
} from "../../services/user.service";
import { useCheckCodeError } from "../../hooks/useCheckCodeError";
import { useResendCodeError } from "../../hooks/useResendCodeError";
import { Box, Input, Stack, Text, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAutoLogin } from "../../hooks/useAutoLogin";

export const CheckCode = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { userComplete, userLogin, setUser } = useAuth(); //destructuring de los parametros que necesitamos de useAuth
  const [res, setRes] = useState({}); // estado para recibir y setear la respuesta
  const [resResend, setResResend] = useState({}); //estado para recibir y setear el resend code
  const [send, setSend] = useState(false);
  const [okCheck, setOkCheck] = useState(false); // estado para saber si el check esta bien
  const [okDeleteUser, setOkDeleteUser] = useState(false); //estado para saber si el usuario se ha borrado correctamente
  const [userNotFound, setUserNotFound] = useState(false); //estado para saber si el usuario existe

  //Funcion que gestiona la data del formulario
  const formSubmit = async (formData) => {
    const userLocal = localStorage.getItem("user"); //Coges el usuario de la memoria fisica

    if (userLocal == null) {
      //si no hay usuario en el local, coges la informacion del useAuth del register
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: userComplete.data.user.email,
      };
      setSend(true); //seteamos el envio a true
      setRes(await checkConfirmationUser(custFormData)); // seteamos la respuesta con la funcion del user.service con la data del formulario
      setSend(false); // reseteamos el estado
    } else {
      //si hay usuario en el local, lo parseamos y cogemos la informacion del code y del email
      const parseUser = JSON.parse(userLocal);
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: parseUser.email,
      };
      setSend(true);
      setRes(await checkConfirmationUser(custFormData));
      setSend(false);
    }
  };

  const handleResend = async () => {
    //funcion para reenviar el checkcode
    const userLocal = localStorage.getItem("user");
    if (userLocal != null) {
      //si no es null, cogemos la informacion necesaria(email) del user  del localStorage
      const parseUser = JSON.parse(userLocal);
      const customFormData = {
        email: parseUser.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    } else {
      //si no hay usuario en el local, cogemos la informacion del register
      const customFormData = {
        email: userComplete?.data?.user?.email,
      };
      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    }
  };

  //UseEffect para gestionar los errores cuando cambie la res del checkCode
  useEffect(() => {
    console.log(res);
    useCheckCodeError(
      res,
      setRes,
      setOkCheck,
      setOkDeleteUser,
      userLogin,
      setUserNotFound
    );
  }, [res]);

  //UseEffect para gestionar los errores cuando cambie la res del RESENDCode

  useEffect(() => {
    console.log(resResend);
    useResendCodeError(resResend, setResResend, setUserNotFound);
  }, [resResend]);

  if (okDeleteUser) {
    return <Navigate to="/register" />;
  }
  if (okCheck) {
    console.log("el check está bien");
    if (!localStorage.getItem("user")) {
      useAutoLogin(userComplete, userLogin);
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  if (userNotFound) {
    console.log("entro");
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Box>
        <Stack>
          <Text fontSize="3xl">Verify your code</Text>
          <Text fontSize="xl">Write the code sent to your email</Text>
        </Stack>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Input
            type="number"
            isRequired
            variant="filled"
            placeholder="Confirmation Code"
            {...register("confirmationCode", {
              required: "This is required",
            })}
          />
          <Button type="submit" disabled={send}>
            Verify Code
          </Button>
          <Button
            onClick={() => {
              handleResend();
            }}
            disabled={send}
          >
            Resend Code
          </Button>
        </form>
        <Text fontSize="md">
          If the code is not correct, your user will be deleted from the
          database and you will need to register again.
        </Text>
      </Box>
    </>
  );
};
