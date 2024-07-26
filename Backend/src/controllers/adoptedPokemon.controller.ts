import { Request, Response } from "express";
import Adopted, { AdoptedPokemonModel } from "../models/adopedPokemon.modal";
import Pokemon, { PokemonModel } from "../models/pokemon.model";
import mongoose from "mongoose";
import { AuthType } from "../middlewares";

const ITEMS_PER_PAGE = 3;

export const getAdoptedPokemon = async (req: AuthType, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const userId = req.currentUser?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    const castedUserId = new mongoose.Types.ObjectId(userId.toString());

    const adopted = await Adopted.findOne({ userId: castedUserId })
      .populate("items.pokemon")
      .limit(ITEMS_PER_PAGE)
      .skip((+page - 1) * ITEMS_PER_PAGE);

    if (!adopted) {
      return res.status(404).json({ message: "adopted pokemon not found" });
    }

    res.json(adopted);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdoptedPokemonById = async (req: AuthType, res: Response) => {
  try {
    const pokemonId = req.params.pokemonId;
    const userId = req.currentUser?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    const castedUserId = new mongoose.Types.ObjectId(userId.toString());

    const adoptedPokemon: AdoptedPokemonModel | null = await Adopted.findOne(
      { userId: castedUserId, "items.pokemon._id": pokemonId },
      { "items.$": 1 }
    ).populate("items.pokemon");

    if (!adoptedPokemon) {
      return res.status(404).json({ message: "adopted pokemon not found" });
    }

    res.status(200).json({ adoptedPokemon });
  } catch (error) {
    console.error("Error getting adopted pokemon by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToAdopted = async (req: AuthType, res: Response) => {
  try {
    const { pokemonId } = req.params;
    const userId = req.currentUser?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    const castedUserId = new mongoose.Types.ObjectId(userId.toString());
    const castedPokemonId = new mongoose.Types.ObjectId(pokemonId);

    const alreadyAdoptedByYou = await Adopted.findOne({
      "items.pokemon": castedPokemonId,
      userId: userId,
    });

    if (alreadyAdoptedByYou) {
      return res
        .status(400)
        .json({ message: "This Pokémon is already adopted by you." });
    }

    const alreadyAdopted = await Adopted.findOne({
      "items.pokemon": castedPokemonId,
      userId: !userId,
    });

    if (alreadyAdopted) {
      return res
        .status(400)
        .json({ message: "This Pokémon is already adopted by another user." });
    }

    let adopted = await Adopted.findOne({ userId: castedUserId });

    if (!adopted) {
      adopted = new Adopted({
        userId: castedUserId,
        items: [{ pokemon: castedPokemonId, adopted: true }],
      });
    } else {
      const existingItem = adopted.items.find(
        (item) => item.pokemon.toString() === pokemonId
      );
      if (existingItem) {
        return res.json({ message: "You have already adopted this Pokémon." });
      } else {
        adopted.items.push({ pokemon: castedPokemonId, adopted: true });
      }
    }

    await adopted.save();

    return res.json(adopted);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const feedPokemon = async (req: AuthType, res: Response) => {
  try {
    const { pokemonId } = req.params;
    const userId = req.currentUser?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found" });
    }

    const castedUserId = new mongoose.Types.ObjectId(userId.toString());
    const castedPokemonId = new mongoose.Types.ObjectId(pokemonId);

    const adopted = await Adopted.findOne({
      userId: castedUserId,
      "items.pokemon": castedPokemonId,
    });

    if (!adopted) {
      return res
        .status(400)
        .json({ message: "You have not adopted this Pokémon." });
    }

    const pokemon = await Pokemon.findById(castedPokemonId);

    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found." });
    }

    pokemon.healthStatus = Math.min(pokemon.healthStatus + 5, 100);
    pokemon.lastFedAt = new Date();

    await pokemon.save();

    res.json({ message: "Pokémon fed successfully.", pokemon });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
