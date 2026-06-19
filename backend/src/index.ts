import app from "./app";
import { log } from "./utils/logger";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  log(`Backend running on port ${PORT}`);
});