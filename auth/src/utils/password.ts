import APIError from "@auth/Errors/api-error";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new APIError("Unable to generate password");
  }
};

export const verifyPassword = async ({
  password,
  hashPassword,
}: {
  password: string;
  hashPassword: string;
}) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error: unknown) {
    throw new APIError(
      "Unable to compare passwords!"
    );
  }
};
