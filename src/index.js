import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import WeatherApp from "./components/WeatherApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);


