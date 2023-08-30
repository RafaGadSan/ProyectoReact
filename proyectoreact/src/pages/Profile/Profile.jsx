import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Box, IconButton } from "@chakra-ui/react";
import { LockIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { FormProfile } from "../../components/FormProfile/FormProfile";
import { ChangePassword } from "../../components/ChangePassword/ChangePassword";

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { setUser } = useAuth();
  return (
    <>
      <Box>
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
        <IconButton
          colorScheme="teal"
          aria-label="user delete button"
          size="lg"
          icon={<DeleteIcon />}
          onClick={() => setChangeRender(setUser)}
        />
        <Box>{changeRender ? <FormProfile /> : <ChangePassword />}</Box>
      </Box>
    </>
  );
};
