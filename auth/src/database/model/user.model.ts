import mongoose, { Schema } from "mongoose";

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["Organizer", "Volunteer"],
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profileUrl: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret: any) {
        // delete ret.password;
        delete ret.googleId;
        delete ret.__v;
      },
    },
  }
);

const UserModel = mongoose.model("Auth", authSchema);

export default UserModel;
