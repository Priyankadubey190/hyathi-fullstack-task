import express from "express";
import {
  getAllPokemon,
  createPokemon,
} from "../controllers/pokemon.controller";
import { authenticateUser, authorizeUser } from "../middlewares";

const router = express.Router();

router.post("/create", authenticateUser, createPokemon);
router.get("/", getAllPokemon);

export default router;
