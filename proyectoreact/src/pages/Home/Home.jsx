import "./Home.css";
import { Flex, Box, Square, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <Flex justify="center" p="5" direction="column" align="center">
      <Square size="300px">
        <Text fontSize="2xl" as="cite" >
          Entra y disfruta de nuestras recetas, ingredientes y toda su
          información
        </Text>
        <Link to="/login"><Button  colorScheme='teal' variant='solid' p="5px">Login</Button></Link>
      </Square>
      <Square size="300px">
        <Text fontSize="2xl" as="cite" >
          ¿Aún no estás registrado? ¡A qué esperas!
        </Text>
        <Link to="/register"><Button>Register</Button></Link>
      </Square>
    </Flex>
  );
};

export default Home;
