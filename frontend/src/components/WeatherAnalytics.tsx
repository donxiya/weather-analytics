import { useEffect, useState } from "react";
import { getWeatherAnalytics} from "../services/weatherApi";
import type { WeatherAnalytics } from "../types/weather";

export default function WeatherAnalytics() {
  const [data, setData] = useState<WeatherAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError(null);

      const result = await getWeatherAnalytics();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!data) return null;

  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        border: "1px solid #ccc",
        borderRadius: 8,
        maxWidth: 300,
      }}
    >
      <h2>Weather Analytics</h2>

      <p>Records: {data.count}</p>
      <p>Avg Temperature: {data.avgTemp.toFixed(2)}°C</p>
      <p>Avg Wind Speed: {data.avgWind.toFixed(2)} km/h</p>

      <button onClick={loadAnalytics} style={{ marginTop: 10 }}>
        Refresh
      </button>
    </div>
  );
}