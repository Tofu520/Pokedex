
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText,Typography,Box ,Button,CircularProgress,LinearProgress} from '@mui/material';
import { styled } from "@mui/material/styles";

function Details(){
    const { id } = useParams();
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const imageURL =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const DESCURL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const [pokemon, setPokemon] = useState(null);
    const [desc,setDesc] = useState("No description was found");
    const [moves,setMoves] = useState([]);
    const [stats,setStats] = useState([]);
    const [abilities,setAbilities] = useState([]);
    const [types,setTypes] = useState([]);
    const [error, setError] = useState(null);
    const[waiting,setWaiting] = useState(true);
    const navigate = useNavigate();

    const StyledPokemonContainer = styled(Box)({
        border: 'none',
        maxWidth: '70vw',  
        maxHeight: '100vh',
        backgroundColor: "#bfdbfeb3",
        position: 'absolute',
        overflow:'auto'
    })

    const ParentContainer = styled(Box)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',        
        width: '100vw',  
        overflow:'auto' 
      });

      const MoveButtons = styled(Button)({
        variant: 'text',
        flex:1, 
        color: 'black',
        '&:focus': {
        outline: 'none',  
        boxShadow: 'none', 
        },
      });

      

      const HeaderBox = styled(Box)({
        textOverflow: 'ellipsis',
         overflow: 'hidden',
         display: 'flex' , gap:2,
         justifyContent: 'center', 
         alignItems: 'center',
      });

      const HeaderText = styled(Typography)({
        textAlign:'center',
        width:350,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis', 
        overflow: 'hidden',
      });

      const StatsBox = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        marginLeft:5,
        width: "100%",
        paddingTop: 15,
      });

      const StatsBar = styled(LinearProgress)(({ value, theme }) => ({
        width: '100%',
        height: 15,
        backgroundColor: 'transparent',
        '& .MuiLinearProgress-bar': {
            backgroundColor: value >= 39 ? 'green' : value < 39 && value >= 25? 'yellow' : 'red',
        },
        }));

        const GridListItems = styled(ListItem)({
            padding: 1,
            maxWidth:'50%',
            flex:'1,1,45%',
        });

    useEffect(() => {
        fetch(URL)
        .then(response =>{
            if(!response.ok){
                throw new Error();
            }
            return response.json()
        })
        .then(data => {setPokemon(data);

            const learntMoves = data.moves;
            

            const levelUpMoves = learntMoves.filter(
                move => {return move.version_group_details.some(version => version.move_learn_method.name==='level-up')}
            );

            
            setMoves(levelUpMoves);
            setStats(data.stats);
            setAbilities(data.abilities);
            setTypes(data.types);
        }
    )
        .catch(error => {console.error(error); setError(error.message); setWaiting(false);});

        fetch(DESCURL)
        .then(response =>{
            if(!response.ok){
                throw new Error("Not found");
            }
            return response.json()
        })
        .then(data => {
            const text = data.flavor_text_entries.findLast(entry => entry.language.name === 'en');
            if(text){
                setDesc(text.flavor_text);
            }
            setWaiting(false);
        }
        )
        .catch(error => {console.error(error); setWaiting(false);});
        
      }, [id]);
      
      const handleNext = () => {
        let nextId = parseInt(id) + 1;
        if(nextId>1025){
            nextId=1;
        }
       
        navigate(`/pokemon/${nextId}`);
        
      };
    
     
      const handlePrevious = () => {
        const prevId = parseInt(id) - 1;
        if(prevId>0){
            navigate(`/pokemon/${prevId}`);
        }
        else{
            alert('No previous Pokémon');
        }
      };

      if(waiting){
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <CircularProgress />
            </Box>
          );
      }

      if(!pokemon || error){
       return (<Box sx = {{display: 'flex' , justifyContent:'center', alignItems: 'center', height: '100vh',
        width: '100vw',}}>
        <Typography variant = "h6">POKEMON DATA NOT FOUND. GO BACK (Click the pokeball)</Typography>
        
        </Box>);
      }

      
      
        return (
            <ParentContainer>
           <StyledPokemonContainer> {/* Contains everything */}
            <HeaderBox > {/* Contains the header (next,previous back to all and name) */}
                <MoveButtons  onClick ={handlePrevious} >Previous</MoveButtons> 
                
                <HeaderText variant = "h3" >{pokemon.name.toUpperCase()}</HeaderText> 
                
                <MoveButtons  onClick={handleNext}>Next</MoveButtons>
            </HeaderBox>
            <Box>     {/* Contains the pokemon sprite, the stats, moves, types, abilities */}

                <Box sx={{width: "100%",height:'auto', display: 'flex',}}> {/* contains Pokemon sprite and stats*/}
                    <img src = {imageURL} style ={{marginLeft:'40px',height:280, width: 'auto',marginTop: '30px',}}  />
                    <StatsBox> {/* Contains the stats */}

                    {stats.map( (val) => (
                        <Box key = {val.stat.name} sx={{ display: 'flex',  mb: 2,pl:4,pt:1}}> {/* Parent element */}

                            <Box sx={{ display: 'flex', width: '40%'}} > {/* Contains the stats text */}
                    
                                <Typography sx={{ display: 'inline-block' }}>{val.stat.name.toUpperCase()}: {val.base_stat} </Typography>  

                            </Box>

                            <Box sx={{ display: 'flex',alignItems: 'center', width: '60%', pr: 2, alignItems: 'center' }}> {/* Contains the stats bars */}
                            <StatsBar variant="determinate" value={(val.base_stat / 255) * 100} />
                            </Box> 

                        </Box>
                    ))}
                    
                    </StatsBox> 
                </Box>
                <Box sx={{width: "100%", height:340,display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',}}> {} {/* Container for moves,traits,abilities, and desc */}
                    <Box sx ={{border: 1 ,overflow: 'auto'}}> 
                    <Typography  variant='h6' sx={{textAlign: 'center', marginBottom: 1, paddingTop:2,}}>MOVES</Typography>
                    <List sx ={{gap:1,display: 'flex', flexDirection: 'row',flexWrap: 'wrap',listStyleType:'none',padding: 1, }}>

                        {
                            moves.map((item, index) => (
                                <GridListItems key={index}>
                                    <ListItemText primary={item.move.name.toUpperCase()}></ListItemText>
                                </GridListItems>
                              ))
                            } 
                        </List>
                    </Box> {/* Contains the moves */}

                    <Box sx= {{border: 1, }}> {/* Contains the types and weights */}
                    <Typography  variant='h6' sx={{textAlign: 'center', marginBottom: 1, paddingTop:2 }}>TYPES</Typography>
                    <List sx ={{display: 'flex', flexDirection: 'row',flexWrap: 'wrap',listStyleType:'none',padding: 1, }}>

                        {
                            types.map((item, index) => (
                                <GridListItems key={index}>
                                    <ListItemText primary={item.type.name.toUpperCase()}></ListItemText>
                                </GridListItems>
                              ))
                            } 
                        </List>
                    </Box> 
                    <Box sx={{border: 1, }}> {/* Contains the abiliies all underneath */}

                    <Typography  variant='h6' sx={{textAlign: 'center', marginBottom: 1, paddingTop:2 }}>ABILITIES</Typography>
                    <List sx ={{gap:1,display: 'flex', flexDirection: 'row',flexWrap: 'wrap',listStyleType:'none',padding: 1, }}>

                        {
                        abilities.map((item, index) => (
                            <GridListItems key={index}>
                                <ListItemText primary={item.ability.name.toUpperCase()}></ListItemText>
                            </GridListItems>
                        ))
                        } 
                    </List>
                    </Box> 
                    <Box  sx={{border: 1 ,pl:2,pr:2,pt:1,overflow:'auto' }}> <Typography  sx={{fontSize: '18px',textOverflow:'ellipsis'}}>{desc}</Typography></Box> {/* Contains the desc */}
                </Box>
                
            </Box>
           </StyledPokemonContainer>
           </ParentContainer>
        );
    
}

export default Details