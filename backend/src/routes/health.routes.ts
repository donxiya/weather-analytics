import { Router } from "express";
import { pool } from "../db/pool";
import { redis } from "../queue/redis";

const router = Router();

router.get("/", async (req, res) => {
  const start = Date.now();

  try {
    // DB check
    await pool.query("SELECT 1");

    // Redis check
    await redis.ping();

    res.json({
      status: "ok",
      db: "up",
      redis: "up",
      uptime: process.uptime(),
      responseTime: Date.now() - start,
      time: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      db: "unknown",
      redis: "unknown",
      error: err.message,
    });
  }
});

export default router;