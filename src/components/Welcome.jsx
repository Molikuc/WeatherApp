import React from "react";

function Welcome() {
  return (
    <section className="welcome">
      <div>
        <h3>Weather App</h3>
        <p>
          You can search for your city or any city in the world <br /> This App
          use the{" "}
          <a href="https://openweathermap.org/" target="_blank">
            OpenWeather API
          </a>{" "}
          thanks to them
        </p>
      </div>
    </section>
  );
}

export default Welcome;
