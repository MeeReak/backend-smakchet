import {Token} from "../databases/models/verifyToken.model";

export async function saveToken(userId:string, token:string , expired: Date) {
  await Token.create({ userId, token , expired});
}
