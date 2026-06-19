import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRoutes);
app.use("/health", healthRoutes);
export default app;