import mongoose from "mongoose";

export interface applicationprop{
    userId: string | mongoose.Types.ObjectId;
    eventId : string | mongoose.Types.ObjectId;
    submitOn : string | Date;
    responses: ResponseForm[]; 
}

interface ResponseForm{
    label:string;
    answer: string[];
}