import mongoose, { Document, Schema, Types } from "mongoose";

export interface PokemonModel extends Document {
  breed: string;
  age: number;
  healthStatus: number;
  feedTime: Date | null;
}

const PokemonSchema = new Schema({
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  healthStatus: { type: Number, required: true },
  feedTime: { type: Date, default: null },
});

export default mongoose.model<PokemonModel>("Pokemon", PokemonSchema);
