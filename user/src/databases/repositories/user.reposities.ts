import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { IUser } from "../@types/user.interface";

class UserRepository {
  async createUser(userData: IUser) {
    try {
      return await UserModel.create(userData);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateUserProfile(
    id: string,
    userProfileData: IUser
  ): Promise<any> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      const user = await UserModel.findByIdAndUpdate(id, userProfileData, {
        new: true,
      });
      if (!user) {
        throw Error("User not found. Please check the provided ID."); // Create custom error
      }
      return user;
    } catch (error: unknown | any) {
      throw Error(error);
    }
  }

  async findUserByAuthId(authId: string) {
    try {
      const user = await UserModel.findOne({ authId });
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async showAllUser() {
    try {
      return await UserModel.find();
    } catch (error: unknown) {
      throw error;
    }
  }

  //find user by id
  async findUserById(id: string) {
    try {
      return await UserModel.findById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}

export default UserRepository;
