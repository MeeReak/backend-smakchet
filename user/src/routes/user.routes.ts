// import { userController } from "@user/controllers/user.controller";
// import  express , {NextFunction, Request , Response}  from "express";

// const userRoute = express.Router();

// const usercontroller = new userController();

// userRoute.put("/:userId",async (req:Request,res:Response,next:NextFunction)=>{
//     const userId = req.params.id;
//     const userProfileData = req.body;
//     const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header


//     try {
//         // Pass userId, userProfileData, and token to controller function
//         const result = await usercontroller.UpdateProfile(userId, userProfileData, token);
//         res.json(result);
//       } catch (error:unknown | any) {
//         next(error);
//       }
// })

// userRoute.get("/",async(_req:Request , res:Response)=>{
//   res.json({message: "hello"});
// })

// export default userRoute;