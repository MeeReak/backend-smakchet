import { userRepository } from "../repositories/user.repository";

export class userService{

    userreposity : userRepository;

    constructor(){
        this.userreposity = new userRepository();
    }

    async createUser(userdata:any){
        try{
            return await this.userreposity.SaveUser(userdata);
        }catch(error){
            throw error;
        }
    }
}