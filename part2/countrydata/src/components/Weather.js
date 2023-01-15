import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({country}) => {
    const [weather, setWeather] = useState();
    const API_KEY = process.env.REACT_APP_API_KEY;
    const lat = country.capitalInfo.latlng[0];
    const lng = country.capitalInfo.latlng[1];
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;

    useEffect(() => {
        axios
            .get(weatherURL)
            .then(res => {
                setWeather(res.data);
            });
    }, [weatherURL])

    console.log(weather);

    return (
        <div>
            <h3>Weather in {country.capital[0]}</h3>
            { weather &&
            <>
                <p>temperature {(weather.main.temp -  273.15).toFixed(0)} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`weather-icon`}/>
                <p>wind {weather.wind.speed} m/s</p>
            </>
            }
        </div>
    )
}

export default Weather;
