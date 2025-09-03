import axios from "axios";
import React, { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const API_KEY = "dcdaf3e11e2ff34b64d61385616248d5";

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeather(response);
      console.log(response);
    } catch (error) {
      console.log("Error during fetching data", error);
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  // Helper: choose weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny className="weather-icon sunny" />;
      case "Clouds":
        return <WiCloud className="weather-icon cloudy" />;
      case "Rain":
        return <WiRain className="weather-icon rainy" />;
      case "Snow":
        return <WiSnow className="weather-icon snowy" />;
      case "Fog":
      case "Mist":
        return <WiFog className="weather-icon foggy" />;
      default:
        return <WiDaySunny className="weather-icon default" />;
    }
  };

  return (<>
  
    <div className="weather-container">
      <h2 className="weather-title">🌍 Weather Finder</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={handleCityChange}
          className="input-box"
        />
        <button onClick={handleClick} className="search-btn">
          <FaSearchLocation /> Search
        </button>
      </div>

      {weather && (
        <div className="weather-card">
          {getWeatherIcon(weather.data.weather[0].main)}
          <h3 className="city-name">{weather.data.name}</h3>
          <p className="temp">{Math.round(weather.data.main.temp)}°C</p>
          <p className="condition">{weather.data.weather[0].main}</p>
          <p className="description">{weather.data.weather[0].description}</p>
        </div>
      )}
    </div>
  </>
  );
};

export default Weather;
