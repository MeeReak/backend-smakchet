import { UserService } from "@api-gateway/services/user.service";
import { Body, Route } from "tsoa";

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

  async SignUpWithEmail(@Body() requestBody: requestBody): Promise<any> {
    try {
      const { username, email, password, role } = requestBody;
      return this.userService.create({ username, email, password, role });
    } catch (error: unknown) {
      throw error;
    }
  }
}
