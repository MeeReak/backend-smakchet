import mongoose from "mongoose";
import ApplicationModel from "../models/application.model";

export class ApplicationRepository {
  // Save form submit to DB

  async applyEvent(formSubmit: object) {
    try {
      return await ApplicationModel.create(formSubmit);
    } catch (error: unknown | any) {
      throw error;
    }
  }

  // TODO
  // 1.Check format id
  // 2.Check id in DB
  // 3.Update status

  async updateStatus(id: string , status:string) {
    try {
      // 1.
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Mongo Id Format");
      }

      // 2.
      const form = await ApplicationModel.findById(id);
      if (!form) {
        throw new Error("Form not found. Please check the provided ID.");
      }

      // 3.
      const updateStatus = {
        status:status
      }
      const formSubmit = await ApplicationModel.findByIdAndUpdate(id, updateStatus , { new: true });

      return formSubmit

    } catch (error) {
      throw error;
    }
  }
}
