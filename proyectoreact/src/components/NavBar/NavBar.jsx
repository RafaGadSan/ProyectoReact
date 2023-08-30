import { Avatar, Box, Button, Flex, Spacer } from "@chakra-ui/react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Flex justifyContent="space-around" p="10">
        <Box>
          <NavLink to="/">
            <Button>Home</Button>
          </NavLink>
        </Box>
        <Spacer />
        <Box>
          {!user && (
            <NavLink to="/login" as="div">
              <Button mx="4">Login</Button>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" as="div">
              <Button mx="4">Register</Button>
            </NavLink>
          )}
          {user && (
            <NavLink to="/" as="div">
              <Button mx="4" onClick={() => logout()}>
                Logout
              </Button>
            </NavLink>
          )}
          <Avatar
            name="logo"
            src="https://us.123rf.com/450wm/moleks/moleks1507/moleks150700003/41889582-el-servicio-de-comida-caf%C3%A9-vector-logo-plantilla-de-dise%C3%B1o.jpg?ver=6"
          />
        </Box>
      </Flex>
    </nav>
  );
};

export default Navbar;
