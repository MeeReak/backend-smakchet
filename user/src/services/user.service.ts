import  UserRepository  from "../databases/repositories/user.reposities";

export class UserServices {
  public UserRepo: UserRepository;
  constructor() {
    this.UserRepo = new UserRepository();
  }

  async updateUserProfile(userId:string, userProfileData:object):Promise<any>{

      try{

        return this.UserRepo.updateUserProfile(userId,userProfileData);

      }catch(error:unknown | any){
        throw error;
      }
  }

}
