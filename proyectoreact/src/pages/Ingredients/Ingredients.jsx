import { useEffect, useState } from "react";
import { getAllIngredients } from "../../services/ingredient.service";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Ingredient } from "../../components/Ingredient/Ingredient";
import { Link } from "react-router-dom";

export const Ingredients = () => {
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
            <Box key={ingredient._id}>
              <Link
                to={`/ingredients/ingredient/${ingredient.name}`}
                state={ingredient}
              >
                <Image
                  maxW={100}
                  src={ingredient.image}
                  alt="imagen del ingrediente"
                />
              </Link>
              <Text>name:{ingredient.name}</Text>
            </Box>
          ))}
      </Flex>
    </>
  );
};

/**
 * 
 *         {ingredientsList &&
          ingredientsList.map((ingredient) => (
            <Box key={ingredient._id}>
              {<Ingredient idIngredient={ingredient._id} />}
            </Box>
          ))}
 */

// import React, { Component } from 'react';
// import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
// import { render } from 'react-dom';

// /* Página home */
// const Home = () => (
//   <div>
//     <h1>Home</h1>
//     <Link to='/detail/123'>Detalle usando path params</Link><br />
//     <Link to={{
//       pathname: '/another-type-of-detail',
//       state: { id: '456' }
//     }}>Detalle usando state</Link>
//   </div>
// )

// /* Página Detail que extrae la id de la ruta,
//   para ello en nuestras rutas tenemos que especificar que la ruta
//   tendrá en el path ese segmento.
//   Es la opción más recomendada en este caso.
// */
// const Detail = ({ match }) => (
//   <div>
//     <h2>Detalle</h2>
//     <p>Me han pasado la id {match.params.id} en la url</p>
//     <Link to='/'>Volver a la home</Link>
//   </div>
// )

// /* Página AnotherDetail que extrae la id del state,
//   no necesitamos hacer nada especial en las rutas salvo crearla.
// */
// const AnotherDetail = ({ location }) => (
//   <div>
//     <h2>Detalle</h2>
//     <p>Me han pasado la id {location.state.id} en el state</p>
//     <Link to='/'>Volver a la home</Link>
//   </div>
// )

// /* Render de react-dom para mostrar nuestra app */
// render(
//   <BrowserRouter>
//     <Switch>
//       <Route exact path='/' component={Home} />
//       <Route path='/detail/:id' component={Detail} />
//       <Route path='/another-type-of-detail' component={AnotherDetail} />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById('root')
// )

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getById } from "../../Services/GameOfThrones.service";

// const CharacterById = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); //cogemos el id de los params de getById

//   const [character, setCharacter] = useState(); //creamos un estado para poder setear el character

//   useEffect(() => {
//     //aquí modificamos el setCharacter con una promesa (realizado con axios NO seria async-await) con la funcion getById con el params(id)

//     (async () => {
//       setCharacter(await getById(id));
//     })();
//   }, []);

//   return (
//     <figure> {/*aquí retornamos la informacion previamente seteada de character que queremos que se nos pinte */}
//     {console.log(character)}
//     <img src={character?.imageUrl} alt={character?.fullName} />
//     <h4>{character?.fullName}</h4>
//     <h5>
//       {character?.fullName} de la Familia {character?.family}
//     </h5>
//     <button onClick={() => navigate("/gameofthrones")}> {/*boton para volver a la pagina que le pasemos a navigate */}
//       Volver a la Galeria
//     </button>
//   </figure>
// );
// };

// export default CharacterById;
//!--

// import CharacterById from '../../components/CharacterById/CharacterById'

// const Character = () => {
//   console.log("Entro")
//   return (
//     <CharacterById />
//   )
// }

// export default Character

//!-------

{
  /* <Link to={`/gameofthrones/character/${element.id}`}> <img
src={element.imageUrl}
alt={element.fullName}
width={"200px"}
height={"200px"}
/></Link> */
}
