import { Button, Flex, Text, FormLabel, HStack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  deleteIngredientService,
  getAllIngredients,
  updateIngredient,
} from "../../services/ingredient.service";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const AdminIngredients = () => {
  const [ingredientsList, setIngredientsList] = useState(null);
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(null);
  const [res, setRes] = useState(null);
  // const [inputValues, setInputValues] = useState([]); // Objeto para almacenar los valores de los inputs

  useEffect(() => {
    (async () => {
      // IIFE Inmediately invoked function expression
      if (!ingredientsList) {
        const ingredients = await getAllIngredients();
        if (ingredients) setIngredientsList(ingredients.data.data);
      }
    })();
  }, [ingredientsList]);

  const formSubmit = (e, id) => {
    e.preventDefault(); //!para que el html no mande de forma predefinida el form

    Swal.fire({
      title: `Are you sure you want to change this ingredient's data?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //const inputFile = document.getElementById("file-upload").files;

        // if (inputFile.length !== 0) {
        // const customFormData = {
        //   ...formData,
        // };

        const ingredient = ingredientsList.find((ing) => ing._id === id);

        const customFormData = {
          name: ingredient.name,
          simpleSugars: ingredient.simpleSugars,
          totalSugars: ingredient.totalSugars,
          fat: ingredient.fat,
          protein: ingredient.protein,
          salt: ingredient.salt,
          fiber: ingredient.fiber,
        };

        setSend(true);
        setRes(await updateIngredient(customFormData, id));
        setSend(false);
      } //else {
      //const customFormData = {
      //    ...formData,
      //  };
      //  setSend(true);
      //  setRes(await updateIngredient(customFormData, id));
      // setSend(false);
      //   }
      // }
    });
  };

  const handleInputChange = (e, ingredientId) => {
    // const { name, value } = e.target;
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [ingredientId]: {
    //     ...prevInputValues[ingredientId],
    //     [name]: value,
    //   },
    // }));

    const ingredientsCopy = [...ingredientsList];

    ingredientsCopy.forEach((ing) => {
      if (ing._id === ingredientId) ing[e.target.name] = e.target.value;
    });

    setIngredientsList(ingredientsCopy);
  };

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
        {ingredientsList &&
          ingredientsList.map((ingredient) => (
            <form
              onSubmit={(e) => formSubmit(e, ingredient._id)}
              key={ingredient._id}
            >
              <HStack maxW={"100%"}>
                <Button onClick={() => deleteIngredientService(ingredient._id)}>
                  Delete
                </Button>
                <FormLabel>Name:</FormLabel>
                <Input
                  maxW={"10rem"}
                  paddingX={1}
                  type="text"
                  isRequired
                  name="name"
                  defaultValue={ingredient.name}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`name${index}`)}
                />
                <FormLabel>Simple sugars:</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="simpleSugars"
                  defaultValue={ingredient.simpleSugars}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`simpleSugars${index}`)}
                />
                <FormLabel>Total sugars</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="totalSugars"
                  defaultValue={ingredient.totalSugars}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`totalSugars${index}`)}
                />
                <FormLabel>Fat</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="fat"
                  defaultValue={ingredient.fat}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`fat${index}`)}
                />
                <FormLabel>Protein</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="protein"
                  defaultValue={ingredient.protein}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`protein${index}`)}
                />
                <FormLabel>Salt</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="salt"
                  defaultValue={ingredient.salt}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`salt${index}`)}
                />
                <FormLabel>Fiber</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="fiber"
                  defaultValue={ingredient.fiber}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  // {...register(`fiber${index}`)}
                />
                <Button>Photo</Button>
                <Button type="submit" disabled={send}>
                  Save
                </Button>
              </HStack>
            </form>
          ))}
      </Flex>
    </>
  );
};
