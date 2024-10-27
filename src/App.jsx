import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
// # Instrucciones

// - Usaremos un formulario para hacer peticiones a la API de pokemon, donde nos devolverá el pokemon que estemos buscando en ese momento. Si no existiera nos tiene que devolver un mensaje de `pokemon no encontrado`  
// - Utilizar estados para manejar el término de búsqueda, los resultados de la búsqueda, el estado de carga y los errores. Los que pienses que son necesarios.
//   *** PISTA: *** `useState` para guardar los cambios de cada uno de los estados
// - En la búsqueda tendremos que ir actualizando el cambio en el momento de cada escritura. Si escribimos el pokemon `Pikachu` si escribimos `P` hará búsqueda, `Pi`, siguiente búsqueda... y así hasta que encuentre el pokemon.
//   *** PISTA: *** `useEffect` para actualizar en cada momento la busqueda pasándole el parametro de cambio 
// - Mostrar los resultados de la búsqueda (nombre e imagen del Pokémon) en la interfaz de usuario. Puedes añadir más datos si lo deseas.
// - Manejar adecuadamente los casos de búsqueda vacía, resultados no encontrados y errores de la API.
// - Crea estilos CSS para tu aplicación según sea necesario. Puedes utilizar App.css para crearlos.

// *** Recursos adicionales ***

// Documentación de la PokeAPI: https://pokeapi.co/docs/v2

const Pokemon = ({ name }) => {
  return (
    <h2>{name}</h2>

  )
}

function App() {
  const API = 'https://pokeapi.co/api/v2/pokemon/'
  const [inputValue, setInputValue] = useState('')
  const [pokemon, setPokemon] = useState(null)
  
  const fetchPokemon = async (name) => {


    try {
      const getPokemon = await axios.get(API + name.trim())
      const { data: { forms } } = getPokemon
      const { data: { sprites: { other: { dream_world: { front_default } } } } } = getPokemon
      const pokemonFeatures = {
        name: forms[0].name,
        image: front_default
      }

      getPokemon.data ? setPokemon(pokemonFeatures) : null
      
    } catch (error) {
      setPokemon(null)
    }
    
  }

  
  
  useEffect(() => {
    fetchPokemon(inputValue)
  }, [inputValue])
  return (
    <>
      <main >
        <form>
          <h1>Search your favorite pokémon.</h1>
          <input id='input-pokemon' className='searchInput' type='text' placeholder='Type your pokemon' onChange={(e) => setInputValue(e.target.value.toLowerCase())} value={inputValue} ></input>
          <div > {!pokemon ? <h2>{inputValue ? 'Loading...' : ''}</h2> : <Card name={pokemon.name} imgSource={pokemon.image} />} </div>
        </form>
      </main>
    </>
  )
};

export default App;
