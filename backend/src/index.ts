import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";

const app = express();
app.use(cors());

app.use("/weather", weatherRoutes);

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});