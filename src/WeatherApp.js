import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ ready: false });
  const [unit, setUnit] = useState("celsius");

  function displayWeather(response) {
    setWeather({
      ready: true,
      city: response.data.city,
      temperature: response.data.temperature.current,
      date: "Thursday 15:54",
      humidity: response.data.temperature.humidity,
      description: response.data.condition.description,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon_url,
    });
  }

  function weatherSearch(event) {
    event.preventDefault();

    let apiKey = "3dfefaofbc33edd4c68fae7t3005c4aa";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  function searchCity(clickedCity) {
    let apiKey = "3dfefaofbc33edd4c68fae7t3005c4aa";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${clickedCity}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
  }

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  return (
    <div className="App">
      <h1 className="main-title">Weather Forecast App</h1>

      <div className="WeatherContainer">
        <ul className="city-links">
          <li onClick={() => searchCity("Lisbon")}>Lisbon</li>
          <li onClick={() => searchCity("Paris")}>Paris</li>
          <li onClick={() => searchCity("Sydney")}>Sydney</li>
          <li onClick={() => searchCity("San Francisco")}>San Francisco</li>
        </ul>

        <form onSubmit={weatherSearch} className="search-form">
          <input
            type="search"
            placeholder="Enter a city.."
            className="search-input"
            onChange={updateCity}
          />
          <input type="submit" value="Search" className="search-button" />
          <button type="button" className="current-button">
            Current
          </button>
        </form>

        {weather.ready && (
          <div className="WeatherDetails">
            <div className="Overview">
              <h1>{weather.city}</h1>

              <ul>
                <li>{weather.date}</li>
                <li className="description">{weather.description}</li>
              </ul>
            </div>

            <div className="row">
              <div className="col-6 main-temp-container">
                <img src={weather.icon} alt={weather.description} />
                <span className="temperature">
                  {unit === "celsius"
                    ? Math.round(weather.temperature)
                    : Math.round((weather.temperature * 9) / 5 + 32)}
                </span>
                <span className="unit">
                  <a
                    href="/"
                    onClick={showCelsius}
                    className={unit === "celsius" ? "active" : ""}
                  >
                    °C
                  </a>{" "}
                  |{" "}
                  <a
                    href="/"
                    onClick={showFahrenheit}
                    className={unit === "fahrenheit" ? "active" : ""}
                  >
                    °F
                  </a>
                </span>
              </div>
              <div className="col-6 extra-info">
                <ul>
                  <li>Humidity: {weather.humidity}%</li>
                  <li>Wind: {Math.round(weather.wind)} km/h</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <footer className="mt-3">
          This project was coded by{" "}
          <a
            href="https://github.com/Sarita368"
            target="_blank"
            rel="noreferrer"
          >
            Sara S
          </a>{" "}
          and is open-sourced on{" "}
          <a
            href="https://github.com/Sarita368/react-weather-app"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://ss-react-weather-app.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}
