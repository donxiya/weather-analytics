import { Router } from "express";
import { getWeatherByCity, saveWeather } from "../services/weather.service";
import type { WeatherReading } from "../types/weather";
import { getSavedWeather } from "../services/weather.service";
import { getWeatherAnalytics } from "../services/weather.service";
import { weatherQueue } from "../queue/weatherQueue";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const city = String(req.query.city);
    const result = await getWeatherByCity(city);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    console.log("[ROUTE] queueing weather save job");
    console.log("[ROUTE] body:", req.body);

    const reading: WeatherReading = req.body;

    await weatherQueue.add("save-weather", {
      city: reading.city,
      temperature: reading.temperature,
      windSpeed: reading.windSpeed,
      time: reading.time,
    });

    console.log("[ROUTE] job added to queue");

    res.status(202).json({
      message: "Weather save queued successfully",
    });
  } catch (err: any) {
    console.error(err);

    res.status(400).json({
      error: err?.message,
    });
  }
});

router.get("/saved", async (req, res) => {
  try {
    console.log("[ROUTE] hit /weather/saved");
    const data = await getSavedWeather();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/analytics", async (req, res) => {
  try {
    console.log("[ROUTE] hit /weather/analytics");
    const result = await getWeatherAnalytics();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }  

});

export default router;