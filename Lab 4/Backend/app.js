import express from "express";
import bodyParser from "body-parser";
import carsRoutes from "./routes/cars.js";
import cors from "cors";

const app = express();
const PORT = 8020;

app.use(cors());
app.use(bodyParser.json());
app.use("/cars", carsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
