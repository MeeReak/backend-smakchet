import { Body, Post, Route, Controller, Query , Tags} from "tsoa";
import { authService } from "../services/auth.service";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { sendVerificationEmail } from "../utils/emailConfig";
import { Auth, IAuth } from "../databases/models/auth.model";
import { userService } from "../services/user.service";
import { hostService } from "../services/organization.service";
import { Token } from "../databases/models/verifyToken.model";
import { generateToken } from "../utils/generateJWT";
import { tokenService } from "../services/token.service";
import { AuthModel, LoginModel } from "./@type/auth.type";

const authservice = new authService();
const userservice = new userService();
const hostservice = new hostService();
const tokenservice = new tokenService();

@Route("/")
@Tags("Authentication") 
export class authController extends Controller {
  @Post("/sign-up")
  public async SignupUser(@Body() requestbody: AuthModel): Promise<any> {
    try {
      const { email, password, username, role } = requestbody;

      const user: IAuth = await authservice.createAuth(requestbody);

      return {
        status: "success",
        message: "User created successfully. Verification email sent.",
        data: user,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }
  @Post("/verify")
  public async verifyUser(@Query() token: any): Promise<any> {
    try {
      let tokenDoc = await Token.findOne({ token });
      if (!tokenDoc) {
        throw new Error("Invalid token");
      }
      if (tokenDoc.expired < new Date()) {
        await Token.deleteOne({ token });

        const authUser = await Auth.findById(tokenDoc.userId);
        if (!authUser) {
          throw new Error("User not found");
        }

        // Generate verification token
        const newtoken = generateEmailVerificationToken(authUser._id);
        const newTime = new Date();
        newTime.setMinutes(newTime.getMinutes() + 2);

        const newTokenDoc = {
          userId: authUser._id,
          token: newtoken,
          expired: newTime,
        };

        const newEmailToken = await tokenservice.createToken(newTokenDoc);

        // Generate verification link
        const verificationLink = `http://localhost:3000/verify?token=${newtoken}`;

        // Send verification email
        await sendVerificationEmail(authUser.email, verificationLink);

        return {
          status: 400,
          message: "Token expired. A new verification email has been sent.",
        };
      }

      const user = await Auth.findById(tokenDoc.userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.isVerify = true;
      await user.save();

      // save user info to user & organization collection
      const userData = {

        email: user.email,
        username: user.username,

      };

      if (user.role === "volunteer") {
        await userservice.createUser(userData);
      } else {
        await hostservice.createHost(userData);
      }

      const tokenAfterVerify = generateToken(user._id);

      await Token.deleteOne({ token });
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Login Controller
  @Post("/login")
  public async loginUser(@Body() userInfo:LoginModel):Promise<any>{
    try{
      const token = await authservice.LoginUser(userInfo);

      return {
        message : "Login successfully, welcome to our app.",
        Token : token
      }
    }catch(error:unknown | any){
      throw error;
    }
    
  }

}
