import mongoose, { Schema, Document } from "mongoose";


export interface IOrganization extends Document {
  name  	      : string;
  email         : string;
  phone_number  : string;
  address       : string;
  description   : string;
  facebook_link : string;
  profile       : string;
}

const OrganizationSchema: Schema = new Schema({
  name          : { type: String, required: true },
  email         : { type: String, required: true, unique: true },
  phnoe_number  : { type: String},
  address       : { type: String},
  description   : { type: String },
  facebook_link : { type: String },
  profile       : { type: String },
});

export const Organization = mongoose.model<IOrganization>("Organizations", OrganizationSchema);
