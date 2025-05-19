import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Pokemon from './Pages/Pokemon'
import './App.css'
import Navigation from './Components/Navigation'
import Details from './Pages/Details'


function App() {

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  
  return (

      <Router>
      <Navigation searchText={searchText} onSearchChange={handleSearchChange}/>
      <Routes>
        <Route path="/" element={<Pokemon searchText={searchText}/>} />
        <Route path="/pokemon/:id" element={<Details />} />
      </Routes>
    </Router>   

  );
}

export default App
