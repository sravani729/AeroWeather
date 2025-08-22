import { useState } from "react";

const API_KEY = "d8673ae537ecc5cc2fe61f794bfe3ef6";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setWeather({
        main: { temp: "N/A", feels_like: "N/A", humidity: "N/A", pressure: "N/A" },
        weather: [{ description: "City name is required" }],
        wind: { speed: "N/A", deg: "N/A" },
        visibility: "N/A",
        sys: { sunrise: null, sunset: null },
        timezone: 0,
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) throw new Error(data.message || "Unable to fetch data");

      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}
