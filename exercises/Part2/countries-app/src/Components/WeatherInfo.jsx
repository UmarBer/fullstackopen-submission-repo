import axios from 'axios';
import { useEffect, useState } from 'react';

const WeatherInfo = ({ city }) => {
  const VITE_OPENWEATHER_API_KEY = process.env.VITE_OPENWEATHER_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${VITE_OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>Temperature {weather.main.temp}ºC</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Wind {weather.wind.speed}</div>
        </div>
      ) : null}
    </>
  );
};

export default WeatherInfo;
