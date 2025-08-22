import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";

const API_KEY = "d8673ae537ecc5cc2fe61f794bfe3ef6";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) throw new Error(data.message);

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <header>
        <h1>🌤 AeroWeather</h1>
      </header>

      <form onSubmit={handleSubmit} id="weather-form">
        <input
          type="text"
          id="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p className="loading">⏳ Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div id="weather-display">
          <div id="weather-container">
            <WeatherDisplay weather={weather} />
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2025 AeroWeather. All rights reserved.</p>
      </footer>
    </div>
  );
}

