import { Button, Flex, Text, FormLabel, HStack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  getAllIngredients,
  updateIngredient,
} from "../../services/ingredient.service";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const AdminIngredients = () => {
  const [ingredientsList, setIngredientsList] = useState(null);
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(null);
  const [inputValues, setInputValues] = useState({}); // Objeto para almacenar los valores de los inputs

  useEffect(() => {
    (async () => {
      let ingredients = await getAllIngredients().then((res) => res);
      setIngredientsList(await ingredients.data.data);
    })();
  }, []);

  const formSubmit = (formData, id) => {
    Swal.fire({
      title: `Are you sure you want to change this ingredient's data?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length !== 0) {
          const customFormData = {
            ...formData,
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

  const handleInputChange = (e, ingredientId) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [ingredientId]: {
        ...prevInputValues[ingredientId],
        [name]: value,
      },
    }));
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
              onSubmit={handleSubmit((data) =>
                formSubmit(data, ingredient._id)
              )}
              key={ingredient._id}
            >
              <HStack maxW={"100%"}>
                <Button>Delete</Button>
                <FormLabel>Name:</FormLabel>
                <Input
                  maxW={"10rem"}
                  paddingX={1}
                  type="text"
                  isRequired
                  name="name"
                  value={inputValues[ingredient._id]?.name || ingredient.name}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  {...register("name")}
                />
                <FormLabel>Simple sugars:</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="simpleSugars"
                  value={
                    inputValues[ingredient._id]?.simpleSugars ||
                    ingredient.simpleSugars
                  }
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  {...register("simpleSugars")}
                />
                <FormLabel>Total sugars</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="totalSugars"
                  value={
                    inputValues[ingredient._id]?.totalSugars ||
                    ingredient.totalSugars
                  }
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  {...register("totalSugars")}
                />
                <FormLabel>Fat</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="fat"
                  value={inputValues[ingredient._id]?.fat || ingredient.fat}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  {...register("fat")}
                />
                <FormLabel>Protein</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="protein"
                  value={
                    inputValues[ingredient._id]?.protein || ingredient.protein
                  }
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  {...register("protein")}
                />
                <FormLabel>Salt</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="salt"
                  value={inputValues[ingredient._id]?.salt || ingredient.salt}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
                  {...register("salt")}
                />
                <FormLabel>Fiber</FormLabel>
                <Input
                  paddingX={1}
                  type="number"
                  maxW="60px"
                  name="fiber"
                  value={inputValues[ingredient._id]?.fiber || ingredient.fiber}
                  onChange={(e) => handleInputChange(e, ingredient._id)}
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

// return (
//   <>
//     {console.log("lista antes del form", ingredientsList)}
//     <Flex justify="center" alignItems="center" dir="column" wrap="wrap">
//       {/*mapeamos la lista de ingredientes para obtener cada uno de ellos */}
//       {ingredientsList &&
//         ingredientsList.map((ingredient) => (
//           <form onSubmit={() => handleSubmit(formSubmit, ingredient._id)}>
//             {console.log("ingrediente en el form", ingredient)}
//             <HStack key={ingredient._id} maxW={"100%"}>
//               <Button>Delete</Button>
//               <FormLabel>Name:</FormLabel>
//               <Input
//                 maxW={"10rem"}
//                 paddingX={1}
//                 type="text"
//                 isRequired
//                 name="name"
//                 defaultValue={ingredient.name}
//                 {...register("name")}
//               />
//               <FormLabel>Simple sugars:</FormLabel>
//               <Input
//                 paddingX={1}
//                 type="number"
//                 maxW="60px"
//                 name="simpleSugars"
//                 defaultValue={ingredient.simpleSugars}
//                 {...register("simpleSugars")}
//               />
//               <FormLabel>Total sugars</FormLabel>
//               <Input
//                 paddingX={1}
//                 type="number"
//                 maxW="60px"
//                 name="totalSugars"
//                 defaultValue={ingredient.totalSugars}
//                 {...register("totalSugars")}
//               />
//               <FormLabel>Fat</FormLabel>
//               <Input
//                 paddingX={1}
//                 type="number"
//                 maxW="60px"
//                 name="fat"
//                 defaultValue={ingredient.fat}
//                 {...register("fat")}
//               />
//               <FormLabel>Protein</FormLabel>
//               <Input
//                 paddingX={1}
//                 type="number"
//                 maxW="60px"
//                 name="protein"
//                 defaultValue={ingredient.protein}
//                 {...register("protein")}
//               />
//               <FormLabel>Salt</FormLabel>
//               <Input
//                 paddingX={1}
//                 type="number"
//                 maxW="60px"
//                 name="salt"
//                 defaultValue={ingredient.salt}
//                 {...register("salt")}
//               />
//               <FormLabel>Fiber</FormLabel>
//               <Input
//                 paddingX={1}
//                 type="number"
//                 maxW="60px"
//                 name="fiber"
//                 defaultValue={ingredient.fiber}
//                 {...register("fiber")}
//               />
//               <Button>Photo</Button>
//               <Button type="submit" disabled={send}>
//                 Save
//               </Button>
//             </HStack>
//           </form>
//         ))}
//       {console.log("lista después del form", ingredientsList)}
//     </Flex>
//   </>
// );
//};
