import { Worker } from "bullmq";
import { redis } from "./redis";
import { saveWeather } from "../services/weather.service";
import type { SaveWeatherJob } from "./weatherQueue";
import { log } from "../utils/logger";

export const weatherWorker = new Worker<SaveWeatherJob>(
  "weather-queue",
  async (job) => {
    log("Worker received job:", job.name);
    log("Payload:", job.data);

    await saveWeather({
      city: job.data.city,
      temperature: job.data.temperature,
      windSpeed: job.data.windSpeed,
      time:new Date(job.data.time)
    });

    log(" Job completed");
  },
  {
    connection: redis,
  }
);