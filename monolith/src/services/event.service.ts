import { eventRepository } from "../repositories/event.repository";

export class eventService {
  eventrepository: eventRepository;

  constructor() {
    this.eventrepository = new eventRepository();
  }

  // Create Event
  async CreateEvent(eventInfo: any) {
    try {
      return await this.eventrepository.CreateEvent(eventInfo);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // Get All Event
  async GetAllEvent(options?:{ page: number; perPage: number; }): Promise<any> {
    try{
      return await this.eventrepository.getAllEvent(options);
    }catch(error: unknown | any){
      throw error;
    }
  }

  // Get By Id
  async GetById(id:string){
    try{
      return await this.eventrepository.GetEventById(id);
    }catch(error:unknown |any){
      throw error;
    }
    
  }
}
