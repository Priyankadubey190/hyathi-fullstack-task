import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import Pokemon, { PokemonModel } from "../models/pokemon.model";
import Adopted, { AdoptedPokemonModel } from "../models/adopedPokemon.modal";
import { AuthType } from "../middlewares";

const ITEMS_PER_PAGE = 5;

export const getAllPokemon = async (req: AuthType, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const userId = req.currentUser?._id;
    const totalPokemon = await Pokemon.countDocuments();

    let adopted: AdoptedPokemonModel | null = null;
    if (userId) {
      const castedUserId = new mongoose.Types.ObjectId(userId.toString());
      adopted = await Adopted.findOne({ userId: castedUserId });
    }

    const pokemon: PokemonModel[] = await Pokemon.find()
      .limit(ITEMS_PER_PAGE)
      .skip((+page - 1) * ITEMS_PER_PAGE);

    const pokemonData = pokemon.map((p) => {
      const isAdopted = adopted?.items.some(
        (item) => item.pokemon.toString() === p._id.toString()
      );
      return {
        id: p._id.toString(),
        breed: p.breed,
        age: p.age,
        healthStatus: p.healthStatus,
        feedTime: p.feedTime,
        lastFedAt: p.lastFedAt,
        adopted: isAdopted || false,
      };
    });

    res.json({
      pokemon: pokemonData,
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
