import { IUser } from "@user/databases/@types/user.interface";
import { UserServices } from "../services/user.service";
import {
  Controller,
  Put,
  Route,
  Tags,
  Path,
  Body,
  // Middlewares,
  Post,
} from "tsoa"; // Import necessary decorators
// import { verifyToken } from "../middlewares/tokenValidation";

const userService = new UserServices();

@Route("/v1/user")
@Tags("User")
export class UserController extends Controller {
  @Post("/")
  public async CreateUser(@Body() RequestBody: IUser): Promise<any> {
    try {
      const user = await userService.createUser(RequestBody);

      return {
        message: "User profile create successfully",
        data: user,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Put("/:userId")
  // @Middlewares(verifyToken) // Apply verifyToken middleware before UpdateProfile
  public async UpdateProfile(
    @Path() userId: string,
    @Body() userProfileData: IUser
  ): Promise<any> {
    // Call UserService to update user profile using userId from the request object
    const updatedUserProfile = await userService.updateUserProfile(
      userId,
      userProfileData
    );

    return {
      message: "User profile updated successfully",
      userProfile: updatedUserProfile,
    };
  }
}
