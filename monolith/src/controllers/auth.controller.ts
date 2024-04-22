import { Body, Post, Route , Controller} from "tsoa";
import { authService } from "../services/auth.service";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { IUser } from "../databases/models/user.model";
import { sendVerificationEmail } from "../utils/emailConfig";
import { saveToken } from "../services/token.service";
import { IAuth } from "../databases/models/auth.model";
import { userService } from "../services/user.service";

const authservice = new authService();
const userservice = new userService();

@Route("/")
export class authController extends Controller {
  @Post("/sign-up")
  public async SignupUser(@Body() requestbody: any): Promise<any> {
    try {
      const {email , password , username , role} = requestbody;
      const user:IAuth = await authservice.CreateUser(requestbody);

      // Generate verification token
      const token = generateEmailVerificationToken(user._id);
      const newTime = new Date(); 

      newTime.setMinutes(newTime.getMinutes() + 2);

      // Save token
      await saveToken(user._id, token ,newTime);

      // Generate verification link
      const verificationLink = `http://localhost:3000/verify?token=${token}`;

      // Send verification email
      await sendVerificationEmail(user.email, verificationLink)

      return {
        status: "success",
        message: "User created successfully. Verification email sent.", 
      };
    } catch (error) {
        throw error;
    }
  }
  @Post('/verify')
  public async verifyUser(@Body() userdata:any):Promise<any>{
    try{
      await userservice.CreateUser(userdata);
    }catch(error){
      throw error;
    }
  }
}
