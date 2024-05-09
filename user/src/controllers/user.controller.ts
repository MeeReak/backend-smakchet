import { UserServices } from "../services/user.service";
import { Controller, Put, Route, Tags, Path, Body, Middlewares} from "tsoa"; // Import necessary decorators
import {UserModel} from "./@types/user.type";
import { verifyToken } from "../middlewares/tokenValidation";

const userService = new UserServices();

@Route("/v1/user")
@Tags("User")
export class UserController extends Controller {
  @Put("/:userId")
  @Middlewares(verifyToken) // Apply verifyToken middleware before UpdateProfile
  public async UpdateProfile(
    @Path() userId: string,
    @Body() userProfileData: UserModel,
  ): Promise<any> {
    // Call UserService to update user profile using userId from the request object
    const updatedUserProfile = await userService.updateUserProfile(userId, userProfileData);

    return { message: 'User profile updated successfully', userProfile: updatedUserProfile };
  }
}
