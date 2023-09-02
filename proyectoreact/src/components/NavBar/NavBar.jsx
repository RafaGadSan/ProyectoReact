import { Avatar, Box, Button, Flex, Spacer } from "@chakra-ui/react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { Profile } from "../../pages/Profile/Profile";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Flex justifyContent="space-around" p="7px" height="12vh">
        <Box className="homeavatar" display="flex" >
          <Avatar height="12vh"
          width="50%"
          position="cover"
            name="logo"
            src="https://us.123rf.com/450wm/moleks/moleks1507/moleks150700003/41889582-el-servicio-de-comida-caf%C3%A9-vector-logo-plantilla-de-dise%C3%B1o.jpg?ver=6"
          />
          <NavLink to="/">
            <Button
              className="homebutton"
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
              bgColor="#ffbf00"
            >
              Home
            </Button>
          </NavLink>
        </Box>
        <Spacer />
        <Box className="buttonsbar">
          {!user && (
            <NavLink to="/login" as="div">
              <Button bgColor="#ffbf00" mx="4">Login</Button>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" as="div">
              <Button bgColor="#ffbf00" mx="4">Register</Button>
            </NavLink>
          )}
          {user && (
            <NavLink to="/" as="div">
              <Button bgColor="red" mx="4" onClick={() => logout()}>
                Logout
              </Button>
            </NavLink>
          )}
          {user && (
            <NavLink to="/dashboard" as="div">
              <Button bgColor="#ffbf00" mx="4">Dashboard</Button>
            </NavLink>
          )}
          {user && (
            <NavLink to="/profile" as="div">
              <Button mx="4" bgColor="#ffbf00">Profile</Button>
            </NavLink>
          )}
          {user && (user.role == "nutricionista" || user.role == "admin") && (
            <NavLink to="/adminRecipe" as="div">
              <Button bgColor="orangered" mx="4">Admin Recipes</Button>
            </NavLink>
          )}
          {user && (user.role == "nutricionista" || user.role == "admin") && (
            <NavLink to="/adminIngredient" as="div">
              <Button bgColor="orangered" mx="4">Admin Ingredients</Button>
            </NavLink>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default Navbar;
