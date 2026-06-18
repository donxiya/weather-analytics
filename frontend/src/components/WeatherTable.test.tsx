import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WeatherTable from "./WeatherGrid";

const mockData = [
  {
    city: "Zurich",
    temperature: 10,
    windSpeed: 5,
    time: "2026-06-18T10:00",
  },
  {
    city: "London",
    temperature: 22,
    windSpeed: 12,
    time: "2026-06-18T11:00",
  },
  {
    city: "Amsterdam",
    temperature: 18,
    windSpeed: 8,
    time: "2026-06-18T09:00",
  },
];

const mockData_set2 = [
  {
    city: "B",
    temperature: 20,
    windSpeed: 5,
    time: "2026-06-18T10:00",
  },
  {
    city: "A",
    temperature: 30,
    windSpeed: 10,
    time: "2026-06-18T11:00",
  },
];

const equalData = [
  { city: "A", temperature: 20, windSpeed: 5, time: "2026" },
  { city: "A", temperature: 30, windSpeed: 10, time: "2026" },
];

describe("WeatherTable", () => {
    it("renders all rows", () => {
        render(<WeatherTable data={mockData} />);

        expect(screen.getByText("London")).toBeInTheDocument();
        expect(screen.getByText("Zurich")).toBeInTheDocument();
        expect(screen.getByText("Amsterdam")).toBeInTheDocument();
    });

    it("sorts by city ascending by default", () => {
        render(<WeatherTable data={mockData} />);

        const rows = screen.getAllByRole("row");

        // skip header row (index 0)
        expect(rows[1]).toHaveTextContent("Amsterdam");
        expect(rows[2]).toHaveTextContent("London");
        expect(rows[3]).toHaveTextContent("Zurich");
    });

    it("toggles sort order when clicking city header", () => {
        render(<WeatherTable data={mockData} />);

        fireEvent.click(screen.getByText("City"));

        const rows = screen.getAllByRole("row");

        // now DESC order
        expect(rows[1]).toHaveTextContent("Zurich");
        expect(rows[3]).toHaveTextContent("Amsterdam");
    });

    it("sorts city ascending (A before B)", () => {
        render(<WeatherTable data={mockData_set2} />);

        const rows = screen.getAllByRole("row");

        expect(rows[1]).toHaveTextContent("A");
        expect(rows[2]).toHaveTextContent("B");
        });

        it("sorts city descending after click", () => {
        render(<WeatherTable data={mockData_set2} />);

        fireEvent.click(screen.getByText("City"));

        const rows = screen.getAllByRole("row");

        expect(rows[1]).toHaveTextContent("B");
        expect(rows[2]).toHaveTextContent("A");
        });

        it("handles equal values (returns 0 branch)", () => {
        render(<WeatherTable data={equalData} />);

        const rows = screen.getAllByRole("row");

        // order should remain stable (no swap)
        expect(rows[1]).toHaveTextContent("A");
        expect(rows[2]).toHaveTextContent("A");
        });

        it("resets sort order to asc when changing sort column", () => {
        render(<WeatherTable data={mockData} />);

        // Step 1: set initial sort state
        fireEvent.click(screen.getByText("City"));

        // Step 2: switch to temperature
        fireEvent.click(screen.getByText("Temperature"));

        const rows = screen.getAllByRole("row");

        const cities = rows.slice(1).map(r => r.textContent);

        expect(cities[0]).toContain("Zurich");
        expect(cities[1]).toContain("Amsterdam");
        expect(cities[2]).toContain("London");
        });

        it("sorts by windSpeed ascending", () => {
        render(<WeatherTable data={mockData_set2} />);

        fireEvent.click(screen.getByText("Wind Speed"));

        const rows = screen.getAllByRole("row");
        const cities = rows.slice(1).map(r => r.textContent);

        expect(cities[0]).toContain("B"); // 10 km/h
        expect(cities[1]).toContain("A"); // 30 km/h
        });
        it("sorts by time ascending", () => {
            render(<WeatherTable data={mockData_set2} />);

            fireEvent.click(screen.getByText("Time"));

            const rows = screen.getAllByRole("row");
            const cities = rows.slice(1).map(r => r.textContent);

            expect(cities[0]).toContain("B"); 
            expect(cities[1]).toContain("A"); 
            });
});