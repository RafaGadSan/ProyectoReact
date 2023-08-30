import React, { useEffect, useState } from "react";
import "./Register.css";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/user.service";
import { useRegisterError } from "../../hooks/useRegisterError";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Uploadfile } from "../../components/UploadFile/UploadFile";

export const Register = () => {
  const { setUserComplete, bridgeData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({}); // estado para recibir y setear la respuesta
  const [send, setSend] = useState(false); // estado para saber si se ha enviado
  const [okRegister, setOkRegister] = useState(false); //estado para saber si el registro se ha realizado correctamente
  const [gender, setGender] = useState(null); //estado para setear con los buttons de genero

  const formSubmit = async (formData) => {
    console.log("formData", formData);
    //llamada asyncrona para obtener la data del formulario
    const inputFile = document.getElementById("file-upload").files; // para obtener la imagen que nos ponga el usuario
    console.log(inputFile);
    if (inputFile.length !== 0) {
      //si hay algun archivo en el inputFile
      const customFormData = {
        //hacemos una constante con la data + la imagen del input+ el state de gender + el rol predeterminado de cliente
        ...formData,
        role: "cliente",
        gender: gender,
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
        role: "cliente",
        gender: gender,
      };

      setSend(true); // seteamos el envio de la respuesta a true
      setRes(await registerUser(customFormData)); //actualizamos el registro del usuario
      setSend(false); // reseteamos el estado del envio de la respuesta (false)
    }
  };

  //!-------------Para gestionar los estados de la data y sus errores

  useEffect(() => {
    //gestionamos la res a través de un hook (useRegisterError)
    console.log("res", res);
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
          {" "}
          {/*box con el formularia, cada apartado tiene su formcontrol */}
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel htmlFor="name">UserName</FormLabel>
            <Input
              id="name"
              variant="filled"
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
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              variant="filled"
              autoComplete="false"
              placeholder="password"
              {...register("password", {
                required: "This is required",
              })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              variant="filled"
              placeholder="your email"
              {...register("email", {
                required: "This is required",
              })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="gender">Gender</FormLabel>
            {/*el onclick setea el estado de gender  */}
            <Button
              onClick={() => {
                setGender("hombre");
              }}
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
            >
              Hombre
            </Button>
            <Button
              onClick={() => {
                setGender("mujer");
              }}
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
            >
              Mujer
            </Button>
          </FormControl>
          <Uploadfile /> {/*Componente que controla la subida de imagen */}
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};
