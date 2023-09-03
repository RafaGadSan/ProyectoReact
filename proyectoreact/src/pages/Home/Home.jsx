import "./Home.css"
import { Flex, Box, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"

const Home = () => {
  const { logout, user } = useAuth()
  return (
    <Flex justify="center" p="5" direction="column" align="center" gap={10}>
      {!user && (
        <Box
          height="30vh"
          width="40%"
          background="#ff8243"
          border="1px yellow"
          borderRadius={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          paddingInline="50px"
          boxShadow="dark-lg"
        >
          <Text fontSize="2xl" as="b" textAlign="center">
            Entra y disfruta de nuestras recetas, ingredientes y toda su
            información
          </Text>
          <Link to="/login">
            <Button bgColor="#ffbf00" variant="solid">
              Login
            </Button>
          </Link>
        </Box>
      )}
      {!user && (
        <Box
          height="30vh"
          width="40%"
          background="#ff8243"
          border="1px yellow"
          borderRadius={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          paddingInline="50px"
          boxShadow="2xl "
        >
          <Text fontSize="2xl" as="cite">
            ¿Aún no estás registrado? ¡A qué esperas!
          </Text>
          <Link to="/register">
            <Button bgColor="teal">Register</Button>
          </Link>
        </Box>
      )}
      {user && <Button onClick={() => logout()}>Log out</Button>}
    </Flex>
  )
}

export default Home
