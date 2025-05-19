import {Box, Grid2} from '@mui/material';
import React, {useState,useEffect} from "react";
import PokemonCard from './PokemonCard.jsx'

function Pokemon({searchText}){
    const[allPokemon,setAllPokemon] = useState([]);
    const [searchPokemon, setSearchPokemon] = useState([]);

    useEffect(() => {
      fetch('/pokemon.json')
        .then((response) => response.json())
        .then((data) => {
          setAllPokemon(data);  // Save all Pokémon data to state
        })
        .catch((error) => console.error('Error fetching Pokémon data:', error));
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
      <Grid2 xs={12} sm={6} md={4} lg={3} key={pokemon.id}> 
        <PokemonCard pokemon={pokemon}/>
      </Grid2> //Pokemon Cards as Grid Items
  ))}
    </Grid2>
   </Box>
);

}

export default Pokemon
