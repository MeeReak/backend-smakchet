import { EventDetail } from "../@types/event.interface";
import EventModel from "../models/event.model";

export class EventRepository {
  async createEvent(eventDetail: EventDetail) {
    try {
      return await EventModel.create(eventDetail);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateEvent(id: string, newDetail: EventDetail) {
    try {
      return await EventModel.findByIdAndUpdate(id, newDetail, { new: true });
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteEvent(id: string) {
    try {
      return await EventModel.findByIdAndDelete(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}
