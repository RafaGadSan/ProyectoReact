import "./Home.css";
import { Flex, Box, Square, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <Flex justify="center" p="20">
      <Square size="300px">
        <Text fontSize="2xl" as="cite" noOfLines={1}>
          Entra y disfruta de nuestras recetas, ingredientes y toda su
          información
        </Text>
        <Link><Button leftIcon={<LoginIcon />} colorScheme='teal' variant='solid'>Login</Button></Link>
      </Square>
      <Square size="300px">
        <Text fontSize="2xl" as="cite" noOfLines={1}>
          ¿Aún no estás registrado? ¡A qué esperas!
        </Text>
        <Link><Button>Register</Button></Link>
      </Square>
    </Flex>
  );
};

export default Home;
