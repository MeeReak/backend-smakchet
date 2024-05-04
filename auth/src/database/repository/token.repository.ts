import TokenModel from "../model/token.model";
// import { Token } from "./@types/repository.type";

export class TokenRepository {
  //create token
  async Create(tokenDetail: any) {
    try {
      return await TokenModel.create(tokenDetail);
    } catch (error: unknown) {
      throw error;
    }
  }

  //find token by userID
  async FindTokenByUserId({ userId }: { userId: string }) {
    try {
      return await TokenModel.findById({ userId });
    } catch (error: unknown) {
      throw error;
    }
  }

  //find token by token
  async FindTokenByToken({ token }: { token: string }) {
    try {

      return await TokenModel.findOne({ token });
    } catch (error: unknown) {
      throw error;
    }
  }

  //delete token by token
  async DeleleToken({ token }: { token: string }) {
    try {
      return await TokenModel.findOneAndDelete({ token });
    } catch (error: unknown) {
      throw error;
    }
  }
}
