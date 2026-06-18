import { useState } from "react";
import type { WeatherResponse } from "../types/weather";

type Props = {
  data: WeatherResponse[];
};

type SortKey = "city" | "temperature" | "humidity" | "recordedAt";
type SortOrder = "asc" | "desc";

export default function WeatherTable({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("city");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedData = [...data].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];

    // handle string vs number
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = (valB as string).toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th onClick={() => toggleSort("city")}>City</th>
            <th onClick={() => toggleSort("temperature")}>Temperature</th>
            <th onClick={() => toggleSort("humidity")}>Humidity</th>
            <th onClick={() => toggleSort("recordedAt")}>Time</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item) => (
            <tr key={item.city}>
              <td>{item.city}</td>
              <td>{item.temperature}°C</td>
              <td>{item.humidity} %</td>
              <td>{item.recordedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}