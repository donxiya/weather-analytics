import type { WeatherResponse } from "../types/weather";

type Props = {
  data: WeatherResponse;
};

export default function WeatherCard({ data }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <h2>{data.city}</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Wind Speed: {data.windSpeed} km/h</p>
      <p>Time: {data.time}</p>
    </div>
  );
}