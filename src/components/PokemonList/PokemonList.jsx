import { useEffect, useState } from "react";
import './PokemonList.css';
import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const  [pokemonList, setPokemonList] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL);
        const pokemonResults = response.data.results;
        console.log( response.data);
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const pokemonListResult = pokemonData.map((pokeData) =>{
            const pokemon = pokeData.data;
            return{
                id:pokemon.id,
                name:pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites,
                types : pokemon.types
            }
        });
        console.log(pokemonListResult);
        setPokemonList(pokemonListResult);
        setIsLoading(false);
    }
    useEffect(() => {
        downloadPokemons();
    },[]);

    

    return (           
        <div className="pokemon-list-wrapper">
           Pokemon List
           <div>
           {(isLoading) ? 'Loading...' :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
           }
           </div>
           
        </div>                    
)

}

export default PokemonList;