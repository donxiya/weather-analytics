import { Router } from "express";
import { getWeatherByCity, saveWeather } from "../services/weather.service";
import type { WeatherReading } from "../types/weather";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const city = String(req.query.city || "");
    const result = await getWeatherByCity(city);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    const reading: WeatherReading = req.body;

    await saveWeather(reading);

    res.status(201).json({
      message: "Weather saved successfully",
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;