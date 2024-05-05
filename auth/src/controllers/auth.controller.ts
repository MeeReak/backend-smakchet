import { ROUTE_PATHS } from "@api-gateway/routes/v1/route-defs";
import { UserService } from "@api-gateway/services/user.service";
import { StatusCode } from "@api-gateway/utils/consts";
import { generateToken } from "@api-gateway/utils/generate";
import { Body, Get, Post, Query, Route, SuccessResponse } from "tsoa";

interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

@Route("Auth")
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // TODO:
  // Save User
  // Generate Verification Token & Save to its DB
  // Publish User Detail to Notification Service
  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATHS.AUTH.SIGN_UP)
  async SignUpWithEmail(@Body() requestBody: SignUpRequestBody): Promise<any> {
    try {
      const { username, email, password, role } = requestBody;
      const user = await this.userService.create({
        username,
        email,
        password,
        role,
      });
      await this.userService.saveVerifyToken({ id: user.id });
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATHS.AUTH.VERIFY)
  async VerifyEmail(@Query() token: string) {
    try {
      const user = await this.userService.verifyEmail(token);

      const jwtToken = await generateToken(user.id, user.username);

      return jwtToken;
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Post(ROUTE_PATHS.AUTH.LOGIN)
  async LoginWithEmail(@Body() requestBody: LoginRequestBody): Promise<any> {
    try {
      const { email, password } = requestBody;

      return await this.userService.login({ email, password });
    } catch (error: unknown) {
      throw error;
    }
  }
}
