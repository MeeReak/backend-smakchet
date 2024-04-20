import mongoose,{Document} from "mongoose";

export interface IToken extends Document{
    user_id : mongoose.Schema.Types.ObjectId,
    token   : string,
    expired : Date,
}

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  expired : {type : Date , required: true}
});

export const Token = mongoose.model("Token", tokenSchema);
