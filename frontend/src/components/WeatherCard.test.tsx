import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WeatherCard from "./WeatherCard";

const mockData = {
  city: "London",
  temperature: 22,
  windSpeed: 10,
  time: "2026-06-18T10:00",
};

describe("WeatherCard", () => {
  it("renders weather data correctly", () => {
    render(<WeatherCard data={mockData} onAdd={() => {}} />);

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 22°C")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed: 10 km/h")).toBeInTheDocument();
    expect(screen.getByText("Time: 2026-06-18T10:00")).toBeInTheDocument();
  });

  it("calls onAdd when button is clicked", () => {
    const onAdd = vi.fn();

    render(<WeatherCard data={mockData} onAdd={onAdd} />);

    fireEvent.click(screen.getByText("➕ Add to Database"));

    expect(onAdd).toHaveBeenCalledWith(mockData);
  });
});