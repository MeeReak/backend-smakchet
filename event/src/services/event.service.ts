import { EventDetail } from "@user/databases/@types/event.interface";
import { EventRepository } from "@user/databases/repositories/event.reposities";
import APIError from "@user/Errors/api-error";
import { StatusCode } from "@user/utils/consts";

export class EventService {
  public eventRepo: EventRepository;
  constructor() {
    this.eventRepo = new EventRepository();
  }

  async createEvent(eventDetail: EventDetail) {
    try {
      return await this.eventRepo.createEvent(eventDetail);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateEvent(id: string, eventDetail: EventDetail) {
    try {
      const existedEvent = await this.eventRepo.findEvent(id);

      if (!existedEvent) {
        throw new APIError("Event not found", StatusCode.NotFound);
      }

      return await this.eventRepo.updateEvent(id, eventDetail);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteEvent(id: string) {
    try {
      const existedEvent = await this.eventRepo.findEvent(id);

      if (!existedEvent) {
        throw new APIError("Event not found", StatusCode.NotFound);
      }

      return await this.eventRepo.deleteEvent(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async findEvent(id: string) {
    try {
      return await this.eventRepo.findEvent(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}
