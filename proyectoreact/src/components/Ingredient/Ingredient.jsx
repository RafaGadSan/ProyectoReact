import { Button, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getIngredientById } from "../../services/ingredient.service";

//hacer servicio

export const Ingredient = () => {
  //le pasamos el id de ingredients como parametro
  const navigate = useNavigate();
  // const [ingredient, setIngredient] = useState(null);

  const location = useLocation();

  const ingredient = location.state;

  // console.log(ingredient2);

  // useEffect(() => {
  //   //   useEffect para setear el ingrediente (asyncrona xq viene del back) con la funcion de getById del service
  //   const getData = async () => {
  //     const data = await getIngredientById(idIngredient);
  //     setIngredient(await data.data.data);
  //   };
  //   getData();
  // }, []);

  //   console.log("ingrediente", ingredient);
  //   console.log("IDingrediente", idIngredient);
  return (
    <VStack>
      {ingredient && (
        <>
          {" "}
          <Image src={ingredient.image} alt="imagen de ingrediente" />
          <Text>fat:{ingredient.fat}</Text>
          <Text>fiber:{ingredient.fiber}</Text>
          <Text>protein:{ingredient.protein}</Text>
          <Text>salt:{ingredient.salt}</Text>
          <Text>Simple sugars:{ingredient.simpleSugars}</Text>
          <Text>Total sugars:{ingredient.totalSugars}</Text>
          <Button onClick={() => navigate("/ingredients")}>
            Back to ingredients
          </Button>
        </>
      )}
    </VStack>
  );
};
