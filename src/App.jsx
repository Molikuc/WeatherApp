import React, { useState } from "react";
import axios from "axios";
import { GoSearch } from "react-icons/go";
import {
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherSnow,
  TiWeatherShower,
  TiWeatherNight,
} from "react-icons/ti";
import { TbMist } from "react-icons/tb";

function App() {
  //States to stock the city name and the data from the API

  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
    import.meta.env.VITE_APP_API_KEY
  }`;

  // Fetch Method to call the API and give data to setWeather.

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setWeather(data));
  // }

  // Calling the API and give data to setWeather using Axios

  const fetchCity = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
    }
  };

  const renderSwitch = (info) => {
    switch (info) {
      case "Clouds":
        return <TiWeatherCloudy />;
        break;
      case "Clear":
        return weather.dt > weather.sys.sunrise &&
          weather.dt < weather.sys.sunset ? (
          <TiWeatherSunny />
        ) : (
          <TiWeatherNight />
        );
        break;
      case "Snow":
        return <TiWeatherSnow />;
        break;
      case "Rain":
        return <TiWeatherShower />;
        break;
      case "Mist":
        return <TbMist />;
        break;
      default:
        console.log("No value found");
    }
  };

  return (
    <div
      className="main"
      style={
        weather.weather
          ? weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset
            ? {
                background:
                  "radial-gradient(ellipse at 50% 50%, #44b3f2 0%, #52bcc7 100%)",
              }
            : {
                background:
                  "radial-gradient(ellipse at 50% 50%, #22007c 0%, #140152 100%)",
                color: "white",
              }
          : null
      }>
      <nav className="navbar">
        <div className="nav--search">
          <GoSearch className="input--icon" />
          <input
            className="nav--input"
            type="text"
            placeholder="City"
            onChange={(e) => setCityName(e.target.value)}
            onKeyDown={fetchCity}
          />
        </div>
      </nav>
      <div className="main">
        <h1>{weather.name}</h1>
        <div>
          {weather.main ? (
            <h2 className="main--temp">{Math.round(weather.main.temp)} °C</h2>
          ) : null}
        </div>
        <div className="main--icon">
          {weather.weather ? renderSwitch(weather.weather[0].main) : null}
        </div>
        <div>
          {weather.weather ? (
            <h2>{weather.weather[0].description.toUpperCase()}</h2>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
