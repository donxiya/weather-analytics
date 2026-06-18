import type { WeatherResponse } from "../types/weather";

type Props = {
  data: WeatherResponse;
  onAdd: (data: WeatherResponse) => void;
};

export default function WeatherCard({ data, onAdd }: Props) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 12,
        border: "1px solid #ccc",
        borderRadius: 8,
        maxWidth: 300,
      }}
    >
      <h2>{data.city}</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Wind Speed: {data.windSpeed} km/h</p>
      <p>Time: {data.time}</p>

      <button
        onClick={() => onAdd(data)}
        style={{
          marginTop: 10,
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        ➕ Add to Database
      </button>
    </div>
  );
}