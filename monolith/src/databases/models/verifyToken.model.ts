import mongoose, { Document } from "mongoose";

export interface IToken extends Document {
  userId   : mongoose.Schema.Types.ObjectId;
  token     : string;
  create_at : Date;
  expired   : Date;
}

const tokenSchema = new mongoose.Schema({
  userId    : { type: mongoose.Schema.Types.ObjectId, required: true },
  token     : { type: String, required: true },
  expired   : { type: Date, required: true },
  created_at: { type: Date, default: Date.now() },
});

export const Token = mongoose.model("Token", tokenSchema);
