import { z } from "zod";

export const EventDetailSchema = z.object({
  thumbnail: z.string(),
  eventname: z.string().min(3),
  address: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
  category: z.string(),
  viewer: z.number(),
  description: z.string().min(3),
  Date: z.object({
    startDate: z.string(),
    endDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
  requirement: z.object({
    age: z.string(),
    language: z.string(),
    skill: z.string(),
    timeCommitment: z.string(),
  }),
  createdAt: z.string(),
  formSubmission: z.array(
    z.object({
      label: z.string().min(3),
      fieldType: z.string(),
      answers: z.array(z.string()),
    })
  ),
});