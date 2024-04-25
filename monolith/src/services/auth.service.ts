import { AuthRepository } from "../repositories/auth.repository";
import { sendVerificationEmail } from "../utils/emailConfig";
import { hashPassword } from "../utils/hashPassword";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { tokenService } from "./token.service";


export class authService {
  
  tokenservice  : tokenService;
  authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.tokenservice = new tokenService();
  }

  async createAuth(userData: any) {
    try {

      const hashedPassword = await hashPassword(userData.password);
      const userWithHashedPassword = { ...userData, password: hashedPassword };
      const authdata = await this.authRepository.SignupUser(userWithHashedPassword);
      // Generate verification token
      const token = generateEmailVerificationToken(authdata._id);
      const newTime = new Date(); 

      newTime.setMinutes(newTime.getMinutes() + 2);

      const tokendoc = {
        userId : authdata._id,
        token  : token,
        expired: newTime
      }
      // Save token
      await this.tokenservice.createToken(tokendoc);

      // Generate verification link
      const verificationLink = `http://localhost:3000/verify?token=${token}`;

      // Send verification email
      await sendVerificationEmail(authdata.email, verificationLink)
      return authdata;
    } catch (error) {
      throw error;
    }
  }
}
