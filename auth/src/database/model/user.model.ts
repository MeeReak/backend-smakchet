import mongoose, { Schema } from "mongoose";

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

const UserModel = mongoose.model("User", authSchema);

export default UserModel;
