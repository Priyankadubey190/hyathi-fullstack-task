import cron from "node-cron";
import Pokemon, { PokemonModel } from "../models/pokemon.model";

export const checkPokemonHealth = async () => {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60000);

    const unfedPokemon = await Pokemon.find({
      lastFedAt: { $lte: oneMinuteAgo },
      healthStatus: { $gt: 0 },
    });

    for (const pokemon of unfedPokemon) {
      pokemon.healthStatus = Math.max(pokemon.healthStatus - 2, 0);
      await pokemon.save();
    }

    console.log(`Decreased health status for ${unfedPokemon.length} Pokémon.`);
  } catch (error) {
    console.error("Error checking Pokémon health:", error);
  }
};

cron.schedule("* * * * *", checkPokemonHealth);
