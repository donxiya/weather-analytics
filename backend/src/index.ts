import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});