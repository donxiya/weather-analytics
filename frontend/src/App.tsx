import { useState } from "react";
import CityInput from "./components/CityInput";
import WeatherCard from "./components/WeatherCard";
import WeatherSavedTable from "./components/WeatherSavedTable";
import { getWeather, saveWeather } from "./services/weatherApi";
import type { WeatherResponse } from "./types/weather";

export default function App() {
  const [weatherList, setWeatherList] = useState<WeatherResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (city: string) => {
    if (!city) return;

    setLoading(true);

    try {
      const data = await getWeather(city);

      setWeatherList((prev) => {
        const filtered = prev.filter((w) => w.city !== data.city);
        return [...filtered, data];
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleSave = async (data: WeatherResponse) => {
    try {
      await saveWeather(data);
      alert(`Saved ${data.city} to database`);
    } catch (err) {
      console.error(err);
      alert("Failed to save weather");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Weather Analytics</h1>

      <CityInput onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {weatherList.map((weather) => (
          <WeatherCard
            key={weather.city}
            data={weather}
            onAdd={handleSave}
          />
        ))}
      </div>

      {/* ✅ NEW: DB-backed saved data table */}
      <hr style={{ margin: "30px 0" }} />

      <h2>Saved Weather (Database)</h2>

      <WeatherSavedTable />
    </div>
  );
}

