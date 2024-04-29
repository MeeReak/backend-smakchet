import { Body, Controller, Post, Route, Tags, Queries, Get } from "tsoa";
import { eventService } from "../../services/event.service";
import { EventModel } from "../@type/auth.type";

const eventservice = new eventService();

@Route("/api/event")
@Tags("Event API")
export class eventController extends Controller {
  @Post("/")
  public async CreateEvent(@Body() eventInfo: EventModel): Promise<any> {
    try {
      const newEvent = await eventservice.CreateEvent(eventInfo);
      return {
        message: "Event Create Successfully",
        data: newEvent,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  @Get("/")
  public async GetAllEvent(
    @Queries() options?: { page: number; perPage: number }
  ): Promise<any> {
    try {
      return await eventservice.GetAllEvent(options);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  @Get("/:id")
  public async GetById(id: string): Promise<any> {
    try {
      return await eventservice.GetById(id);
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
