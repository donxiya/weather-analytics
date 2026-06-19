import { Queue } from "bullmq";
import { redis } from "./redis";

// Define job structure (important for type safety later)
export type SaveWeatherJob = {
  city: string;
  temperature: number;
  windSpeed: number;
  time: Date;
};

export const weatherQueue = new Queue<SaveWeatherJob>("weather-queue", {
  connection: redis,
});