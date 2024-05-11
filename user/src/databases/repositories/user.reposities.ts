import mongoose from "mongoose";
import UserModel from "../models/user.model";

class UserRepository{
    async updateUserProfile(userId:string , userProfileData:object):Promise<any>{

        try{
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return null;
              }
              const user = await UserModel.findByIdAndUpdate(userId, userProfileData, { new: true });
              if (!user) {
                throw Error('User not found. Please check the provided ID.'); // Create custom error
              }
              return user;
        }catch(error:unknown | any){
            throw Error(error);
        }
    }
}

export default UserRepository;