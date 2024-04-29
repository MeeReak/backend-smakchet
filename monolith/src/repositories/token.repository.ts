import {Token} from "../databases/models/verifyToken.model";

export class tokenRepository{
    async saveToken(Tokendata:any){
        try{
            await Token.create(Tokendata);
        }catch(error:unknown | any){
            throw error;
        }
        
    }
}