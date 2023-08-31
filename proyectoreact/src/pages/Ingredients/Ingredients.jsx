import { useEffect, useState } from "react";
import { getAllIngredients } from "../../services/ingredient.service";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const Ingredients = () => {
  const [ingredientsList, setIngredientsList] = useState([{}]); // Creamos un estado paragettear y settear la informacion, la inicializamos con u array de objetos vacia
  useEffect(() => {
    //UseEffect para setear la informacion, es asyncrona porque nos traemos la info del back
    (async () => {
      let ingredients = await getAllIngredients().then((res) => res); //Creamos la funcion que almacenara la info

      setIngredientsList(await ingredients.data.data); //setteamos la info que nos trae la respuesta
    })();
  }, []);
  console.log(ingredientsList);
  return (
    <>
      <Flex justify="center" alignItems="center" dir="column" wrap="wrap">
        {ingredientsList.map((ingredient) => (
          <Box key={ingredient.id}>
            <Image
              maxW={100}
              src={ingredient.image}
              alt="imagen del ingrediente"
            />
            <Text>name:{ingredient.name}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
};
