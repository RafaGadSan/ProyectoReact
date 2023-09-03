import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { LockIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { FormProfile } from "../../components/FormProfile/FormProfile";
import { ChangePassword } from "../../components/ChangePassword/ChangePassword";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { NavLink } from "react-router-dom";

export const Profile = () => {
  const { setUser } = useAuth();
  const [changeRender, setChangeRender] = useState(true);

  return (
    <>
    <Flex  background="#ff8243"
        border="1px yellow"
        borderRadius={10}
        boxShadow='dark-lg'
        width="40vw"
        justifyContent="space-around"
        paddingY="5">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="3px"
      >
        <IconButton
          colorScheme="teal"
          aria-label="go to ChangePassword"
          size="lg"
          icon={<LockIcon />}
          onClick={() => setChangeRender(false)}
        />
        <IconButton
          colorScheme="teal"
          aria-label="go to change data profile"
          size="lg"
          icon={<RepeatIcon />}
          onClick={() => setChangeRender(true)}
        />
        <NavLink to="/">
          <IconButton
            colorScheme="teal"
            aria-label="user delete button"
            size="lg"
            icon={<DeleteIcon />}
            onClick={() => useDeleteUser(setUser)}
          />
        </NavLink>
      </Box>
      <Box>{changeRender ? <FormProfile /> : <ChangePassword />}</Box>
      </Flex >
    </>
  );
};
