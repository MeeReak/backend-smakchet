import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    thumbnail: {
      type: String,
    },
    eventname: {
      type: String,
    },
    address: {
      lat: String,
      lng: String,
    },
    category: {
      type: String,
      enum: ["Sport", "Education", "Workshop", "Charity"],
    },
    viewer: {
      type: Number,
    },
    description: {
      type: String,
    },
    Date: {
      startDate: Date,
      endDate: Date,
      startTime: String,
      endTime: String,
    },
    requirement: {
      age: String,
      language: String,
      skill: String,
      timeCommitment: String,
    },
    createdAt: { type: Date, default: Date.now() },
    formSubmission: [
      {
        label: String,
        fieldType: String,
        answers: [String], // Array to store multiple answers
      },
    ],
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
  }
);
const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
