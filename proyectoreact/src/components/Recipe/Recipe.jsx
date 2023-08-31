import { Button, Image, Text, VStack, Box, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getIngredientById } from "../../services/ingredient.service";

//hacer servicio

export const Recipe = () => {
  //le pasamos el id de ingredients como parametro
  const navigate = useNavigate();

  const location = useLocation();

  const [recipe, setRecipe] = useState(location.state);
  const [ingredients, setIngredients] = useState(null); // array de objetos y cada objeto es el ingrediente en cuestion

  useEffect(() => {
    const getData = async () => {
      //!1.creas la asincronía dentro de el useEffect
      const tempIngredients = [];

      for (const ing of recipe.ingredients) {
        const data = await getIngredientById(ing); //!2.esperas a que se rellenen los ingredientes
        tempIngredients.push(data.data.data); // array de ingredientes
      }

      setIngredients(tempIngredients); //!3.una vez lleno, lo seteamos.
    };

    getData();

    //   useEffect para setear el ingrediente (asyncrona xq viene del back) con la funcion de getById del service
  }, [recipe, setIngredients]);

  //   console.log("ingrediente", ingredient);
  //   console.log("IDingrediente", idIngredient);
  return (
    <VStack>
      {recipe && (
        <>
          {/* {" "}
            <Image src={recipe.image} alt="imagen de recipe" />
            <Text>fat:{recipe.fat}</Text>
            <Text>fiber:{recipe.fiber}</Text>
            <Text>protein:{recipe.protein}</Text>
            <Text>salt:{recipe.salt}</Text>
            <Text>Simple sugars:{recipe.simpleSugars}</Text>
            <Text>Total sugars:{recipe.totalSugars}</Text>
            <Button onClick={() => navigate("/recipes")}>
              Back to recipes
            </Button> */}
          <Image width="100px" src={recipe.image} alt="imagen de recipe" />
          <Text>{recipe.name}</Text>

          {ingredients &&
            ingredients.map((ing) => <p key={ing._id}>{ing.name}</p>)}

          <Button onClick={() => navigate("/recipes")}>Back to recipes</Button>
        </>
      )}
    </VStack>
  );
};
