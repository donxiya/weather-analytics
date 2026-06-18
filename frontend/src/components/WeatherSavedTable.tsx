import { useEffect, useState } from "react";
import WeatherTable from "./WeatherGrid";
import type { WeatherResponse } from "../types/weather";
import { getSavedWeather } from "../services/weatherApi";

export default function WeatherSavedTable() {
  const [data, setData] = useState<WeatherResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const result = await getSavedWeather();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const avgTemp =
    data.length > 0
      ? data.reduce((sum, d) => sum + d.temperature, 0) / data.length
      : 0;

  const avgWind =
    data.length > 0
      ? data.reduce((sum, d) => sum + d.windSpeed, 0) / data.length
      : 0;

  if (loading) return <p>Loading saved weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={load}>Refresh</button>

      <div style={{ margin: "10px 0", padding: 10, border: "1px solid #ddd" }}>
        <h3>Dataset Summary</h3>
        <p> Records: {data.length}</p>
        <p> Avg Temperature: {avgTemp.toFixed(2)}°C</p>
        <p> Avg Wind Speed: {avgWind.toFixed(2)} km/h</p>
      </div>

      <WeatherTable data={data} />
    </div>
  );
}