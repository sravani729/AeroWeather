import React from "react";

export default function WeatherDisplay({ weather }) {
  if (!weather) return null;

  const tempK = weather.main?.temp ?? "N/A";
  const tempC = tempK !== "N/A" ? (tempK - 273.15).toFixed(2) : "N/A";
  const feelsC =
    weather.main?.feels_like !== undefined
      ? (weather.main.feels_like - 273.15).toFixed(2)
      : "N/A";
  const description = weather.weather?.[0]?.description ?? "N/A";
  const humidity = weather.main?.humidity ?? "N/A";
  const pressure = weather.main?.pressure ?? "N/A";
  const windSpeed = weather.wind?.speed ?? "N/A";
  const windDeg = weather.wind?.deg ?? "N/A";
  const visibility =
    weather.visibility !== undefined ? weather.visibility / 1000 + " km" : "N/A";

  const timezoneOffset = weather.timezone ?? 0;
  const sunrise = weather.sys?.sunrise
    ? new Date(weather.sys.sunrise * 1000 + timezoneOffset * 1000)
    : "N/A";
  const sunset = weather.sys?.sunset
    ? new Date(weather.sys.sunset * 1000 + timezoneOffset * 1000)
    : "N/A";

  const formatTime = (date) =>
    date !== "N/A" ? date.toUTCString().split(" ")[4] : "N/A";

  return (
    <>
      <p>🌡 Temperature: {tempC}°C</p>
      <p>🤔 Feels Like: {feelsC}°C</p>
      <p>☁️ Description: {description}</p>
      <p>💧 Humidity: {humidity}%</p>
      <p>⏱ Pressure: {pressure} hPa</p>
      <p>💨 Wind Speed: {windSpeed} m/s</p>
      <p>🧭 Wind Direction: {windDeg}°</p>
      <p>👁 Visibility: {visibility}</p>
      <p>🌅 Sunrise: {formatTime(sunrise)}</p>
      <p>🌇 Sunset: {formatTime(sunset)}</p>
    </>
  );
}
