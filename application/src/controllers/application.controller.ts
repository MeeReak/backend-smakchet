import {
  Controller,
  Middlewares,
  Post,
  Route,
  Tags,
  Request,
  Body,
  Put,
  Path,
} from "tsoa";
import { validateInput } from "@application/middlewares/input-validation";
import { verifyToken } from "@application/middlewares/tokenValidation";
import { applyEventRequestBodySchema } from "@application/schemas/application.schema";
import { ApplicationService } from "@application/services/application.service";

interface FormResponse {
  label: string;
  answer: string | string[];
}

interface FormSubmit {
  userId: string;
  eventId: string;
  submitOn: string;
  responses: FormResponse[];
}

const AppService = new ApplicationService();

@Route("/v1/application")
@Tags("Application")
export class ApplicationController extends Controller {
  // Apply for Event

  @Post("/")
  @Middlewares([verifyToken, validateInput(applyEventRequestBodySchema)])
  public async ApplyEvent(
    @Request() request: any,
    @Body() body: FormResponse[]
  ): Promise<any> {
    try {
      const userId = request.userId;
      console.log(userId);
      const formSubmit: FormSubmit = {
        userId: userId,
        eventId: "2",
        submitOn: new Date().toISOString(),
        responses: body,
      };

      console.log(body);

      const formSubmitEvent = await AppService.applyEvent(formSubmit);

      return {
        message: "Application has been submitted",
        data: formSubmitEvent,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Update Status if they passed or failed

  @Put("/:Id")
  public async updateStatus(
    @Path() Id: string,
    @Body() body: any
  ): Promise<any> {
    try {
      const { status } = body;
      const formupdate = await AppService.updateStatus(Id, status);

      return {
        message: "Form has been updated!",
        data: formupdate,
      };
    } catch (error) {
      throw error;
    }
  }
}
