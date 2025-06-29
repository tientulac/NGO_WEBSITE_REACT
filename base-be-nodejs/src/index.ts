import express from "express";
import dotenv from "dotenv";
import { db } from "./db";
import roleRouter from "./routes/role.route";
import userRoute from "./routes/role.route";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/roles", roleRouter);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
