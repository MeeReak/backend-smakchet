import mongoose from "mongoose";

export interface IToken {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  create_at: Date;
  expired: Date;
}

const tokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    expired: { type: Date, required: true },
    created_at: { type: Date },
  },
  {
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

const TokenModel = mongoose.model("Token", tokenSchema);

export default TokenModel;
