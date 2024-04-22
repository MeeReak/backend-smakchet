import z from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username must Input At least 3 Character"),
  role: z.enum(["host", "user"]),
  email: z.string().refine(
    (value) => {
      // Ensure the email domain is "gmail.com"
      return value.endsWith("@gmail.com");
    },
    { message: "Please input a Gmail address (e.g., example@gmail.com)" }
  ),
  favorites: z.array(z.string()),
  phone_number: z.string().min(8).max(15).optional(),
  address: z.string().max(100).optional(),
  bio: z.string().max(255).optional(),
  facebook_link: z.string().url().optional(), 
  profile: z.string().url().optional(),
  password: z
    .string()
    .min(6, "Password must Input At least 6 Characters")
    .max(25, "Password contain only 25 characters"),
  googleId: z.string().optional(),
});

export default userSchema;
