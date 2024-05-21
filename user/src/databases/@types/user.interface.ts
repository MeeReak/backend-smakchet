export interface IUser {
  authId?:string 
  username?: string;
  phoneNumber?: string;
  profile?: string;
  address?: string;
  description?: string;
  email?: string;
  favorites?: string[];
  createdAt?: Date | string;
  role?:string
}
