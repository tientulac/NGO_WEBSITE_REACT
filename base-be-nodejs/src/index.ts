import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/connection";

import roleRouter from "./routes/role.route";
import userRoute from "./routes/role.route";
import categoryRoute from "./routes/category.route";
import campaignRoute from "./routes/campaign.route";
import campaignDetailRoute from "./routes/campaignDetail.route";
import feedbackReviewRoute from "./routes/feedbackReview.route";

dotenv.config();

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to database"))
  .catch((err) => console.error("❌ Unable to connect:", err));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/role", roleRouter);
app.use("/category", categoryRoute);
app.use("/user", userRoute);
app.use("/campaign", campaignRoute);
app.use("/campaignDetail", campaignDetailRoute);
app.use("/feedbackReview", feedbackReviewRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
