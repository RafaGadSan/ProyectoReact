import { Flex, Box, Square, Text, Button, Image, Link } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

export const Dashboard = () => {
  return (
    <Flex justify="center" direction="row" align="center">
      <Box p="5">
        <NavLink to="/recipes">
          <Image
            src="https://res.cloudinary.com/dyyzufpto/image/upload/v1693646660/index_bkbfc2.png"
            alt="recetas"
            width="40vw"
            height="40vh"
            position="cover"
          />
        </NavLink>
        <Text
          display="flex"
          align="center"
          as="b"
          fontSize="3xl"
          justifyContent="center"
        >
          Our Recipes
        </Text>
      </Box>
      <Box p="5">
        <NavLink to="/ingredients">
          <Image
            src="https://res.cloudinary.com/dyyzufpto/image/upload/v1693646020/receta-galletas-726x488_wfczjf.jpg"
            alt="ingredientes"
            width="40vw"
            height="40vh"
          />
        </NavLink>
        <Text
          display="flex"
          align="center"
          as="b"
          fontSize="3xl"
          justifyContent="center"
        >
          Our Ingredients
        </Text>
      </Box>
    </Flex>
  )
}
