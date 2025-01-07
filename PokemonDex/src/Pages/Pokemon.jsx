import {Box, Grid2} from '@mui/material';
import React, {useState,useEffect} from "react";
import PokemonCard from './PokemonCard.jsx'

const ALL_POKEMON = 1025;

const URL = `https://pokeapi.co/api/v2/pokemon?limit=${ALL_POKEMON}`
function Pokemon({searchText}){
    const[allPokemon,setAllPokemon] = useState([]);
    const [searchPokemon, setSearchPokemon] = useState([]);
  useEffect(() => {
    fetch(URL)
    .then(response =>{
        if(!response.ok){
            throw new Error();
        }
        return response.json()
    })
    .then(data => setAllPokemon(data.results))
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (searchText){
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchPokemon(filtered);
    }
    else{
      setSearchPokemon([]);
    }
  }, [searchText]);

  const displayedPokemon = searchPokemon.length > 0 ? searchPokemon : allPokemon;
  
  
  
return(
   <Box sx ={{width:'100vw',minHeight: '100vh',}}>
   <Grid2 container spacing={2}  sx={{direction:'row',justifyContent: 'center', alignItems: 'center', }}>
    {displayedPokemon.map((pokemon) => (
      <Grid2 xs={12} sm={6} md={4} lg={3} key={pokemon.url.split('/')[6]}> 
        <PokemonCard pokemon={pokemon}/>
      </Grid2> //Pokemon Cards as Grid Items
  ))}
    </Grid2>
   </Box>
);

}

export default Pokemon
