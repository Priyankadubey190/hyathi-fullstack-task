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
router.get("/", authenticateUser, authorizeUser, getAdoptedPokemon);
router.get(
  "getById/:pokemonId",
  authenticateUser,
  authorizeUser,
  getAdoptedPokemonById
);
router.post(
  "/addToAdopt/:pokemonId",
  authenticateUser,
  authorizeUser,
  addToAdopted
);

export default router;
