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
    console.log("[ROUTE] hit /weather/save");
    console.log("[ROUTE] raw body:", req.body);

    const reading: WeatherReading = req.body;

    console.log("[ROUTE] parsed reading:", reading);

    await saveWeather(reading);

    console.log("[ROUTE] saveWeather completed");

    res.status(201).json({
      message: "Weather saved successfully",
    });
  } catch (err: any) {
    console.error("❌ FULL ERROR OBJECT:");
    console.error(err);
    console.error("❌ ERROR STACK:");
    console.error(err?.stack);

    res.status(400).json({
      error: err?.message,
      raw: err,
    });
  }
});

export default router;