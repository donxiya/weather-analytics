import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

export default function CityInput({ onSearch }: Props) {
  const [city, setCity] = useState("");

  return (
    <div>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city (e.g. london)"
      />

      <button onClick={() => onSearch(city)}>
        Get Weather
      </button>
    </div>
  );
}