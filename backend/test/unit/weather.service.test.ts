import { describe, it, expect, vi, beforeEach } from "vitest";

/* ---------------- MOCKS ---------------- */

vi.mock("../../src/utils/cityMap", () => ({
  CITY_COORDS: {
    london: { lat: 51.5072, lon: -0.1276 },
  },
}));

vi.mock("../../src/clients/openmeteo.client", () => ({
  fetchWeather: vi.fn(),
}));

vi.mock("../../src/repo/weatherRepo", () => ({
  insertWeather: vi.fn(),
}));

/* ---------------- IMPORTS (IMPORTANT) ---------------- */

import * as weatherClient from "../../src/clients/openmeteo.client";
import * as weatherRepo from "../../src/repo/weatherRepo";
import { getWeatherByCity, saveWeather } from "../../src/services/weather.service";

const fetchWeather = weatherClient.fetchWeather as unknown as ReturnType<typeof vi.fn>;
const insertWeather = weatherRepo.insertWeather as unknown as ReturnType<typeof vi.fn>;

describe("weatherService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns mapped weather data for valid city", async () => {
        fetchWeather.mockResolvedValue({
        current: {
            temperature_2m: 22,
            wind_speed_10m: 10,
            time: "2026-06-17T10:00",
        },
        });

        const result = await getWeatherByCity("London");

        expect(result).toEqual({
        city: "london",
        temperature: 22,
        windSpeed: 10,
        time: "2026-06-17T10:00",
        });

    expect(fetchWeather).toHaveBeenCalledWith(51.5072, -0.1276);
  });

    it("throws error when city is not supported", async () => {
        await expect(getWeatherByCity("MarsCity")).rejects.toThrow(
            "City not supported"
        );
        });

    it("throws error when reading is undefined", async () => {
        await expect(saveWeather(undefined as any)).rejects.toThrow(
            "reading is undefined"
        );
        });
    it("throws error when city is not a string", async () => {
    await expect(getWeatherByCity(123 as any)).rejects.toThrow(
        "City must be a string"
    );
    });

    it("throws error when city is empty after trim", async () => {
    await expect(getWeatherByCity("NOWHERE")).rejects.toThrow(
        "City not supported"
    );
    });

    it("inserts weather into DB", async () => {
        const reading = {
        city: " london ",
        temperature: 20,
        windSpeed: 5,
        time: "2026-06-17T10:00",
        };

        await saveWeather(reading as any);

        expect(insertWeather).toHaveBeenCalled();
    });
});