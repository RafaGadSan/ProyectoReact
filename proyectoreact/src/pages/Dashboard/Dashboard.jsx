import { Flex, Box, Square, Text, Button, Image, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Dashboard = () => {
  return (
    <Flex justify="center" direction="row" align="center">
      <Box p="5">
        <NavLink to="/recipes">
          <Image src="" alt="" width="40vw" height="40vh" />
        </NavLink>
        <Text align="center">Our Recipes</Text>
      </Box>
      <Box p="5">
        <NavLink to="/ingredients">
          <Image src="" alt="" width="40vw" height="40vh" />
        </NavLink>
        <Text align="center">Our Ingredients</Text>
      </Box>
    </Flex>
  );
};
