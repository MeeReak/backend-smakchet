import { UserRepository } from "@api-gateway/database/repository/user.repository";
import { UserSignUp } from "./@types/user.service.type";
import {
  generateToken,
  generateVerifyToken,
} from "@api-gateway/utils/generate";
import DuplicateError from "@api-gateway/Errors/duplicat-error";
// import BaseCustomError from "@api-gateway/Errors/base-custom-error";
// import { StatusCode } from "@api-gateway/utils/consts";
import APIError from "@api-gateway/Errors/api-error";
import { TokenRepository } from "@api-gateway/database/repository/token.repository";
import { StatusCode } from "@api-gateway/utils/consts";
import { hashPassword, verifyPassword } from "@api-gateway/utils/password";

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
      return await this.userRepo.CreateUser(newData);
    } catch (error: unknown) {
      if (error instanceof DuplicateError) {
        throw error;
      }
      throw new APIError("Somthing went wrong!");
    }
  }

  // TODO:
  // Generate Verify Token
  // Save the Verify Token in the Database
  async saveVerifyToken({ id }: { id: string }) {
    try {
      const token = await generateVerifyToken();
      const currentDate = new Date();
      const expiredDate = new Date(currentDate.getTime() + 1 * 60 * 1000); // Adding 2 minutes

      const tokenDetail = {
        userId: id,
        token: token,
        create_at: currentDate,
        expired: expiredDate,
      };

      return await this.tokenRepo.Create(tokenDetail);
    } catch (error: unknown) {
      throw error;
    }
  }

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

      if (new Date() > exitedToken.expired) {
        await this.tokenRepo.DeleleToken({ token: exitedToken.token });
        const token = await generateVerifyToken();
        const currentDate = new Date();
        const expiredDate = new Date(currentDate.getTime() + 1 * 60 * 1000); // Adding 2 minutes

        const tokenDetail = {
          userId: exitedToken.userId,
          token: token,
          create_at: currentDate,
          expired: expiredDate,
        };

        await this.tokenRepo.Create(tokenDetail);
        throw new APIError(
          "That Token is Expired. Please check a new Token!!",
          StatusCode.NotFound
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

  // TODO:
  // Find user by email
  // Validate the password
  // Generate Token & Return
  async login({ email, password }: { email: string; password: string }) {
    try {
      const existedUser = await this.userRepo.FindUserByEmail({ email });

      if (!existedUser) {
        throw new APIError("User not exist", StatusCode.NotFound);
      }


      const isPassword = await verifyPassword({
        password: password,
        hashPassword: existedUser.password,
      });

      if (!isPassword) {
        throw new APIError(
          "The email or password you entered is incorrect. Please double-check and try again."
        );
      }

      const jwtToken = await generateToken(
        existedUser.id,
        existedUser.username
      );

      return jwtToken;
    } catch (error: unknown) {
      throw error;
    }
  }
}
