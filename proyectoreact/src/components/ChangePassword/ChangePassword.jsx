import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/authContext"
import Swal from "sweetalert2/dist/sweetalert2.all"
import { changePasswordUserToken } from "../../services/user.service"
import { useChangePasswordError } from "../../hooks/useChangePasswordError"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const ChangePassword = () => {
  const { setUser } = useAuth() // destructuring para setear el usuario autenticado
  const { handleSubmit, register } = useForm()
  const [res, setRes] = useState({})
  const [send, setSend] = useState(false)

  //!------

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData // destructuring de la data del usuario para coger la password, la nueva pasword y la confirmacion de la nueva password

    if (newPassword == confirmPassword) {
      //si la newpassword y su confirmacion son iguales, damos feedbck al user para asegurar que lo quiere cambiar
      Swal.fire({
        title: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
      }).then(async (result) => {
        //gestion de la asincronia con un .then
        if (result.isConfirmed) {
          setSend(true)
          setRes(await changePasswordUserToken({ password, newPassword })) //seteamos la respuesta con la info del servicio
          setSend(false)
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "New Password don't match with confirmation password",
        showConfirmButton: false,
        timer: 2500,
      })
    }
  }

  //!---------- useEffect para gestionar los errores

  useEffect(() => {
    console.log(res)
    useChangePasswordError(res, setRes, setUser)
  }, [res]) // en el array de dependencias ponemos cuando queremos que se renderice, en este caso con el cambio de la res

  //!--------
  return (
    <Box>
      <VStack>
        {" "}
        {/*Para poner los textos uno debajo de otro */}
        <Text>Change your password</Text>
        <Text>Please, enter your old and new passwords</Text>
      </VStack>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormControl>
          <FormLabel>Old password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="false"
            {...register("password", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>New password</FormLabel>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            autoComplete="false"
            {...register("newPassword", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm new password</FormLabel>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="false"
            {...register("confirmPassword", { required: true })}
          />
        </FormControl>
        <Button
          type="submit"
          disabled={send}
          style={{ background: send ? "#49c1a388" : "#49c1a2" }}
        >
          Change password
        </Button>
      </form>
    </Box>
  )
}
