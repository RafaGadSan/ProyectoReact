import { useEffect, useState } from "react"
import { getAllRecipes } from "../../services/recipe.service"
import { Flex, Box, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Recipes = () => {
  const [recipesList, setRecipesList] = useState(null)

  useEffect(() => {
    ;(async () => {
      let recipes = await getAllRecipes().then((res) => res)

      setRecipesList(await recipes.data.data)
    })()
  }, [])

  return (
    <>
      <Flex
        display="flex"
        justify="center"
        alignItems="center"
        dir="column"
        wrap="wrap"
        gap="5px"
      >
        {recipesList &&
          recipesList.map((recipe) => (
            <Box
              key={recipe._id}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              border="1px"
              bgColor="#ff8243"
              borderRadius="10%"
              gap="2px"
              p="8px"
            >
              <Link
                to={`/recipes/recipe/${recipe.name}`}
                state={recipe}
                // key={recipe.id}
              >
                <Image
                  width={200}
                  height={200}
                  borderRadius="10%"
                  src={recipe.image}
                  alt="imagen de la receta"
                />
              </Link>
              <Text as="cite" columnGap="3px">
                Nombre: {recipe.name}
              </Text>
            </Box>
          ))}
      </Flex>
    </>
  )
}
