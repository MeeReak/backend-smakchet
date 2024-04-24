import z from "zod";

// Define a function that accepts an array of valid email domains
function isValidEmailDomain(value:string, validDomains:string[]) {
  const domain = value.split("@")[1]; // Extract domain part of the email
  return validDomains.includes(domain);
}

const authSchema = z.object({
    email: z
    .string()
    .refine(
      (value) => {
        // Ensure the email domain is "gmail.com"
        const validDomains = ["gmail.com", "yahoo.com", "outlook.com"]; // List of valid domains
        return isValidEmailDomain(value, validDomains);
      },
      { message: "Please input a valid email address with supported domains" }
    ),
    password: z
    .string()
    .min(6, "Password must Input At least 6 Characters")
    .max(25, "Password contain only 25 characters"),
    googleId: z.string().optional(),
    isVerified: z.boolean().default(false)
})

export default authSchema;