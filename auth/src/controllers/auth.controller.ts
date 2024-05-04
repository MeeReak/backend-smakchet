import { ROUTE_PATHS } from "@api-gateway/routes/v1/route-defs";
import { UserService } from "@api-gateway/services/user.service";
import { StatusCode } from "@api-gateway/utils/consts";
import { Body, Get, Post, Query, Route, SuccessResponse } from "tsoa";

interface requestBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Route("Auth")
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATHS.AUTH.SIGN_UP)
  async SignUpWithEmail(@Body() requestBody: requestBody): Promise<any> {
    try {
      const { username, email, password, role } = requestBody;
      return await this.userService.create({ username, email, password, role });
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATHS.AUTH.VERIFY)
  async VerifyEmail(@Query() token: string) {
    try {
      return await this.userService.verifyEmail(token);
    } catch (error: unknown) {
      throw error;
    }
  }
}
