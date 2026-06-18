import { describe, it, expect, vi, beforeEach } from "vitest";

// mock pg pool
vi.mock("../../src/db/pool", () => ({
  pool: {
    query: vi.fn(),
  },
}));

import { pool } from "../../src/db/pool";
import { insertWeather } from "../../src/repo/weatherRepo";

const mockQuery = vi.mocked(pool.query);

describe("weatherRepo (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls DB with correct SQL and values", async () => {
    mockQuery.mockResolvedValue({ rowCount: 1 } as any);

    await insertWeather({
      city: "london",
      temperature: 20,
      windSpeed: 5,
      time: new Date("2026-06-18T10:00"),
    });

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO weather_readings"),
      ["london", 20, 5]
    );
  });

  it("throws when DB fails", async () => {
    mockQuery.mockRejectedValue(new Error("DB error"));

    await expect(
      insertWeather({
        city: "london",
        temperature: 20,
        windSpeed: 5,
        time: new Date("2026-06-18T10:00"),
      })
    ).rejects.toThrow("DB error");
  });
});