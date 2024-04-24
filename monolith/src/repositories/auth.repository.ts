import { Auth } from "../databases/models/auth.model";

export class AuthRepository {
  async SignupUser(userData: any) {
    const {email , password , username , role} = userData;
    try {
        
      // Check if user with the given email exists but not verified
      const unverifiedUser = await Auth.findOne({ email, isVerify: false });

      if (unverifiedUser) {
        throw new Error("Please verify your email.");
        // return res.status(400).json({ message: "Please verify your email." });
      }

      // Check if user with the given email exists
      const existingUser = await Auth.findOne({ email });

      if (existingUser) {
        throw new Error("Email already use , Please use another email");
        //  return res.status(400).json({ message: "Email already use , Please use another email" });
      }
      const newUser = new Auth(userData);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }
}
