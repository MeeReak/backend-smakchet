import { EventDetail } from "@user/databases/@types/event.interface";
import { EventService } from "@user/services/event.service";
import { Body, Controller, Path, Post, Put, Route, Tags } from "tsoa";

const eventService = new EventService();

@Route("/v1/events")
@Tags("Event")
export class EventController extends Controller {
  @Post("/")
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

  @Put("/")
  public async UpdateEvent(
    @Path() eventId: string,
    @Body() requestBody: EventDetail
  ) {
    try {
      const event = await eventService.updateEvent(eventId, requestBody);
      return {
        message: "Event Updated Successfully!",
        data: event
      };
    } catch (error: unknown) {
      throw error;
    }
  }
}
