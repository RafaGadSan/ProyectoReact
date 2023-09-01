import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAllIngredients } from "../../services/ingredient.service";
import { Link } from "react-router-dom";

export const AdminIngredients = () => {
  const [ingredientsList, setIngredientsList] = useState(null); // Creamos un estado paragettear y settear la informacion, la inicializamos con u array de objetos vacia
  useEffect(() => {
    //UseEffect para setear la informacion, es asyncrona porque nos traemos la info del back
    (async () => {
      let ingredients = await getAllIngredients().then((res) => res); //Creamos la funcion que almacenara la info

      setIngredientsList(await ingredients.data.data); //setteamos la info que nos trae la respuesta
    })();
  }, []);
  return (
    <>
      <Flex justify="center" alignItems="center" dir="column" wrap="wrap">
        {/*mapeamos la lista de ingredientes para obtener cada uno de ellos */}
        {ingredientsList &&
          ingredientsList.map((ingredient) => (
            <HStack key={ingredient._id} maxW={"100%"}>
              <Button>Delete</Button>
              <FormLabel>Name:</FormLabel>
              <Input
                paddingX={1}
                type="text"
                isRequired
                defaultValue={ingredient.name}
              />
              <FormLabel>Simple sugars:</FormLabel>
              <Input
                paddingX={1}
                type="number"
                width="15rem"
                defaultValue={ingredient.simpleSugars}
              />
              <FormLabel>Total sugars</FormLabel>
              <Input
                paddingX={1}
                type="number"
                width="15rem"
                defaultValue={ingredient.totalSugars}
              />
              <FormLabel>Fat</FormLabel>
              <Input
                paddingX={1}
                type="number"
                width="15rem"
                defaultValue={ingredient.fat}
              />
              <FormLabel>Protein</FormLabel>
              <Input
                paddingX={1}
                type="number"
                width="15rem"
                defaultValue={ingredient.protein}
              />
              <FormLabel>Salt</FormLabel>
              <Input
                paddingX={1}
                type="number"
                width="15rem"
                defaultValue={ingredient.salt}
              />
              <FormLabel>Fiber</FormLabel>
              <Input
                paddingX={1}
                type="number"
                width="15rem"
                defaultValue={ingredient.fiber}
              />
              <Button>Photo</Button>
              <Button>Save</Button>
            </HStack>
          ))}
      </Flex>
    </>
  );
};
