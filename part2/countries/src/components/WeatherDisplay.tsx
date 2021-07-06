import { useState, useEffect } from "react";
import axios from "axios";

interface IWeatherDisplayProps {
  countryName: string;
}

interface IWeatherData {
  temperature: number;
  weather_icons: string;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
}

const WeatherDisplay = ({ countryName }: IWeatherDisplayProps) => {
  const [weather, setWeather] = useState<IWeatherData>();
  useEffect(() => {
    let mounted = true;
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: countryName,
        },
      })
      .then((response) => {
        if (mounted) setWeather(response.data.current);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      mounted = false;
    };
  }, [countryName]);
  if (weather !== undefined) {
    return (
      <div>
        <h3>Weather</h3>
        <p>
          <b>temperature:</b> {weather.temperature} Celcius
        </p>
        <img
          src={weather.weather_icons}
          alt="Weather icon not found"
          width="40"
        ></img>
        <p>
          {weather.wind_speed} mph direction {weather.wind_dir}
        </p>
      </div>
    );
  }
  return (
    <div>
      <h3>Weather</h3>
      <p>Loading...</p>
    </div>
  );
};

export default WeatherDisplay;
