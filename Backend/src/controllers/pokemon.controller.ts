import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import Pokemon, { PokemonModel } from "../models/pokemon.model";
import Adopted, { AdoptedPokemonModel } from "../models/adopedPokemon.modal";
import { AuthType } from "../middlewares";

const ITEMS_PER_PAGE = 5;

export const getAllPokemon = async (req: AuthType, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const totalPokemon = await Pokemon.countDocuments();

    const adoptedPokemons: any = await Adopted.find(
      {},
      { "items.pokemon": 1, "items.adopted": 1 }
    ).exec();

    const allPokemon: PokemonModel[] = await Pokemon.find()
      .limit(ITEMS_PER_PAGE)
      .skip((+page - 1) * ITEMS_PER_PAGE);

    const pokemonData = await Promise.all(
      allPokemon.map(async (p) => {
        const isAdopted = adoptedPokemons.some((ap: any) =>
          ap.items.some(
            (item: any) =>
              item.pokemon.toString() === p._id.toString() && item.adopted
          )
        );
        return {
          id: p._id.toString(),
          breed: p.breed,
          age: p.age,
          healthStatus: p.healthStatus,
          feedTime: p.feedTime,
          lastFedAt: p.lastFedAt,
          adopted: isAdopted,
        };
      })
    );

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
