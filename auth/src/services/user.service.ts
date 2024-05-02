import { UserRepository } from "@api-gateway/database/repository/user.repository";
import { UserSignUp } from "./@types/user.service.type";
import { hashPassword } from "@api-gateway/utils/hash-password";
import DuplicateError from "@api-gateway/Errors/duplicat-error";
// import BaseCustomError from "@api-gateway/Errors/base-custom-error";
// import { StatusCode } from "@api-gateway/utils/consts";
import APIError from "@api-gateway/Errors/api-error";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  // NOTE: THIS METHOD WILL USE BY SIGNUP WITH EMAIL & OAUTH
  // TODO:
  // 1. Hash The Password If Register With Email
  // 2. Save User to DB
  // 3. If Error, Check Duplication
  // 3.1. Duplication case 1: Sign Up Without Verification
  // 3.2. Duplication case 2: Sign Up With The Same Email
  async create(userDetail: UserSignUp) {
    try {
      //hashing password
      const hasdPassword = await hashPassword(userDetail.password);
      //check if the email already signup
      const existedUser = await this.userRepo.FindUserByEmail({
        email: userDetail.email,
      });

      if(existedUser){
        if(!existedUser.isVerify){
          throw new DuplicateError(
            "That email already signed up. Please verify!!"
          );
        }
        throw new DuplicateError("You can't sign up with that email!!");
      }
  

      let newData = { ...userDetail, password: hasdPassword };

      return await this.userRepo.CreateUser(newData);
    } catch (error: unknown) {
      if(error instanceof DuplicateError){
        throw error
      }
      throw new APIError("Somthing went wrong!")
    }
  }
}
