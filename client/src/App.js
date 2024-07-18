import {useState, useEffect} from 'react'
import './App.css';


import axios from 'axios';
import FilterCities from './Components/CitySearchInput/filter-cities';

function App() {

  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  

  useEffect(() => {
    const fetchCity = async () =>{
      await axios.get(`http://localhost:5000/city/${query}`).then(
        (res) => {

          if(res.data){
            setCity(res.data);
          }
              
        }
      ).catch(err => {
        console.log(err);
      }); 
    };
    
    fetchCity();
  },[city, query]);



  const cities = city? city.map((object) => <li key={object.latitude}>{object.name}, {object.state}, {object.latitude}, {object.longitude}</li>): "";
  
  return (
    <>
    {/* For testing */}
    <div className="App">
          {city? <ul> 
            {cities}
            </ul>  : "Loading"}
    </div>
    

    {/* Filter cities, only render if props are loaded*/}
    { <FilterCities /> }
    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
    </>
  
  );
}

export default App;
