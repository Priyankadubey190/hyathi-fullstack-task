import mongoose, { Document, Schema } from "mongoose";

export interface AdoptedPokemon {
  pokemon: mongoose.Types.ObjectId;
  adopted: boolean;
}

export interface AdoptedPokemonModel extends Document {
  userId: mongoose.Types.ObjectId;
  items: AdoptedPokemon[];
}

const adoptedSchema = new Schema<AdoptedPokemon>({
  pokemon: { type: Schema.Types.ObjectId, ref: "Pokemon", required: true },
  adopted: { type: Boolean, default: false },
});

const adoptedPokemonSchema = new Schema<AdoptedPokemonModel>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: {
    type: [adoptedSchema],
    validate: {
      validator: function (value: AdoptedPokemon[]) {
        const uniquePokemonIds = new Set(
          value.map((item) => item.pokemon.toString())
        );
        return uniquePokemonIds.size === value.length;
      },
      message: "Duplicate Pokémon adoption not allowed for the same user.",
    },
  },
});

adoptedPokemonSchema.index({ "items.pokemon": 1 }, { unique: true });

export default mongoose.model<AdoptedPokemonModel>(
  "Adopted",
  adoptedPokemonSchema
);
