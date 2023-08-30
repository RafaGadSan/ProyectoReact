import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { loginUserService } from "../../services/user.service";
import { useLoginError } from "../../hooks/useLoginError";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({}); //Estado para recibir y settear la respuesta
  const [send, setSend] = useState(false); //Estado para saber y setear el envio
  const [loginOk, setLoginOk] = useState(false); //Estado para saber que el login se ha hecho correctamente
  const { userLogin, setUser } = useAuth(); // Autorizacion del contexto

  //!--------------

  const formSubmit = async (formData) => {
    setSend(true); //seteamos el envio de la funcion
    setRes(await loginUserService(formData)); // seteamos la respuesta del servicio con la data del formulario
    setSend(false); // reseteamos el estado de la funcion
  };

  //!-------------
  useEffect(() => {
    //useEffect para gestionar los errores
    console.group(res);
    useLoginError(res, setRes, userLogin, setLoginOk); //parametros que geteamos y seteamos en el hook
  }, [res]); // en el array de dependencias, el parametro que "hace" que se renderice el useeffect

  useEffect(() => {
    //useEffect por si hay algun usuario (que no deberia antes de hacer el login), borrarlo haciendo reseteo del user
    setUser(() => null);
    localStorage.removeItem("user");
  }, []);

  //!---------

  if (loginOk) {
    if (res.data.user.check == false) {
      //en caso de loggearse bien pero sin haber hecho el checkeo del confirmationCode
      return <Navigate to="/verfyCode" />; // nos redirige a la verificacion del codigo
    } else {
      return <Navigate to="/dashboard" />; // nos redirige a la dashboard porque el codeConfirmation esta ok
    }
  }
  return (
    <>
      <Box>
        <VStack>
          <Text>Sing in</Text>
          <Text>We are happy to see you again</Text>
        </VStack>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormControl>
            <FormLabel>email</FormLabel>
            <Input
              type="email"
              isRequired
              autoComplete="false"
              variant="filled"
              {...register("email", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>password</FormLabel>
            <Input
              type="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
          </FormControl>
          <VStack>
            <Text>LOGIN</Text>
            <Button mt={4} colorScheme="teal" type="submit">
              Submit
            </Button>
            <Text>
              Have you forgotten the password?
              <ChakraLink as={ReactRouterLink} to="/forgotpassword">
                {" "}
                Change password
              </ChakraLink>
            </Text>
          </VStack>
        </form>
      </Box>
    </>
  );
};
