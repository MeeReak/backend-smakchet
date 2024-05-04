import { UserProps } from "@api-gateway/@types/user.type";
import { IToken } from "@api-gateway/database/model/token.model";

export interface UserSignUp extends UserProps{}
export interface UserUpdate extends UserProps{}

export interface Token extends IToken{}