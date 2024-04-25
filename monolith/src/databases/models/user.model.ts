import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
  username  	  : string;
  email         : string;
  favorites     : string[];
  phone_number  : string;
  address       : string;
  bio           : string;
  profile       : string;
}

const userSchema: Schema = new Schema({
  username      : { type: String, required: true },
  email         : { type: String, required: true, unique: true },
  favorites     : { type: Array},
  phone_number  : { type: String},
  address       : { type: String},
  bio           : { type: String },
  profile       : { type: String },
});

export const User = mongoose.model<IUser>("Users", userSchema);
