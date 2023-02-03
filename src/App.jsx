import React, { useState } from "react";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";
import { FaThermometerHalf } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import {
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherSnow,
  TiWeatherShower,
  TiWeatherNight,
} from "react-icons/ti";
import { TbMist } from "react-icons/tb";
import Welcome from "./components/Welcome";

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

  const date = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const utcDate = new Date(
      (weather.dt + weather.timezone) * 1000
    ).toUTCString();

    const day =
      weekday[new Date((weather.dt + weather.timezone) * 1000).getUTCDay()];

    const hours = utcDate.slice(16, 22);

    const greetHours = parseInt(hours);

    const greeting =
      greetHours < 12 && greetHours > 6
        ? "Good Morning"
        : greetHours >= 12 && greetHours < 18
        ? "Good Afternoon"
        : greetHours > 18 || greetHours < 6
        ? "Good Night"
        : null;

    return { day, hours, greeting };
  };

  return (
    <div
      className="container"
      style={
        weather.weather
          ? weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset
            ? {
                background: "#E5ECF4",
              }
            : {
                background: "#313745",
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
        {weather.name ? null : <Welcome />}
        <div className="main--location">
          <h1>{weather.name}</h1>
          <h2 className="main--time">
            <div>{weather.name ? date().day : null}</div>
            <div>{weather.name ? date().hours : null}</div>
          </h2>
        </div>
        <div className="main--icon">
          {weather.weather ? renderSwitch(weather.weather[0].main) : null}
        </div>
        <div>
          {weather.main ? (
            <h2 className="main--temp">
              {Math.round(weather.main.temp)}{" "}
              <span className="text-smaller">°C</span>
            </h2>
          ) : null}
        </div>
        <div className="main--greeting">{date().greeting}</div>

        {weather.main ? (
          <div className="main--add">
            <div className="wind">
              <GiWindsock className="main--add_icon" />
              <h4 className="border-right">Wind</h4>
              <div className="border-right">
                {weather.weather ? Math.round(weather.wind.speed) : null} m/s
              </div>
            </div>
            <div className="feels_like ">
              <FaThermometerHalf className="main--add_icon" />
              <h4 className="border-right">Feeling</h4>
              <div className="border-right">
                {weather.weather ? Math.round(weather.main.feels_like) : null}{" "}
                °C
              </div>
            </div>
            <div className="humidity">
              <WiHumidity className="main--add_icon" />
              <h4>Humidity</h4>
              <div>{weather.weather ? weather.main.humidity : null} %</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
