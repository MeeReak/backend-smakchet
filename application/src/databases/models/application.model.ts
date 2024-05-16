import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.Mixed,
    },
    eventId: {
      type: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["submitted", "passed", "failed"],
      default: "submitted", // Set default value to "submitted"
    },
    submitOn: {
      type: Date,
    },
    responses: [
      {
        label: String,
        answer: Schema.Types.Mixed,
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

const ApplicationModel = mongoose.model("application", applicationSchema);

export default ApplicationModel;