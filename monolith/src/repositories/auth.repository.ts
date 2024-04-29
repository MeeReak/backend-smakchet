import { Auth, IAuth } from "../databases/models/auth.model";
import bcrypt from "bcrypt";

export class AuthRepository {
  async SignupUser(userData: any) {
    const { email, password, username, role } = userData;
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

  // Login
  async LoginUser(userInfo: any) {
    try {
      const { email, password } = userInfo;

      // Check if the user with the given email exists
      const user: IAuth | null = await Auth.findOne({ email });

      if (!user) {
        throw new Error("Invalid email or password.");
      }
      // Compare the password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
      }

      if (!user.isVerify) {
        throw new Error("Email hasn't verified yet!");
      }

      return user;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
