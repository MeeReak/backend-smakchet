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
    id: string,
    userProfileData: IUser
  ): Promise<any> {
    try {
      return this.userRepo.updateUserProfile(id, userProfileData);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findUserByAuthId(id: string) {
    try {
      return await this.userRepo.findUserByAuthId(id);
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

  // find user by id
  async findUserById(id: string){
    try{
      return await this.userRepo.findUserById(id)
    }catch(error:unknown){
      throw error
    }
  }
}
