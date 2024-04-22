import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
  username  	  : string;
  role          : string;
  email         : string;
  favorites     : string[];
  phone_number  : string;
  address       : string;
  bio           : string;
  facebook_link : string;
  profile       : string;
}

const userSchema: Schema = new Schema({
  username      : { type: String, required: true },
  role          : { type: String, enum : ["volunteer" , "host"], required: true },
  email         : { type: String, required: true, unique: true },
  favorites     : { type: Array},
  phnoe_number  : { type: String},
  address       : { type: String},
  bio           : { type: String },
  facebook_link : { type: String },
  profile       : { type: String },
});

export const User = mongoose.model<IUser>("Users", userSchema);
