import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRoutes);

export default app;