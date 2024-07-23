import express from "express";
import authRoutes from "./routes/auth.route";
import pokemonRoutes from "./routes/pokemon.route";
import adoptedRoutes from "./routes/adopted.route";

import { checkPokemonHealth } from "./services/pokemonHealthCheaker";

const cors = require("cors");

const { connection } = require("./config/db");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pokemon", pokemonRoutes);
app.use("/api/adopt", adoptedRoutes);

app.listen(process.env.port, async () => {
  try {
    await connection;
    await checkPokemonHealth();
    console.log(`server is running on port ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});
