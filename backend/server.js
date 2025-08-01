import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import kendaraanRoutes from "./routes/vehicles.routes.js";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import db from "./models/db.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: ["http://localhost:5173", "https://disperkim-app.com"],
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Terlalu banyak permintaan, coba lagi nanti."
});
app.use(limiter);

app.use("/uploads", express.static("uploads"));

app.use("/api/kendaraan", kendaraanRoutes);
app.use("/api/users", usersRoutes);
app.use("/api", authRoutes);

app.use(errorHandler);

db.getConnection()
  .then(() => {
    console.log("Connected to MySQL Database");

    app.listen(5000, () => {
      console.log("Server jalan di http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
