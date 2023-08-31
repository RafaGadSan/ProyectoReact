import { useEffect, useState } from "react";
import { getAllRecipes } from "../../services/recipe.service";
import { Flex, Box, Image, Text } from "@chakra-ui/react";

export const Recipes = () => {
  const [recipesList, setRecipesList] = useState([{}]);

  useEffect(() => {
    (async () => {
      let recipes = await getAllRecipes().then((res) => res);

      setRecipesList(await recipes.data.data);
    })();
  }, []);

  return (
    <>
      <Flex justify="center" alignItems="center" dir="column" wrap="wrap">
        {recipesList.map((recipe) => (
          <Box key={recipe.id}>
            <Image maxW={100} src={recipe.image} alt="imagen de la receta" />
            <Text>Nombre: {recipe.name}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
};
