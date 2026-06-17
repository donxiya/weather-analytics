import { Router } from "express";
import { getWeatherByCity } from "../services/weather.service";

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

export default router;