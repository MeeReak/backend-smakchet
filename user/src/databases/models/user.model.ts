import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    authId: { type: mongoose.Schema.Types.ObjectId },
    username: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Organizer", "Volunteer"],
    },
    email: { type: String, index: true },
    phoneNumber: {
      type: String,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    createdAt: { type: Date, default: Date.now() },
    profile: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
  }
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
