import { useEffect, useState } from "react";
import WeatherTable from "./WeatherGrid";
import WeatherAnalytics from "./WeatherAnalytics";
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

  if (loading) return <p>Loading saved weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={load}>Refresh</button>

      <WeatherAnalytics />
      <WeatherTable data={data} />
    </div>
  );
}