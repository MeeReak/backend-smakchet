import { User } from "../databases/models/user.model";

export class userRepository{

    async SaveUser(userdata:any){
        try{
            const newUser = new User(userdata);
            return await newUser.save();
        }catch(error){
            throw error;
        }
    }
}