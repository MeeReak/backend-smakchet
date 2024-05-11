import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String
    },
    phoneNumber:{
      type: String
    },
    bio:{
      type:String
    },
    profile:{
      type: String
    },
    facebookLink:{
      type: String
    },
    address:{
      type:String
    },
    description:{
      type:String
    }
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
