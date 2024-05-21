import { IUser } from "@user/databases/@types/user.interface";
import { UserServices } from "../services/user.service";
import {
  Controller,
  Put,
  Route,
  Path,
  Body,
  // Middlewares,
  Post,
  Middlewares,
  Get,
  Request,
} from "tsoa"; // Import necessary decorators
import { verifyToken } from "@user/middlewares/tokenValidation";
import axios from "axios";
import { prettyPrintJson } from "@user/utils/beautifulLog";

const userService = new UserServices();

@Route("/v1/user")
export class UserController extends Controller {
  @Get("/favorite")
  @Middlewares(verifyToken)
  public async findFavoEvent(@Request() request: any): Promise<any> {
    try {
      const user = await userService.findUserById(request.id);

      const eventIds = user?.favorites;

      // const events = [];

      const eventPromises = eventIds!.map(async (id) => {
        try {
          const response = await axios.get(`http://event:3004/v1/events/${id}`);
          console.log(
            `Response for id ${id}: ${prettyPrintJson(response.data)}`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching data for id ${id}:`, error);
          return null; // or handle differently if needed
        }
      });

      const events = (await Promise.all(eventPromises)).filter(
        (event) => event !== null
      );

      console.log("favorites: ", events);
      return {
        message: "Favorite events found successfully",
        data: events, // not wokring yet
      };
    } catch (error: unknown | any) {
      console.log(error);
      throw error;
    }
  }

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

  @Put("/:id")
  @Middlewares(verifyToken) // Apply verifyToken middleware before UpdateProfile
  public async UpdateProfile(
    @Path() id: string,
    @Body() userProfileData: IUser
  ): Promise<any> {
    // Call UserService to update user profile using userId from the request object
    const updatedUserProfile = await userService.updateUserProfile(
      id,
      userProfileData
    );

    return {
      message: "User profile updated successfully",
      userProfile: updatedUserProfile,
    };
  }

  @Get("/:id")
  public async findUserByAuthId(@Path() id: string): Promise<any> {
    try {
      const user = await userService.findUserByAuthId(id);

      return {
        message: "User profile found successfully",
        data: user,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get("/")
  public async showAllUser(): Promise<any> {
    try {
      return await userService.showAllUser();
    } catch (error: unknown) {
      throw error;
    }
  }
}
