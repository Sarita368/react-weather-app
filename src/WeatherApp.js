import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ ready: false });

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

  return (
    <div className="WeatherContainer">
      <ul className="city-links">
        <li>Lisbon</li>
        <li>Paris</li>
        <li>Sydney</li>
        <li>San Francisco</li>
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
                {Math.round(weather.temperature)}
              </span>
              <span className="unit">°C</span>
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
        <a href="https://github.com/Sarita368" target="_blank" rel="noreferrer">
          Sara S
        </a>{" "}
        and is open-sourced on {" "}
        <a
          href="https://github.com/Sarita368/react-weather-app"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        and hosted on{" "}
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
           Netlify
        </a>
      </footer>
    </div>
  );
}

