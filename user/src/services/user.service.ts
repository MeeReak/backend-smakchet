import { IUser } from "@user/databases/@types/user.interface";
import UserRepository from "../databases/repositories/user.reposities";

export class UserServices {
  public userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  async createUser(userData: IUser) {
    try {
      return this.userRepo.createUser(userData);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateUserProfile(
    userId: string,
    userProfileData: IUser
  ): Promise<any> {
    try {
      return this.userRepo.updateUserProfile(userId, userProfileData);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findUserByAuhtid(userId: string) {
    try {
      return await this.userRepo.findUserByAuthId(userId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async showAllUser(){
    try {
      return await this.userRepo.showAllUser()
    } catch (error: unknown) {
      throw error
    }
  }
}
