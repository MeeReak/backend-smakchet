import express, { NextFunction, Request, Response } from "express";
import { authController } from "../controllers/auth.controller";
import { validateUserData } from "../middlewares/validateData";
import authSchema from "../schemas/auth.schema";
import { Auth, IAuth } from "../databases/models/auth.model";
import { Token } from "../databases/models/verifyToken.model";
import { generateToken } from "../utils/generateJWT";
import bcrypt from "bcrypt";
import { generateEmailVerificationToken } from "../utils/randomToken";
import { sendVerificationEmail } from "../utils/emailConfig";
import axios from "axios";
import { IUser, User } from "../databases/models/user.model";
import { authService } from "../services/auth.service";
import { AuthModel } from "../controllers/@type/auth.type";
import {
  IOrganization,
  Organization,
} from "../databases/models/organization.model";

require("dotenv").config();

const authRoute = express.Router();

const authcontroller = new authController();
const authservice = new authService();

// google config
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

// facebook config
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const FB_REDIRECT_URI = "http://localhost:3000/auth/facebook/callback";

// Sign up account
authRoute.post(
  "/sign-up",
  validateUserData(authSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userdata = await authcontroller.SignupUser(req.body);
      res.status(201).json(userdata);
    } catch (error: unknown | any) {
      next(error);
    }
  }
);

// verify account
authRoute.get(
  "/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.query;
      const verifyData = await authcontroller.verifyUser(token);

      res.status(200).render("verify");
    } catch (error: unknown | any) {
      next(error);
    }
  }
);

// login account

authRoute.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Check if the user with the given email exists
      const user: IAuth | null = await Auth.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      // Compare the password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      if (!user.isVerify) {
        return res.status(400).json({ message: "Email hasn't verified yet!" });
      }

      // Generate JWT token
      const token = generateToken(user._id);

      // Return success message along with the token
      res.json({ message: "Login successfully, welcome to our app.", token });
    } catch (error) {
      next(error);
    }
  }
);

// Login with Google

authRoute.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

authRoute.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // Check if user already exists in the database based on googleId
    let user = await Auth.findOne({ email: profile.email });

    if (user) {
      throw new Error("Email already , please sign-up with another acount");
    }

    // Create a new user if not found
    const newUser: IAuth = new Auth({
      username: profile.name,
      email: profile.email,
      isVerify: true,
      googleId: profile.id,
      role: "host",
    });
    await newUser.save();

    const userInfo: IUser = new User({
      username: profile.name,
      email: profile.email,
      role: "host",
    });

    await userInfo.save();

    // Generate JWT token
    const token = generateToken(newUser._id);
    // Save the new user to the database
    res.json({ token: token });
  } catch (error: any) {
    // res.redirect("/auth/google");
    res.json({ message: error.message });
  }
});

// login with facebook

authRoute.get("/auth/facebook", (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${FB_REDIRECT_URI}`;
  res.redirect(url);
});

authRoute.get("/auth/facebook/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      throw new Error("Authorization code not provided");
    }

    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v13.0/oauth/access_token`,
      {
        params: {
          client_id: APP_ID,
          client_secret: APP_SECRET,
          code: code,
          redirect_uri: FB_REDIRECT_URI,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      `https://graph.facebook.com/v13.0/me`,
      {
        params: {
          fields: "name,email",
          access_token: access_token,
        },
      }
    );

    const profile = profileResponse.data;

    if (!profile || !profile.email) {
      throw new Error("Failed to fetch user profile or email from Facebook");
    }

    let user = await Auth.findOne({ email: profile.email });

    if (user) {
      throw new Error("Email already exists, please sign in with another account");
    }

    const newAuth = new Auth({
      username: profile.name,
      email: profile.email,
      isVerify: true,
      facebookId: profile.id,
      role: "host",
    });

    const authCollect = await newAuth.save();

    if (authCollect.role === "host") {
      const userInfo = new Organization({
        username: profile.name,
        email: profile.email,
      });

      await userInfo.save();
    } else {
      const userInfo = new User({
        username: profile.name,
        email: profile.email,
      });

      await userInfo.save();
    }

    const token = generateToken(authCollect._id);
    res.json({ token: token });
  } catch (error:unknown | any) {
    console.error("Error in Facebook callback:", error.message);
    res.status(500).json({ message: "Failed to authenticate via Facebook" });
  }
});


// Logout route
authRoute.get("/logout", (req, res) => {
  // Code to handle user logout
  res.redirect("/login");
});

export default authRoute;
