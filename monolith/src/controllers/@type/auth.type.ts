import { ObjectId } from "mongoose";

export interface AuthModel {
  username: string;
  email: string;
  password: string;
  googleId: string;
  isVerify: boolean;
  role: string;
  created_at: Date;
}

export interface EventModel {
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  thumbnail: string;
  host_id: string;
  description: string;
  viewer: number;
  date: {
    startdate: Date;
    enddate: Date;
    starttime: Date;
    endtime: Date;
  };
}

export interface PageModel{
  page?:number;
  perPage?: number;
}

export interface LoginModel{
  email : string;
  password : string;
}