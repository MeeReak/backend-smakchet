import { UserProps } from "@auth/@types/user.type";
import { IToken } from "@auth/database/model/token.model";


export interface UserSignUp extends UserProps{}
export interface Token extends IToken{}