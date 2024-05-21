import { EventDetail } from "@event/databases/@types/event.interface";
import { validateInput } from "@event/middlewares/input-validation";
import { EventDetailSchema } from "@event/schemas/event.schema";
import { EventService } from "@event/services/event.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
} from "tsoa";

const eventService = new EventService();

@Route("/v1/events")
export class EventController extends Controller {
  @Post("/")
  @Middlewares(validateInput(EventDetailSchema))
  public async CreateEvent(@Body() requestBody: EventDetail): Promise<any> {
    try {
      const event = await eventService.createEvent(requestBody);
      return {
        message: "Event Created Successfully!",
        data: event,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Put("/:id")
  public async UpdateEvent(
    @Path() id: string,
    @Body() requestBody: EventDetail
  ): Promise<any> {
    try {
      const event = await eventService.updateEvent(id, requestBody);

      return {
        message: "Event Updated Successfully!",
        data: event,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Delete("/:id")
  public async DeleteEvent(@Path() id: string) {
    try {
      await eventService.deleteEvent(id);
      return { message: "Event Deleted Successfully!" };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get("/:id")
  public async FindFavoEvent(@Path() id: string): Promise<any> {
    try {
      const event = await eventService.findEventById(id)

      return event
    } catch (error: unknown) {
      throw error;
    }
  }
 
}
