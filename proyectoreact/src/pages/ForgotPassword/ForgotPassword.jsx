import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordUser } from "../../services/user.service";
import { useForgotPasswordError } from "../../hooks/useForgotPasswordError";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
export const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);

  //!---------

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await forgotPasswordUser(formData));
    setSend(false);
  };

  //!---------
  useEffect(() => {
    useForgotPasswordError(res, setRes, setForgotOk);
    console.log(res);
  }, [res]);

  //!--------

  if (forgotOk) {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      <Text>Change your password</Text>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Box>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              autoComplete="false"
              name="email"
              placeholder="email"
              {...register("email", { required: true })}
            />
          </FormControl>
          <Button type="submit" disabled={send}>
            Send new password
          </Button>
        </Box>
      </form>
    </Box>
  );
};
