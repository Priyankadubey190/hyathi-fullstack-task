import express from "express";
import authRoutes from "./routes/auth.route";

const cors = require("cors");

const { connection } = require("./config/db");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is running on port ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});
