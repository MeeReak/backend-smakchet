import { hostRepository } from "../repositories/orgaization.repository";

export class hostService{

    hostrepository : hostRepository;

    constructor(){
        this.hostrepository = new hostRepository();
    }

    async createHost(userdata:any){
        try{
            const hostInfo = { ...userdata, name: userdata.username };
            return await this.hostrepository.saveHost(hostInfo);
        }catch(error){
            throw error;
        }
    }
}