import React, { useState, useEffect } from "react";
import './City.css'
import Weather from '../WeatherDashboard/weather';
import axios from 'axios';
// Filter cities
  const FilterCities = () => {

  const [value, setValue] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  // const saveCityToServer = async () =>{
  //   await axios.get(`http://localhost:5000/city/save/${value}`).then(
  //     (res) => {
  //       if(res.data){
  //         console.log('Saved OK');
  //       }
  //     }
  //   ).catch(err => {
  //     console.log(err);
  //   }); 
  // };

  const getLatLong = (item) => {
    setLat(item.latitude);
    setLong(item.longitude);
    console.log(lat,long);
    setValue(item.name);
    // saveCityToServer(); 
  }

  // component received  
  const [originalArray, setArray] = useState("");

  useEffect(() => {

    const fetchCityOnChange = async () =>{
    
      await axios.get(`http://localhost:5000/city/${value}`).then(
          (res,err) => {
  
            if(!err){
              setArray(res.data); 
            }

          }
        ).catch(thrown => {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled:', thrown.message);
          } else {
            console.error('Error fetching suggestions:', thrown);
          }
        }); 
    };
    
    fetchCityOnChange();
  },[value]);


  const handleinputChange = (e) => {
    setValue(e.target.value);
  };


  return (
    <>
      <div className="citySearch">
        {/* Enter city name */}
          <input
            type="text"
            value={value}
            placeholder="Enter name of the city"
            onChange={ (e) => handleinputChange(e)}
          />
        
          { <div className="dropDown">
            {/* Suggestions */}
            {originalArray && originalArray.filter(item =>{
                const searchTerm = value.toLowerCase();
                const cityName = item.name.toLowerCase();

                return searchTerm && cityName.startsWith(searchTerm);

              }).map(item => (<li onClick={() => getLatLong(item)} id="citySuggested" >{item.name}, {item.state}, {item.latitude}, {item.longitude}</li>))}
          </div>}
      </div>

       {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DISPLAY WEATHER */}
       { <Weather lat={lat} long={long} />}
       
    </>
  );
};


export default FilterCities;
