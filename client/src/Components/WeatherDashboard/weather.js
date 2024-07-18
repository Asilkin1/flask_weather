import { useState, useEffect } from 'react'
import './Weather.css';
import axios from 'axios';

// Weather component
function Weather({ lat, long }) {
    const [temperature, setTemperature] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wind, setWind] = useState("");
    const [time, setTime] = useState("");
    const [currentCondition, setCurrent] = useState("");

    // need to use once
    useEffect(() => {

        // need to move this away from this component
        const fetchWeather = async () => {

            await axios.get(`http://localhost:5000/city/${lat}/${long}`).then(
                (res) => {

                    if(res.data){
                        setTemperature(res.data["hourly"]["temperature_2m"]);
                        setTime(res.data["hourly"]["time"]);
                        setWind(res.data["hourly"]["wind_speed_10m"]);
                        setHumidity(res.data["hourly"]["relative_humidity_2m"]);
    
                        // Set current values
                        setCurrent(res.data['current'])
                    }
                  
                }
            ).catch(err => {
                console.log(err);
            });
        };
        
            fetchWeather();
        
        
    }, [lat,long]);

    //new Date(t).getHours() + ":" + new Date(t).getMinutes()
    const arrayTemperature = temperature ? temperature.map((t) => <li key={temperature.indexOf(t)} style={t > 25 ? { color: 'red', font: 'bold' } : { color: 'green' }}>{t}</li>) : "";
    const arrayWind = wind ? wind.map((w) => <li style={w > 10 ? { color: 'red', font: 'bold' } : { color: 'green' }}>{w}</li>) : "";
    const arrayHumidity = humidity ? humidity.map((h) => <li style={h > 70 ? { color: 'red', font: 'bold' } : { color: 'green' }}>{h}</li>) : "";

    const arrayTime = time ? time.map((t) => <li>{new Date(t).toLocaleDateString('en-us', {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })}</li>) : "";

    return (
        <>

            <div className="weather-container">
                <h3>Current condition:</h3>
                <div className="weather-item temperature"><h1>Temperature: {currentCondition["temperature_2m"]}</h1></div>
                <div className="weather-item day">
                    <h1> Day:
                        {new Date(currentCondition["time"]).toLocaleDateString('en-us', {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric"
                        })
                        }
                    </h1>
                </div>
                <div className="weather-item wind-speed">  <h1>Wind Speed: {currentCondition["wind_speed_10m"]}</h1></div>
               


            </div>





            {/* <div className="weather">
                <div className="row">
                <h2>Time:</h2>
                    {arrayTime ? <ul>
                        {arrayTime}
                    </ul> : "Loading Time"}
                </div>
                
                <div className="row">
                <h2>Temp(Celcius):</h2>
                {arrayTemperature ? <ul>
                    {arrayTemperature}
                </ul> : "Loading Temperature"}  </div>
                
                <div className="row">
                <h2>Wind(km/h):</h2>
                    {arrayWind ? <ul>
                    {arrayWind}
                </ul> : "Loading Temperature"}  </div>

                
                <div className="row">
                <h2>Humidity(%):</h2>
                    {arrayHumidity ? <ul>
                    {arrayHumidity}
                </ul> : "Loading Temperature"}  </div>


            </div> */}
        </>

    );
}

export default Weather;
