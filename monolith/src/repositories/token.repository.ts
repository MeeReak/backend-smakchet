import {Token} from "../databases/models/verifyToken.model";

export class tokenRepository{
    async saveToken(Tokendata:any){
        await Token.create(Tokendata);
    }
}