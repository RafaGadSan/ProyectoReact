import { Button, Image, Text, VStack, Box, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getIngredientById } from "../../services/ingredient.service";

//hacer servicio

export const Recipe = () => {
  const navigate = useNavigate();

  const location = useLocation(); // usamos uselocaion para traernos la info de ingredients y ahorrar una llamada al servicio

  const [recipe, setRecipe] = useState(location.state);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const getData = async () => {
      //!1.creas la asincronía dentro de el useEffect
      const tempIngredients = [];

      for (const ing of recipe.ingredients) {
        const data = await getIngredientById(ing); //!2.esperas a que se rellenen los ingredientes
        tempIngredients.push(data.data.data);
      }

      setIngredients(tempIngredients); //!3.una vez lleno, lo seteamos.
    };

    getData();
  }, [recipe, setIngredients]);

  return (
    <VStack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      border="1px"
      bgColor="#ff8243"
      borderRadius="10%"
      gap="5px"
      paddingY="5px"
      height="50vh"
      width="40vw"
    >
      {recipe && (
        <>
          <Image
            width="15vw"
            height="20vh"
            src={recipe.image}
            alt="imagen de recipe"
            borderRadius="10%"
          />
          <Text fontSize="2xl">Name: {recipe.name}</Text>
          <Text>Preparation time: {recipe.preparationTime}</Text>
          <Text>Recipe Steps: {recipe.steps}</Text>
          <Text>Ingredients: </Text>
          {/*mapeamos los ingredientes para pintarlos en las recetas (si tienen) */}
          {ingredients &&
            ingredients.map((ing) => <p key={ing._id}>{ing.name}</p>)}

          <Button onClick={() => navigate("/recipes")} bgColor="teal">
            Back to recipes
          </Button>
        </>
      )}
    </VStack>
  );
};
