import { styled } from "@mui/material/styles";
import {Card,CardMedia,Typography} from '@mui/material'
import {Link} from 'react-router-dom';

function PokemonCard(props){
    const pokemon = props.pokemon;
    const name = pokemon.name;
    const url = pokemon.url;
    const pokemonId = url.split("/")[6];
    
    const imageURL =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    const CardContainer = styled(Card)({
        border:'none',
        width:150,
        height:200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
        borderRadius: '8px',  
        backgroundColor: "#5fc0f5",
    })

    const PokemonContent = styled(CardMedia) ({
        width:150,
        height:150,
        objectFit: 'contain',
    });

    const PokemonText = styled(Typography) ({
    textAlign: 'center',
    fontSize:'18px',
    paddingTop: '20px',
    whiteSpace: 'nowrap',  
    textOverflow:'hidden',
    });

  return (
        <Link to = {`/pokemon/${pokemonId}`}>
        <CardContainer> 
            <PokemonText >{name.toUpperCase()}</PokemonText>
            <PokemonContent image = {imageURL}></PokemonContent>
        </CardContainer>
        </Link>
  );
}


export default PokemonCard