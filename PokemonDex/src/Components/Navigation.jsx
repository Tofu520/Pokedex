import {AppBar,Toolbar, Typography, IconButton,TextField} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import {Link} from 'react-router-dom';
import pokeball from '../assets/pokeball.png';



const Header = styled(AppBar)({
    backgroundColor: '#f21811',  
    boxShadow: 'none',   
  });

const Title = styled(Typography)({
    fontWeight: 'bold',
    color: 'white',
    fontSize: '48px',
    marginRight:"40px"
  });

const SearchBox = styled(TextField)(
    {
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: 'none',
        border: 'none',
        width: '600px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', 
            },
          }
    }
);
  

function Navigation({ searchText, onSearchChange }) {
    const location = useLocation();
    const showSearchBox = location.pathname === '/';
    return(
        <Header position = "fixed" vairant = "h6">
            <Toolbar>
                <Link to = "/" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ 
                    marginLeft:"-20px",
                    '&:focus': {
                outline: 'none',
                boxShadow: 'none'
              },
              '&:hover': {
                backgroundColor: 'transparent', 
              },
                }}>
                    <img src = {pokeball}
                    style = {{
                        width: '60px',
                        height: 'auto',
                    }}
                    ></img>
                </IconButton>
                
                <Title>
                    Pok&#233;dex
                </Title>
                </Link>
                {showSearchBox && <SearchBox value  = {searchText} onChange={onSearchChange} placeholder = "Search for a Pokemon!"></SearchBox>}
                
            </Toolbar>
        </Header>
    );
    }
    
export default Navigation