import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Wrong before: dotenv.config() dipanggil sebelum import (ESM error), sekarang di bawah import.
// Also ensure .env is loaded from backend/.env even if process.cwd() bukan direktori backend.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import userRoutes from "./routes/userRouter.js";
import serviceRoutes from "./routes/serviceRouter.js";
import newsRoutes from "./routes/newsRouter.js";
import creditUserRoutes from "./routes/creditUserRouter.js";
import teamProfileRoutes from "./routes/teamProfileRouter.js";
import authRoutes from "./routes/authRouter.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/credit-users", creditUserRoutes);
app.use("/api/team-profiles", teamProfileRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/company";

mongoose.connect(MONGOURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
