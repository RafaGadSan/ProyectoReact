import "./Home.css";
import { Flex, Box, Square, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const { logout, user } = useAuth();
  return (
    <Flex justify="center" p="5" direction="column" align="center">
      {!user && (
        <Square size="300px">
          <Text fontSize="2xl" as="cite">
            Entra y disfruta de nuestras recetas, ingredientes y toda su
            información
          </Text>
          <Link to="/login">
            <Button colorScheme="teal" variant="solid" p="5px">
              Login
            </Button>
          </Link>
        </Square>
      )}
      {!user && (
        <Square size="300px">
          <Text fontSize="2xl" as="cite">
            ¿Aún no estás registrado? ¡A qué esperas!
          </Text>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Square>
      )}
      {user && <Button onClick={() => logout()}>Log out</Button>}
    </Flex>
  );
};

export default Home;
