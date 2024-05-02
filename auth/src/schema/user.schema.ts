import { z } from "zod";

export const UserSignUpSchema = z.object({
  username: z.string().min(3).max(255), // Assuming a maximum length of 255 characters
  email: z.string().email(),
  password: z.string().min(8), // Assuming a minimum password length of 6 characters
  role: z.enum(["Organizer", "Volunteer"]), // Enumerated field
});
