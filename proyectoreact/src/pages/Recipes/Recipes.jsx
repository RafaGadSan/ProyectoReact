import { useEffect, useState } from "react";
import { getAllRecipes } from "../../services/recipe.service";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Recipes = () => {
  const [recipesList, setRecipesList] = useState(null);

  useEffect(() => {
    (async () => {
      let recipes = await getAllRecipes().then((res) => res);

      setRecipesList(await recipes.data.data);
    })();
  }, []);

  return (
    <>
      <Flex justify="center" alignItems="center" dir="column" wrap="wrap">
        {recipesList &&
          recipesList.map((recipe) => (
            <Box key={recipe._id}>
              <Link
                to={`/recipes/recipe/${recipe.name}`}
                state={recipe}
                // key={recipe.id}
              >
                <Image
                  maxW={100}
                  src={recipe.image}
                  alt="imagen de la receta"
                />
              </Link>
              <Text>Nombre: {recipe.name}</Text>
            </Box>
          ))}
      </Flex>
    </>
  );
};
