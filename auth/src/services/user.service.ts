import { UserRepository } from "@api-gateway/database/repository/user.repository";
import { UserSignUp } from "./@types/user.service.type";
import { generateToken, hashPassword } from "@api-gateway/utils/generate";
import DuplicateError from "@api-gateway/Errors/duplicat-error";
// import BaseCustomError from "@api-gateway/Errors/base-custom-error";
// import { StatusCode } from "@api-gateway/utils/consts";
import APIError from "@api-gateway/Errors/api-error";
import { TokenRepository } from "@api-gateway/database/repository/token.repository";
import { StatusCode } from "@api-gateway/utils/consts";

export class UserService {
  private userRepo: UserRepository;
  private tokenRepo: TokenRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.tokenRepo = new TokenRepository();
  }

  // NOTE: THIS METHOD WILL USE BY SIGNUP WITH EMAIL & OAUTH
  // TODO:
  // Hash The Password If Register With Email
  // Save User to DB
  // If Error, Check Duplication
  // Duplication case 1: Sign Up Without Verification
  // Duplication case 2: Sign Up With The Same Email
  // save token and id to database

  async create(userDetail: UserSignUp) {
    try {
      //hashing password
      const hasdPassword = await hashPassword(userDetail.password);
      //check if the email already signup
      const existedUser = await this.userRepo.FindUserByEmail({
        email: userDetail.email,
      });

      if (existedUser) {
        if (!existedUser.isVerify) {
          throw new DuplicateError(
            "That email already signed up. Please verify!!"
          );
        }
        throw new DuplicateError("You can't sign up with that email!!");
      }

      let newData = { ...userDetail, password: hasdPassword };
      const user = await this.userRepo.CreateUser(newData);
      //step 4
      const token = await generateToken(user.id, user.username);
      const currentDate = new Date();
      const expiredDate = new Date(currentDate.getTime() + 2 * 60 * 1000); // Adding 2 minutes

      const tokenDetail = {
        userId: user.id,
        token: token,
        create_at: currentDate,
        expired: expiredDate,
      };

      await this.tokenRepo.Create(tokenDetail);

      return user;
    } catch (error: unknown) {
      if (error instanceof DuplicateError) {
        throw error;
      }
      throw new APIError("Somthing went wrong!");
    }
  }

  // NOTE : THIS METHOD WILL USE BY VERIFY USER WITH TOKEN
  // TODO :
  // find the token in the database
  // find that user in the database
  // change isVerify to true
  // delect that token from the database
  async verifyEmail(token: string) {
    try {
      const exitedToken = await this.tokenRepo.FindTokenByToken({ token });

      //check if the token is invalid
      if (!exitedToken) {
        throw new APIError(
          "Verification token is invalid",
          StatusCode.BadRequest
        );
      }

      const user = await this.userRepo.FindUserById({
        id: exitedToken.userId.toString(),
      });

      if (!user) {
        throw new APIError("User does not exist.", StatusCode.NotFound);
      }

      //change the verify to true
      user.isVerify = true;
      await user.save();

      //after verify success delete the token
      await this.tokenRepo.DeleleToken({ token });

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }


}
