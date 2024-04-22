import z from "zod";

const authSchema = z.object({
    email: z
    .string()
    .refine(
      (value) => {
        // Ensure the email domain is "gmail.com"
        return value.endsWith("@gmail.com");
      },
      { message: "Please input a Gmail address (e.g., example@gmail.com)" }
    ),
    password: z
    .string()
    .min(6, "Password must Input At least 6 Characters")
    .max(25, "Password contain only 25 characters"),
    googleId: z.string().optional(),
    isVerified: z.boolean().default(false)
})

export default authSchema;