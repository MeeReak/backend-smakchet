import mongoose , {Document, Schema} from "mongoose";

export interface IAuth extends Document{
    email       : string,
    password    : string,
    googleId    : string,
    isVerify    : boolean
}

const authSchema:Schema = new Schema({
    email : { type: String, required: true, unique: true },
    password : {type: String , require: true},
    googleId : {type: String , unique: true},
    isVerify : {type:Boolean , default: false},
})

export const Auth = mongoose.model<IAuth>("Auth", authSchema);