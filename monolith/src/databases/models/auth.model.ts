import mongoose , {Document, Schema} from "mongoose";

export interface IAuth extends Document{
    username    : string,
    email       : string,
    password    : string,
    googleId    : string,
    isVerify    : boolean,
    role        : string,
    created_at  : Date,
}

const authSchema:Schema = new Schema({
    username    : { type: String, require:true},
    email       : { type: String, require: true, unique: true },
    password    : { type: String , require: true},
    googleId    : { type: String },
    isVerify    : { type: Boolean , default: false},
    role        : { type: String , enum : ["volunteer" , "host"]},
    created_at  : { type: Date , default:Date.now()}

})

export const Auth = mongoose.model<IAuth>("Auth", authSchema);