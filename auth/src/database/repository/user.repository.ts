import APIError from "@api-gateway/Errors/api-error";
import UserModel from "../model/user.model";
import DuplicateError from "@api-gateway/Errors/duplicat-error";

import { StatusCode } from "@api-gateway/utils/consts";
import { UserSignUp, UserUpdate } from "./@types/repository.type";

export class UserRepository {


  async CreateUser(userDetail: UserSignUp) {
    try {
      return await UserModel.create(userDetail);
    } catch (error: unknown) {
      if (error instanceof DuplicateError) {
        throw error;
      }
      throw new APIError("Unable to Create User in Database");
    }
  }

  //find user by email
  async FindUserByEmail({ email }: { email: string }) {
    try {
      return await UserModel.findOne({ email: email });
    } catch (error: unknown) {
      throw new APIError("Unable to Find User in Database");
    }
  }

  //fint user by id
  async FindUserById({ id }: { id: string }) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw new APIError("Unable to Find User in Database");
    }
  }

  //update user by id
  async UpdateUserById({
    id,
    newDetail,
  }: {
    id: string;
    newDetail: UserUpdate;
  }) {
    try {
      const isExit = await this.FindUserById({ id: id });

      if (!isExit) {
        throw new APIError("User does not exist", StatusCode.NotFound);
      }

      return await UserModel.findByIdAndUpdate(id, newDetail, { new: true });
    } catch (error: unknown) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError("Unable to Update User in Database");
    }
  }
}
