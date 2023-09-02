import {
  Button,
  Flex,
  FormLabel,
  HStack,
  Image,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  getAllIngredients,
  updateIngredient,
} from "../../services/ingredient.service";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const AdminIngredients = () => {
  const [ingredientsList, setIngredientsList] = useState(null); // Creamos un estado paragettear y settear la informacion, la inicializamos con u array de objetos vacia
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(null);

  const formSubmit = (formData, id) => {
    Swal.fire({
      title: "Are you sure you want to change this ingridient's data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length != 0) {
          const customFormData = {
            ...formData,
            //image: inputFile[0],
          };

          setSend(true);
          setRes(await updateIngredient(customFormData, id));
          setSend(false);
        } else {
          const customFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await updateIngredient(customFormData, id));
          setSend(false);
        }
      }
    });
  };

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
            <form onSubmit={() => handleSubmit(formSubmit, ingredient._id)}>
              {console.log(ingredient)}
              <HStack key={ingredient._id} maxW={"100%"}>
                <Button>Delete</Button>
                <FormLabel>Name:</FormLabel>
                <Input
                  maxW={"10rem"}
                  paddingX={1}
                  type="text"
                  isRequired
                  name="name"
                  defaultValue={ingredient.name}
                  {...register("name")}
                />
                <FormLabel>Simple sugars:</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="simpleSugars"
                  defaultValue={ingredient.simpleSugars}
                  {...register("simpleSugars")}
                />
                <FormLabel>Total sugars</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="totalSugars"
                  defaultValue={ingredient.totalSugars}
                  {...register("totalSugars")}
                />
                <FormLabel>Fat</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="fat"
                  defaultValue={ingredient.fat}
                  {...register("fat")}
                />
                <FormLabel>Protein</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="protein"
                  defaultValue={ingredient.protein}
                  {...register("protein")}
                />
                <FormLabel>Salt</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="salt"
                  defaultValue={ingredient.salt}
                  {...register("salt")}
                />
                <FormLabel>Fiber</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="fiber"
                  defaultValue={ingredient.fiber}
                  {...register("fiber")}
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
