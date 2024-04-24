import { Organization } from "../databases/models/organization.model";

export class hostRepository{

    async saveHost(userdata:any){
        try{
            const newHost = new Organization(userdata);
            return await newHost.save();
        }catch(error){
            throw error;
        }
    }
}