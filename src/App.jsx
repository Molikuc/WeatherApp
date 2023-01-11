import React, { useState } from "react";
import axios from "axios";

function App() {
  //States to stock the city name and the data from the API

  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
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

  return (
    <div>
      <div className="navbar">
        <h1>The Weather App</h1>
        <input
          type="text"
          placeholder="City"
          onChange={(e) => setCityName(e.target.value)}
          onKeyDown={fetchCity}
        />
      </div>
      <div className="main">
        <h1>Here goes the result</h1>
        <h2>{weather.name}</h2>
        <div>{weather.main ? <h2>{weather.main.temp}</h2> : null}</div>
        <div>
          {weather.weather ? <h2>{weather.weather[0].description}</h2> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
