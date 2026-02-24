import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/transactionRoute.js";
import authrouter from "./routes/authRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://expense-tracker-woad-tau-93.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use("/api/transaction", router);
app.use("/api/auth",authrouter);

app.get("/", (req, res) => {
  res.send("api running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
