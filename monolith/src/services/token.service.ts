import {Token} from "../databases/models/verifyToken.model";
import { tokenRepository } from "../repositories/token.repository";

export class tokenService{

  tokenrepository : tokenRepository;

  constructor(){
    this.tokenrepository = new tokenRepository();
  }

  async createToken(Tokendata:any){
    try{
      return await this.tokenrepository.saveToken(Tokendata)
    }catch(error:unknown | any){
      throw new Error(error);
    }
  }

}