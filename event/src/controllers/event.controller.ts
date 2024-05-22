import { EventDetail } from "@event/databases/@types/event.interface";
import APIError from "@event/Errors/api-error";
import { validateInput } from "@event/middlewares/input-validation";
import { verifyToken } from "@event/middlewares/tokenValidation";
import { EventDetailSchema } from "@event/schemas/event.schema";
import { EventService } from "@event/services/event.service";
import { StatusCode } from "@event/utils/consts";
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Request,
  Route,
} from "tsoa";

const eventService = new EventService();

@Route("/v1/events")
export class EventController extends Controller {
  @Post("/")
  @Middlewares(validateInput(EventDetailSchema))
  @Middlewares(verifyToken)
  public async CreateEvent(
    @Body() requestBody: EventDetail,
    @Request() request: any
  ): Promise<any> {
    try {
      const detailEvent = { ...requestBody, orgId: request.id };
      const event = await eventService.createEvent(detailEvent);
      return {
        message: "Event Created Successfully!",
        data: event,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Put("/:id")
  @Middlewares(verifyToken)
  public async UpdateEvent(
    @Request() request: any,
    @Path() id: string,
    @Body() requestBody: EventDetail
  ): Promise<any> {
    try {
      const existedEvent = await eventService.findEventByOrgId(request.id);

      if (!existedEvent) {
        throw new APIError("Event Not Found !!", StatusCode.NotFound);
      }

      const event = await eventService.updateEvent(id, requestBody);

      return {
        message: "Event Updated Successfully!",
        data: event,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Middlewares(verifyToken)
  @Delete("/:id")
  public async DeleteEvent(@Path() id: string, @Request() request: any) {
    try {
      const existedEvent = await eventService.findEventByOrgId(request.id);

      if (!existedEvent) {
        throw new APIError("Event Not Found !!", StatusCode.NotFound);
      }

      await eventService.deleteEvent(id);
      return { message: "Event Deleted Successfully!" };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get("/:id")
  @Middlewares(verifyToken)
  public async FindFavoEvent(
    @Path() id: string,
    @Request() request: any
  ): Promise<any> {
    try {
      const existedEvent = await eventService.findEventByOrgId(request.id);

      if (!existedEvent) {
        throw new APIError("Event Not Found !!", StatusCode.NotFound);
      }
      const event = await eventService.findEventById(id);

      return event;
    } catch (error: unknown) {
      throw error;
    }
  }
}
