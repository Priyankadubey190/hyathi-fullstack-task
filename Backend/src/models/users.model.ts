import mongoose, { Document, Schema, Types } from "mongoose";

export interface UserModel extends Document {
  _id: Types.ObjectId;
  username: string;
  userEmail: string;
  password: string;
}

const UserSchema = new Schema({
  username: String,
  userEmail: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserModel>("User", UserSchema);
