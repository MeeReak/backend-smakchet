import mongoose from "mongoose";
import Event, { IEvent } from "../databases/models/event.model";

export class eventRepository {

  // Get All Event
  async getAllEvent(options?:{page:number, perPage:number}): Promise<any> {

    let query = Event.find({});
    // Apply pagination if provided
    if (options) {
      const { page, perPage } = options;
      const skip = (page - 1) * perPage;
      query = query.skip(skip).limit(perPage);
    }

    // Execute the query
    const events = await query.exec();
    return events;
  }

  // Create New Event
  async CreateEvent(eventInfo:IEvent) {

    try {
      const newEvent = new Event(eventInfo);
      const result = await newEvent.save();
      return result;
    } catch (error: unknown | any) {
      throw error;
    }

  }

  // Get Event By Id
  async GetEventById(id:string){

    try{
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Mongo Id Format");
      }
      const event =  await Event.findById(id)
      if(!event){
        throw new Error("Event not found. Please check the provided ID.")
      }
      return event;
    }catch(error:unknown | any){
      throw error;
    }

  }

}
