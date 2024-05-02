export interface UserProps {
  username: string;
  email: string;
  password:string;
  isVerified?: boolean;
  googleId?: string;
  role?: string;
}