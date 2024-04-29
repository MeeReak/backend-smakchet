import mongoose, { Schema, Document } from "mongoose";

// Interface representing the Event document
export interface IEvent extends Document{
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  thumbnail: string;
  host_id: mongoose.Schema.Types.ObjectId;
  description: string;
  viewer: number;
  date: {
    startdate: Date;
    enddate: Date;
    starttime: Date;
    endtime: Date;
  };
}

// Define the Mongoose schema for Event
const eventSchema: Schema<IEvent> = new Schema<IEvent>({
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  category: {
    type: String,
    enum: ["category1", "category2", "category3"],
    required: true,
  },
  thumbnail: { type: String, required: true },
  host_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  viewer: { type: Number, default: 0 },
  date: {
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    starttime: { type: Date, required: true },
    endtime: { type: Date, required: true },
  },
});

// Create a Mongoose model based on the schema
const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
