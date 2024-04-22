import { AuthRepository } from "../repositories/auth.repository";
import { hashPassword } from "../utils/hashPassword";

export class authService{
    authRepository: AuthRepository;
    constructor(){
        this.authRepository = new AuthRepository();
    }

    async CreateUser(userData:any){
        try{
            const hashedPassword = await hashPassword(userData.password);
            const userWithHashedPassword = { ...userData, password: hashedPassword };
            return await this.authRepository.SignupUser(userWithHashedPassword);
        }catch(error){
            throw error;
        }
    }
}