import APIError from "@api-gateway/Errors/api-error";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new APIError("Unable to generate password");
  }
};
