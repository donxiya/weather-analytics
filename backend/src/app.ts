import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import { log } from "./utils/logger";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    log("HTTP_REQUEST", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: Date.now() - start,
    });
  });

  next();
});

app.use("/weather", weatherRoutes);
app.use("/health", healthRoutes);

export default app;