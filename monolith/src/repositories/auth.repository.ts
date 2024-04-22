import {Auth} from "../databases/models/auth.model"


export class AuthRepository{
    async SignupUser(userData:any){
        try{
            const newUser = new Auth(userData);
            return await newUser.save();
        }catch(error){
            throw error;
        }
    }
}