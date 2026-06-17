import { useState } from "react";
import CityInput from "./components/CityInput";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/weatherApi";
import type { WeatherResponse } from "./types/weather";

export default function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: string) => {
    if (!city) return;

    setLoading(true);

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Weather Analytics</h1>

      <CityInput onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}