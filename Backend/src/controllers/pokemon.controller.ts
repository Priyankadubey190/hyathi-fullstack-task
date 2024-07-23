import { Request, Response } from "express";
import Pokemon, { PokemonModel } from "../models/pokemon.model";

const ITEMS_PER_PAGE = 5;

export const getAllPokemon = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const totalPokemon = await Pokemon.countDocuments();
    const pokemon: PokemonModel[] = await Pokemon.find()
      .limit(ITEMS_PER_PAGE)
      .skip((+page - 1) * ITEMS_PER_PAGE);

    res.json({
      pokemon,
      currentPage: page,
      totalPages: Math.ceil(totalPokemon / ITEMS_PER_PAGE),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { breed, age, healthStatus, feedTime } = req.body;
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).json(pokemon);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
