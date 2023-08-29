import React, { useEffect, useState } from "react";
import "./Register.css";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/user.service";
import { useRegisterError } from "../../hooks/useRegisterError";
import { Navigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

export const Register = () => {
  const { userComplete, setUserComplete, bridgeData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  //!-----------

  const formSubmit = async (formData) => {
    //llamada asyncrona para obtener la data del formulario
    const inputFile = document.getElementById("file-upload").file; // para obtener la imagen que nos ponga el usuario
    console.log(inputFile);
    if (inputFile.length !== 0) {
      //si hay algun archivo en el inputFile
      const customFormData = {
        //hacemos una constante con la data + la imagen del input
        ...formData,
        image: inputFile[0],
      };

      setSend(true); // seteamos el envio de la respuesta a true
      setRes(await registerUser(customFormData)); // seteamos el registro del usuario con la informacion nueva
      setSend(false); // reseteamos el estado (false)
    } else {
      // en el caso que el usuario no hayapuesto ninguna imagen
      const customFormData = {
        // nos quedamos con la información que ya teniamos
        ...formData,
      };

      setSend(true); // seteamos el envio de la respuesta a true
      setRes(await registerUser(customFormData)); //actualizamos el registro del usuario
      setSend(false); // reseteamos el estado del envio de la respuesta (false)
    }
  };

  //!-------------Para gestionar los estados de la data y sus errores

  useEffect(() => {
    //gestionamos la res a través de un hook (useRegisterError)
    console.log(res);
    useRegisterError(res, setOkRegister, setRes, setUserComplete); // parametros que gestionará el hook
    if (res?.status == 200) bridgeData("USERCOMPLETE"); //si la res es 200 (ok) gestionamos la asyncronia con el puente
  }, [res]); // en el array de dependencias introducimos el parametro de cuando queremos que se renderice

  //!------ Estados de navegacion

  if (okRegister) {
    // si el registro esta bien
    console.log("res", res); // mostramos la respuesta
    console.log("registro correcto, ya puedes navegar");
    return <Navigate to="/verifyCode" />; // nos redirige a la pagina del checkCode
  }
  //pintamos el formulario
  return (
    <>
      <Box as="div" className="form-wrap">
        <Text fontSize="3xl">Sign in</Text>
        <Text fontSize="2xl">It's free & only takes a minute</Text>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">UserName</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              autocomplete="false"
              placeholder="password"
              {...register("password", {
                required: "This is required",
              })}
            />
          </FormControl>

          <FormControl isInvalid>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="your email"
              {...register("email", {
                required: "This is required",
              })}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};
//!PONER QUE POR DEFECTO EL ROL SEA CLIENTE DESDE ESTE REGISTER
