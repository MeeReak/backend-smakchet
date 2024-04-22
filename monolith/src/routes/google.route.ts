import express from "express";
import axios from "axios";
import { User, IUser } from "../databases/models/user.model"
import { generateToken } from "../utils/generateJWT";
import { Auth, IAuth } from "../databases/models/auth.model";
require("dotenv").config();

const googleRoute = express.Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

googleRoute.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

googleRoute.get("/auth/google/callback", async (req, res) => {
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
      isVerified: true, // Assuming Google OAuth is verified
      googleId: profile.id,
    });
    await newUser.save();

    const userInfo : IUser = new User({
        username: profile.name,
        email: profile.email,
        role : "host"
    })

    await userInfo.save();

    // Generate JWT token
    const token = generateToken(newUser._id);
    // Save the new user to the database
    res.json({ token: token });
  } catch (error: any) {
    res.redirect("/auth/google");
  }
});

googleRoute.get("/logout", (req, res) => {
  // Handle user logout logic
  res.redirect("/login");
});

export default googleRoute;
