import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/services/weather.service", () => ({
  saveWeather: vi.fn(),
}));

import { saveWeather } from "../../src/services/weather.service";
import weatherRouter from "../../src/routes/weather.routes";

const mockedSaveWeather = vi.mocked(saveWeather);

function getSaveHandler() {
  const layer = (weatherRouter as any).stack.find(
    (l: any) =>
      l.route?.path === "/save" &&
      l.route?.methods?.post
  );

  return layer.route.stack[0].handle;
}

function mockReq(body: any) {
  return { body } as any;
}

function mockRes() {
  const res: any = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res;
}

describe("POST /weather/save (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 201 when saveWeather succeeds", async () => {
    mockedSaveWeather.mockResolvedValue(undefined);

    const handler = getSaveHandler();

    const req = mockReq({
      city: "London",
      temperature: 20,
      windSpeed: 5,
      time: "2026-06-18T10:00",
    });

    const res = mockRes();

    await handler(req, res);

    expect(mockedSaveWeather).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Weather saved successfully",
    });
  });

  it("returns 400 when saveWeather throws", async () => {
    mockedSaveWeather.mockRejectedValue(new Error("DB failed"));

    const handler = getSaveHandler();

    const req = mockReq({
      city: "London",
    });

    const res = mockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "DB failed",
      })
    );
  });
});