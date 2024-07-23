import express from "express";
import {
  feedPokemon,
  getAdoptedPokemon,
  getAdoptedPokemonById,
  addToAdopted,
} from "../controllers/adoptedPokemon.controller";

import { authenticateUser, authorizeUser } from "../middlewares";

const router = express.Router();

router.post("/feed/:pokemonId", authenticateUser, authorizeUser, feedPokemon);
router.get("/", authenticateUser, getAdoptedPokemon);
router.get("getById/:pokemonId", authenticateUser, getAdoptedPokemonById);
router.get("addToAdopt/:pokemonId", authenticateUser, addToAdopted);

export default router;
